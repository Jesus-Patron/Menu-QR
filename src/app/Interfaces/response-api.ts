export interface ResponseApi<T> {
  status: boolean;
  msg: string;
  value: T;
}