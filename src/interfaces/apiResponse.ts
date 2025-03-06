export interface ApiResponse<T = null> {
  isSuccess: boolean;
  status: number;
  error : {message: string};
  data: T;
}
