export interface PaginationInterface<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
};
