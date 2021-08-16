import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type ProductDocument = Product & Document;

//could just use raw() from @nestjs/mongoose, might be an overkill
@Schema()
export class Pricing extends Document {
    @Prop({ required: false })
    deliveryCost?: number

    @Prop({ required: false })
    baseDiscount?: number

    @Prop({ required: false })
    priceListCost?: number

    @Prop({ required: false })
    baseMargin?: number

    @Prop({ required: false })
    additionalProfitMargin?: number
}
export const PricingSchema = SchemaFactory.createForClass(Pricing)

@Schema()
export class Product {
    @Prop({ required: true })
    name!: string

    @Prop({ required: true })
    basemodel!: string

    // subcat, cat aren't needed here

    @Prop({ type: PricingSchema, required: true })
    pricing!: Pricing
}

export const ProductSchema = SchemaFactory.createForClass(Product)
// ProductSchema.virtual('categories', {
//     ref: 'category',
//     localField: '_id',
//     foreignField: 'product',
// })