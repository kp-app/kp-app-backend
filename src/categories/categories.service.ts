// import { ReadCategoryDTO } from './dto/read-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
    // TODO add errors (5xx) on fails, add types
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
        return this.categoryModel.aggregate(
            [
                {$project: {
                    name: 1,
                    _id: 1
                }}
            ]
        ).exec()
    }

    async createCategory(createCategoryDto: CreateCategoryDTO): Promise<void> {
        const createdCategory = new this.categoryModel(createCategoryDto)
        createdCategory.save()
    }

    async updateCategory(catId: string, dto: CreateCategoryDTO) {
        const query = { '_id': Types.ObjectId(catId) }
        this.categoryModel.findOneAndUpdate(query, dto, { upsert: true, runValidators: true, useFindAndModify: false }).exec()
    }

    async deleteCategory(catId: string) {
        const query = { '_id': Types.ObjectId(catId) }
        return (await this.categoryModel.deleteOne(query).exec()).deletedCount
    }

    // TODO Add to subcat's service, uncomment in products controller
    async addProductToCategory(catId: string, productId: string) {
        const query = { '_id': Types.ObjectId(catId) }
        this.categoryModel.updateOne(query, { $push: { products: Types.ObjectId(productId) } }).exec()
    }

    async removeProductFromCategory(catId: string, productId: string): Promise<void> {
        const query = { '_id': Types.ObjectId(catId) }
        this.categoryModel.updateOne(query, { $pull: { products: Types.ObjectId(productId) } }).exec()
    }

    // TODO Add to subcat's controller
    async addSubcatToCategory(catId: string, subcatId: string) {
        const query = { '_id': Types.ObjectId(catId) }
        this.categoryModel.updateOne(query, { $push: { subcategories: Types.ObjectId(subcatId) } }).exec()
    }

    async removeSubcatFromCategory(catId: string, subcatId: string): Promise<void> {
        const query = { '_id': Types.ObjectId(catId) }
        this.categoryModel.updateOne(query, { $pull: { products: Types.ObjectId(subcatId) } }).exec()
    }
}
