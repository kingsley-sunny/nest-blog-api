export interface IFileManagement {
  uploadFile: (file: Express.Multer.File) => Promise<IUploadedFileResponse>;
}

export interface IUploadedFileResponse {
  url: string;
}
