import { Model, ModelClass } from 'objection';
import { FetchQuery } from './base.interface';

const NO_OF_LIMITED_QUERIES = 10;

export abstract class BaseRepository<ModelInterface = any> {
  protected constructor(public model: ModelClass<Model>) {}

  async create(data: ModelInterface & Record<any, any>) {
    const response = await this.model.transaction(async (trx) => {
      const createdData = await this.model.query(trx).insertGraphAndFetch(data);

      return createdData;
    });

    return response as any as Required<ModelInterface>;
  }

  async find(
    model?: Partial<ModelInterface>,
    params?: FetchQuery,
    graphFetch?: string,
  ): Promise<ModelInterface[]> {
    const limit = params?.limit ?? NO_OF_LIMITED_QUERIES;

    let result = this.model
      .query()
      .withGraphFetched(graphFetch)
      .where(model ?? {})
      .limit(limit);

    if (params?.page) {
      result = result.offset(limit * (params.page - 1 ?? 1));
    }

    if (params?.startDate) {
      result = result.where('created_at', '>', params.startDate);
    }

    if (params?.endDate) {
      result = result.where(
        params?.endDateCol ?? 'expired_at',
        '<',
        params.endDate,
      );
    }

    if (params?.search && params?.filterBy !== 'password') {
      result = result.whereILike(
        params?.filterBy ?? 'name',
        `%${params.search}%`,
      );
    }

    return result as any as Required<ModelInterface[]>;
  }

  async findOne(
    model: Partial<ModelInterface>,
    params?: FetchQuery,
    graphFetch?: string,
  ) {
    const limit = params?.limit ?? NO_OF_LIMITED_QUERIES;

    let result = this.model
      .query()
      .withGraphFetched(graphFetch)
      .findOne(model)
      .limit(limit);

    if (params?.page) {
      result = result.offset(limit * (params.page - 1 ?? 1));
    }

    if (params?.startDate) {
      result = result.where('created_at', '>', params.startDate);
    }

    if (params?.endDate) {
      result = result.where(
        params?.endDateCol ?? 'expired_at',
        '<',
        params.endDate,
      );
    }

    if (params?.search && params?.filterBy !== 'password') {
      result = result.whereILike(
        params?.filterBy ?? 'name',
        `%${params.search}%`,
      );
    }

    return result as any as Required<ModelInterface>;
  }

  async findById(id: number) {
    const data = await this.model.query().findById(id);

    return data;
  }

  async update(
    data: Partial<ModelInterface>,
    data2: Partial<ModelInterface>,
  ): Promise<ModelInterface>;
  async update(
    id: number,
    data2: Partial<ModelInterface>,
  ): Promise<ModelInterface>;
  async update(
    idOrModel: number | Partial<ModelInterface>,
    data: Partial<ModelInterface>,
  ): Promise<ModelInterface> {
    let response: any;
    if (typeof idOrModel === 'number') {
      response = await this.model.query().updateAndFetchById(idOrModel, data);
    } else {
      response = await this.model.query().updateAndFetch(data).where(idOrModel);
    }

    return response as any as Required<ModelInterface>;
  }

  async delete(id: number) {
    const response = await this.model.query().delete().where({ id: id });

    return response;
  }
}
