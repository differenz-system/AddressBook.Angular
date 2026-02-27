export interface ApiResponse<T> {
  isSuccess: boolean;
  msg: string;
  data: T;
}
