interface Pageable {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export default interface Page<T> {
  content: T[];
  page: Pageable;
}
