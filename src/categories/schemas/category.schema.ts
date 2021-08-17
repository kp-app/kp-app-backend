import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Schema as GooseSchema } from 'mongoose'
import { Product } from 'src/products/schemas/product.schema'
import { Subcategory } from 'src/subcategories/schemas/subcategory.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({
        required: true,
        type: [{type: GooseSchema.Types.ObjectId, ref: 'Product'}] 
    })
    products!: Product[]

    @Prop({
        required: true,
        type: [{type: GooseSchema.Types.ObjectId, ref: 'Subcategory'}]
    })
    subcategories!: Subcategory[]

    @Prop({ required: true })
    name!: string
}
export const CategorySchema = SchemaFactory.createForClass(Category)