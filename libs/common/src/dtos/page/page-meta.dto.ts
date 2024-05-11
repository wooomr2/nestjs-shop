import { ApiProperty } from '@nestjs/swagger'
import { PageOptionDto } from './page-option.dto'

export class PageMetaDto {
  @ApiProperty()
  readonly page: number

  @ApiProperty()
  readonly take: number

  @ApiProperty()
  readonly itemCount: number

  @ApiProperty()
  readonly pageCount: number

  @ApiProperty()
  readonly hasPrevPage: boolean

  @ApiProperty()
  readonly hasNextPage: boolean

  constructor(itemCount: number, pageOption: PageOptionDto) {
    this.page = pageOption.page
    this.take = pageOption.take
    this.itemCount = itemCount
    this.pageCount = Math.ceil(itemCount / pageOption.take)
    this.hasPrevPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}
