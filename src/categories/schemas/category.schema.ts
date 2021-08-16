import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Product } from 'src/products/schemas/product.schema'
import { Subcategory } from 'src/subcategories/schemas/subcategory.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({
        required: true,
        type: [{type: Schema.Types.ObjectId, ref: 'Product'}] 
    })
    products!: Product[]

    @Prop({
        required: true,
        type: [{type: Schema.Types.ObjectId, ref: 'Subcategory'}]
    })
    basemodel!: Subcategory[]
}
export const CategorySchema = SchemaFactory.createForClass(Category)