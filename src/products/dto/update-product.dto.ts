// create data-transfer object
type pricing = {
    deliveryCost?: number
    baseDiscount?: number
    pricelistCost?: number
    baseProfitMargi?: number
    additionalProfitMargin?: number
}

export class UpdateProductDTO {
    readonly fullName?: string
    readonly basemodel?: string
    readonly categoryName?: string
    readonly subcategoryName?: string
    readonly price?: pricing
}