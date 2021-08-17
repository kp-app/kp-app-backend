// import { ReadCategoryDTO } from './dto/read-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

    async findAllProductsByCategory(categoryId: string): Promise<any[]> {
        
        // TODO fix return
        return this.categoryModel.aggregate([
            {
                $match: {
                    _id: Types.ObjectId(categoryId)
                }
            }, 
            {
                $project: {
                    _id: 0, 
                    name: 0
                }
            }, 
            {
                $unwind: {
                    path: '$products', 
                    preserveNullAndEmptyArrays: false
                }
            }, 
            {
                $lookup: {
                    from: 'products', 
                    localField: 'products', 
                    foreignField: '_id', 
                    as: 'product_obj'
                }
            }, 
            {
                $unwind: {
                    path: '$product_obj', 
                    preserveNullAndEmptyArrays: false
                }
            }, {
                $project: {
                    products: 0
                }
            }
          ]
        ).exec()
    }

    async findAllCategories(): Promise<Category[]> {
        return this.categoryModel.find().exec()
    }

    async createCategory(createCategoryDto: CreateCategoryDTO) {
        const createdCategory = new this.categoryModel(createCategoryDto)
        createdCategory.save()
    }
}
