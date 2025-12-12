export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginationMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMetaData;
}

export interface PaginationDto {
  page?: number;
  limit?: number;
}
