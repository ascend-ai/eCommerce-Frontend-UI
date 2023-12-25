import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../constants';
import { PaginationInterface } from '../interfaces';

export class PaginationModel<T> implements PaginationInterface<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  constructor(data: PaginationInterface<T> = {
    content: [],
    totalElements: 0,
    totalPages: 1,
    page: DEFAULT_PAGE_SIZE,
    size: DEFAULT_PAGE_INDEX,
  }) {
    this.content = data?.content || [];
    this.totalElements = data?.totalElements || 0;
    this.totalPages = data?.totalPages || 0;
    this.page = data?.page || 0;
    this.size = data?.size || 9;
  }
};
