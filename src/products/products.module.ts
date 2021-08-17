import { SubcategoriesModule } from './../subcategories/subcategories.module';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Pricing,
    PricingSchema,
    Product,
    ProductSchema,
} from './schemas/product.schema';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { Category, CategorySchema } from 'src/categories/schemas/category.schema';
import { Subcategory, SubcategorySchema } from 'src/subcategories/schemas/subcategory.schema';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';

@Module({
    imports: [MongooseModule.forFeature(
        [
            {name: Product.name, schema: ProductSchema}, 
            {name: Pricing.name, schema: PricingSchema },
        ]),
        CategoriesModule,
        MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        SubcategoriesModule,
        MongooseModule.forFeature([{ name: Subcategory.name, schema: SubcategorySchema }])
    ],
    controllers: [ProductsController],
    providers: [ProductsService, CategoriesService, SubcategoriesService]
})
export class ProductsModule {}
