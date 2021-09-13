import {CreateProductDTO} from './dto/create-product.dto';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Pricing, Product, ProductDocument} from './schemas/product.schema';
import {UpdateProductDTO} from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
    ) {
    }

    async create(createProductDto: CreateProductDTO): Promise<ProductDocument> {
        const createdProduct = new this.productModel(createProductDto)
        await createdProduct.save()
        return createdProduct
    }

    async remove(productId: string): Promise<number> {
        const query = {'_id': Types.ObjectId(productId)}
        return (await this.productModel.deleteOne(query).exec()).deletedCount
    }

    async update(productId: string, dto: UpdateProductDTO): Promise<void> {
        const query = {'_id': Types.ObjectId(productId)}
        await this.productModel.findOneAndUpdate(query, dto, {
            upsert: true,
            runValidators: true,
            useFindAndModify: false
        }).exec()
    }

    async findByName(fullNameEncoded: string): Promise<ProductDocument> {
        const fullNameDecoded = decodeURI(fullNameEncoded)
        return await this.productModel.findOne({'fullName': fullNameDecoded}).exec()
    }
}
