type pricing = {
    deliveryCost: number
    baseDiscount: number
    pricelistCost: number
    baseProfitMargin: number
    additionalProfitMargin: number
}

export class CreateProductDTO {
    readonly id: string
    readonly fullName: string
    readonly basemodel: string
    readonly category: string
    readonly subcatgeory: string
    readonly price: pricing
}