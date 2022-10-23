export interface PaginationConfig {
  take?: number;
  skip?: number;
  orderColumn?: string;
  order: 'ASC' | 'DESC';
}
