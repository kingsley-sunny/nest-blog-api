import { IBase } from '../../base/base.interface';

export interface IPostImage extends IBase {
  post_id: number;
  url: string;
  blurhash?: string;
}
