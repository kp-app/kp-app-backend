type pricing = {
    readonly deliveryCost: number
    readonly baseDiscount: number
    readonly pricelistCost: number
    readonly baseProfitMargin: number
    readonly additionalProfitMargin: number
}

export class CreateProductDTO {
    readonly fullName: string
    readonly basemodel: string
    readonly categoryName: string
    readonly subcategoryName: string
    readonly pricing: pricing
}