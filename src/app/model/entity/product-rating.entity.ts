import { ProductRatingDtoInterface } from "../dto/product-rating-dto.interface";
import { ProductRatingInterface } from "../interface/product-rating.interface";

export class ProductRatingEntity implements ProductRatingInterface {
    source?: string;
    value?: number;
    valueMax?: number;
    valueType?: 'PERCENT' | 'RATING';

    constructor({source, value, valueMax, valueType}: Partial<ProductRatingInterface>) {
        this.source = source;
        this.value = value;
        this.valueMax = valueMax;
        this.valueType = valueType;
    }

    static fromDto(dto: ProductRatingDtoInterface): ProductRatingInterface {
        let value: number;
        let valueMax: number | undefined;
        let valueType: 'PERCENT' | 'RATING' = 'RATING';

        // Get type
        if (dto.Value.indexOf('%')>-1) {
            valueType = 'PERCENT'
        }

        // Get the value
        switch (valueType) {
            case 'PERCENT':
                value = parseFloat(dto.Value.split('%')[0]);
                break;
            case 'RATING':
                value = parseFloat(dto.Value.split('/')[0]);
                valueMax = parseFloat(dto.Value.split('/')[1]);
                break;
        }

        const ratingEntity = new ProductRatingEntity({
            source: dto.Source,
            value: value,
            valueMax: valueMax,
            valueType: valueType
        });

        return ratingEntity;
    }
}