import { Logger } from '@nestjs/common';
import Objection, { Model, ModelClass } from 'objection';
import { FetchQuery, IPaginatedResponse } from './base.interface';

const NO_OF_LIMITED_QUERIES = 10;

export abstract class BaseRepository<ModelInterface = any> {
  protected constructor(public model: ModelClass<Model>) {}

  async create<T extends Record<any, any>>(data: ModelInterface & T) {
    Logger.log('create', 'BaseRepository');

    const response = await this.model.transaction(async (trx) => {
      const createdData = this.model.query(trx).insertGraphAndFetch(data);

      return createdData;
    });

    return response as any as Required<ModelInterface>;
  }

  findSync(
    model?: Partial<ModelInterface>,
    params?: FetchQuery,
    graphFetch?: string,
    graphModifier?: {
      relationship: string;
      modifier: Objection.Modifier<
        Objection.QueryBuilder<Objection.Model, Objection.Model[]>
      >;
    },
  ): Objection.QueryBuilder<Model, ModelInterface[]> {
    Logger.log('findSync', 'BaseRepository');

    const limit = params?.limit ?? NO_OF_LIMITED_QUERIES;

    let result = this.model
      .query()
      .withGraphFetched(graphFetch)
      .where(model ?? {})
      .limit(limit);

    if (graphModifier) {
      const { modifier, relationship } = graphModifier;
      result.modifyGraph(relationship, modifier);
    }

    if (params?.page) {
      result = result.offset(limit * (params.page - 1 || 1));
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

    // result

    if (params?.search && params?.filterBy !== 'password') {
      result = result.whereILike(
        params?.filterBy ?? 'name',
        `%${params.search}%`,
      );
    }

    return result as any as Objection.QueryBuilder<
      Model,
      Required<ModelInterface>[]
    >;
  }

  async find(
    model?: Partial<ModelInterface>,
    params?: FetchQuery,
    graphFetch?: string,
    graphModifier?: {
      relationship: string;
      modifier: Objection.Modifier<
        Objection.QueryBuilder<Objection.Model, Objection.Model[]>
      >;
    },
  ): Promise<
    IPaginatedResponse<
      Objection.QueryBuilder<Model, Required<ModelInterface[]>>
    >
  > {
    Logger.log('find', 'BaseRepository');

    const result = await this.findSync(
      model,
      params,
      graphFetch,
      graphModifier,
    );

    const total = await this.model.query().resultSize();

    return this.paginateData(
      total,
      result,
      Number(params.limit),
      Number(params.page),
    );
  }

  paginateData(
    total: number,
    data: Record<any, any>[],
    limit: number,
    currentPage = 1,
  ): IPaginatedResponse {
    Logger.log('paginateData', 'BaseRepository');

    if (!limit) {
      limit = NO_OF_LIMITED_QUERIES;
    }

    if (!currentPage) {
      currentPage = 1;
    }

    const pageCount = Math.ceil(total / limit);
    const nextPage = currentPage >= pageCount ? 0 : currentPage + 1;
    const previousPage = currentPage === 1 ? 0 : currentPage - 1;

    return {
      [this.model.tableName]: data,
      pagination: {
        current_page: currentPage,
        next_page: nextPage,
        previous_page: previousPage,
        limit: limit,
        page_count: pageCount,
        total,
      },
    };
  }

  findOne(
    model: Partial<ModelInterface>,
    params?: FetchQuery,
    graphFetch?: string,
  ): Objection.QueryBuilder<Model, Required<ModelInterface>> {
    Logger.log('findOne', 'BaseRepository');

    const limit = params?.limit ?? NO_OF_LIMITED_QUERIES;

    let result = this.model
      .query()
      .withGraphFetched(graphFetch)
      .findOne(model)
      .limit(limit);

    if (params?.page) {
      result = result.offset(limit * (params.page - 1 || 1));
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

    return result as any as Objection.QueryBuilder<
      Model,
      Required<ModelInterface>
    >;
  }

  async findById(id: number) {
    Logger.log('findById', 'BaseRepository');

    const data = await this.model.query().findById(id);

    return data;
  }

  async update(
    data: Partial<ModelInterface>,
    data2: Partial<ModelInterface>,
  ): Promise<Required<ModelInterface>>;
  async update(
    id: number,
    data2: Partial<ModelInterface>,
  ): Promise<Required<ModelInterface>>;
  async update(
    idOrModel: number | Partial<ModelInterface>,
    data: Partial<ModelInterface>,
  ): Promise<Required<ModelInterface>> {
    Logger.log('update', 'BaseRepository');

    let response: any;
    if (typeof idOrModel === 'number') {
      response = await this.model.query().patchAndFetchById(idOrModel, data);
    } else {
      response = await this.model.query().where(idOrModel).patch(data);
    }

    return response as Required<ModelInterface>;
  }

  async delete(id: number) {
    Logger.log('delete', 'BaseRepository');

    const response = await this.model.query().delete().where({ id: id });

    return response;
  }
}
