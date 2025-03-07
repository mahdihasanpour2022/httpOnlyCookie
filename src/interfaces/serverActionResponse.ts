export interface ServerActionResponse {
  isSuccess: boolean;
  status: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: null | Record<string, any>;
}
