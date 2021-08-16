import { ReadProductDTO } from './dto/read-product.dto';
import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pricing, Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {}

    async create(createProductDto: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto)
        return createdProduct.save()
    }

    // TODO filter by category
    // use aggregations, match by _id
}
