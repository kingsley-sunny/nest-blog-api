import { ApiProperty } from '@nestjs/swagger';

class PaginationResponse {
  @ApiProperty()
  previous_page: number;

  @ApiProperty()
  current_page: number;

  @ApiProperty()
  next_page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  page_count: number;

  @ApiProperty()
  total: number;
}

export function BaseApiResponse({
  data,
  message,
  statusCode,
  isPaginate,
}: {
  data: any;
  message: string;
  statusCode: number;
  isPaginate?: boolean;
}) {
  class PaginationDataResponse {
    @ApiProperty({ type: data, isArray: true, name: data.tableName })
    data;

    @ApiProperty({ type: PaginationResponse })
    pagination;
  }

  const pageDtoName =
    data?.name + (Math.random() * 9000).toString(32).toUpperCase();

  const PageDtoClass = Object.defineProperty(PaginationDataResponse, 'name', {
    value: pageDtoName,
  });

  class ResponseClass {
    @ApiProperty({ type: isPaginate ? PageDtoClass : data })
    data: typeof data;

    @ApiProperty({ type: 'string', example: message })
    message: string;

    @ApiProperty({ type: 'number', example: statusCode })
    statusCode: number;
  }

  const dtoName =
    data?.name + (Math.random() * 9000).toString(32).toUpperCase();

  return Object.defineProperty(ResponseClass, 'name', {
    value: dtoName,
  });
}
