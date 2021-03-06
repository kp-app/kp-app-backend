import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as GooseSchema } from 'mongoose'
import { Product } from 'src/products/schemas/product.schema'

export type SubcategoryDocument = Subcategory & Document;

@Schema()
export class Subcategory {
    @Prop({
        required: true,
        type: [{type: GooseSchema.Types.ObjectId, ref: 'Product'}] 
    })
    products!: Product[]

    @Prop({ required: true })
    name!: string
}
export const SubcategorySchema = SchemaFactory.createForClass(Subcategory)