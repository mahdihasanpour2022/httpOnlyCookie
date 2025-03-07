export interface ServerActionResponse {
  isSuccess: boolean;
  status: number;
  message: string;
  data: null | object | string;
}
