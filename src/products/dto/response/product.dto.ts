import { Expose, Transform } from 'class-transformer'

export class ProductDto {
  @Expose({ name: 'product_id' })
  id: number
  @Expose({ name: 'product_title' })
  title: string

  @Expose({ name: 'product_description' })
  description: string

  @Expose({ name: 'product_price' })
  price: number

  @Expose({ name: 'product_stock' })
  stock: number

  @Expose({ name: 'product_images' })
  @Transform(({ value }) => value.toString().split(','))
  images: string[]

  @Transform(({ obj }) => {
    return {
      id: obj.category_id,
      title: obj.category_title,
    }
  })
  @Expose()
  category: any

  @Expose({ name: 'review_cnt' })
  review: number
  @Expose({ name: 'avg_rating' })
  rating: number
}
