export interface ApiResponseInterface<T> {
  success: boolean,
  message: null | string,
  data: T
};
