import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Pricing,
    PricingSchema,
    Product,
    ProductSchema
} from './schemas/product.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Product, schema: ProductSchema}, {name: Pricing, schema: PricingSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
