// create data-transfer object
type pricing = {
    deliveryCost: number
    baseDiscount: number
    pricelistCost: number
    baseProfitMargin: number
    additionalProfitMargin: number
}

export class UpdateProductDTO {
    readonly id: string
    readonly fullName: string
    readonly basemodel: string
    readonly categoryName: string
    readonly subcatgeoryName: string
    readonly price: pricing
}