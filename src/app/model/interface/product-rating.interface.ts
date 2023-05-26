import { ProductComponent } from "src/app/components/views/product/product.component"

export interface ProductRatingInterface {
    source?: string,
    value?: number,
    valueMax?: number,
    valueType?: 'PERCENT' | 'RATING'
}