import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'
import { PageMetaDto } from './page-meta.dto'
import { PageOptionDto } from './page-option.dto'

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  readonly items: T[]

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto

  constructor(items: T[], itemCount: number, pageOption: PageOptionDto) {
    this.items = items
    this.meta = new PageMetaDto(itemCount, pageOption)
  }
}
