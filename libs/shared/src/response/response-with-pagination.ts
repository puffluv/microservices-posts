import { PaginationDto } from '../dto';

export class ReponseWithPagination<T> extends PaginationDto {
  total!: number;

  data: T[];
}
