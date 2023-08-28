import { IBase } from '../../base/base.interface';

export interface IPostImage extends IBase {
  post_id: number;
  public_id: string;
  url: string;
  blurhash?: string;
}
