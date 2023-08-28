export interface IFileManagement {
  uploadFile: (file: Express.Multer.File) => Promise<IUploadedFileResponse>;

  updateFile: (
    id: string,
    file: Express.Multer.File,
  ) => Promise<IUploadedFileResponse>;

  deleteFile: (id: string) => Promise<boolean>;
}

export interface IUploadedFileResponse {
  url: string;
  public_id: string;
}
