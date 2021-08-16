// import { ReadCategoryDTO } from './dto/read-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Product } from 'src/products/schemas/product.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) categoryModel: Model<CategoryDocument) {}

    async findAllProductsByCategory(categoryId: string): Promise<Product[]> {
        // TODO fix aggregation
        return this.categoryModel.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'products',
                    'foreignField': '_id',
                    'as': 'productsByGroup'
                }
            },
            {
                '$project': {
                    '_id': 0,
                    'productsByGroup': 1
                }
            },
            {
                '$unwind': {
                    'path': '$productsByGroup',
                    'preserveNullAndEmptyArrays': false
                }
            }   
        ],
            function(err, products): void {}
        ).unwind().exec()
    }

    async findAllCategories(): Promise<Category[]> {
        return this.categoryModel.find().exec(); 
    }

    async createCategory(createCategoryDto: CreateCategoryDTO) {
        const createdCategory = new this.categoryModel(createCategoryDto)
        createdCategory.save()
    }
}
