type pricing = {
    readonly deliveryCost: number
    readonly baseDiscount: number
    readonly pricelistCost: number
    readonly baseProfitMargin: number
    readonly additionalProfitMargin: number
}

export class ReadProductDTO {
    readonly id: string
    readonly fullName: string
    readonly basemodel: string
    readonly categoryName: string
    readonly subcatgeoryName: string
    readonly price: pricing
}