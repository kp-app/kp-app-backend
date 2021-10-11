import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document;

//could just use raw() from @nestjs/mongoose, might be an overkill
@Schema()
export class Pricing {
    @Prop({ required: false })
    deliveryCost?: number

    @Prop({ required: false })
    baseDiscount?: number

    @Prop({ required: false })
    pricelistCost?: number

    @Prop({ required: false })
    baseProfitMargin?: number

    @Prop({ required: false })
    additionalProfitMargin?: number
}
export const PricingSchema = SchemaFactory.createForClass(Pricing)

@Schema()
export class Product {
    @Prop({ required: true })
    fullName!: string

    @Prop({ required: false })
    basemodel?: string

    // subcat, cat names as strings for filtering
    @Prop({ required: false })
    categoryName?: string

    @Prop({ required: false })
    subcategoryName?: string

    @Prop({ type: PricingSchema, required: true })
    pricing!: Pricing
}

export const ProductSchema = SchemaFactory.createForClass(Product)