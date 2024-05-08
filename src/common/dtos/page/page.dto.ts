import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'
import { PageMetaDto } from './page-meta.dto'
import { PageOptionDto } from './page-option.dto'

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  @IsArray()
  readonly data: T[]

  @ApiProperty({ type: () => PageMetaDto })
  readonly meta: PageMetaDto

  constructor(data: T[], pageOption: PageOptionDto, itemCount: number) {
    this.data = data
    this.meta = new PageMetaDto(pageOption, itemCount)
  }
}
