export interface IResponse {
  statusCode: number;
  message: string;
  data: any;
  timestamp: string;
  path?: string;
  resource?: string;
}
