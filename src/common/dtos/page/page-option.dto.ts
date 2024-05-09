import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

export enum ORDER_BY {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionDto {
  @ApiPropertyOptional({ enum: ORDER_BY, default: ORDER_BY.DESC })
  @IsEnum(ORDER_BY)
  @IsOptional()
  readonly order: ORDER_BY = ORDER_BY.DESC

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1

  @ApiPropertyOptional({ minimum: 1, maximum: 100, default: 10 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly take: number = 10

  get skip(): number {
    return (this.page - 1) * this.take
  }
}
