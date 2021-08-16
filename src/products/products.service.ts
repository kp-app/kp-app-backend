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
        //@InjectModel(Pricing.name) private readonly pricingModel: Model<PricingDoc>
    ) {}

    async create(createProductDto: CreateProductDTO): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto)
        return createdProduct.save()
    }

    // TODO filter by category
    // use aggregations or just add string with name of category/subcategory, fuck normalization
    async findAllByCategory(findProductDto: ReadProductDTO): Promise<Product[]> {
        return this.productModel.find(
            {
                categoryName: findProductDto.categoryName,
                subcategoryName: findProductDto.subcategoryName,
            }, 
            null
        ).exec()
    }
}
