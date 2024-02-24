import {
  ApiResponseInterface
} from '../interfaces';

export class ApiResponseModel<T> implements ApiResponseInterface<T> {
  success: boolean;
  message: null | string;
  data: T;
  constructor(data: Partial<ApiResponseInterface<T>> | Partial<ApiResponseModel<T>> = {
    success: false,
    message: null,
    data: null as any
  }) {
    this.success = data?.success || false;
    this.message = data?.message || null;
    this.data = (data?.data || null) as T;
  }
};
