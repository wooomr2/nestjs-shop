import { PageOptionDto } from '@libs/common/dtos/page'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional, Max, Min } from 'class-validator'

export class FindAllProductDto extends PageOptionDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  search?: string

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  categoryId?: number

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  minPrice?: number

  @ApiProperty({ required: false, type: Number })
  @Type(() => Number)
  @IsOptional()
  maxPrice?: number

  @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5 })
  @Type(() => Number)
  @Min(1)
  @Max(5)
  @IsOptional()
  minRating?: number

  @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 5 })
  @Type(() => Number)
  @Min(1)
  @Max(5)
  @IsOptional()
  maxRating?: number
}
