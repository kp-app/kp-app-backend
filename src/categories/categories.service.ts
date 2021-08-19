import {CreateCategoryDTO} from './dto/create-category.dto';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Category, CategoryDocument} from './schemas/category.schema';

@Injectable()
export class CategoriesService {
    // TODO add errors (5xx) on fails, add types
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
    }

    async getAllProductsByCategory(categoryId: string): Promise<any[]> {
        
        return (await this.categoryModel.aggregate([
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
                        products: 0,
                        subcategories: 0
                    }
                }
            ]
        ).exec()).map(embeddedObj => ({...embeddedObj.product_obj}))
    }

    async findAllCategories(): Promise<Category[]> {
        return await this.categoryModel.aggregate(
            [
                {
                    $project: {
                        name: 1,
                        _id: 1
                    }
                }
            ]
        ).exec()
    }

    async createCategory(createCategoryDto: CreateCategoryDTO): Promise<void> {
        const createdCategory = new this.categoryModel(createCategoryDto)
        await createdCategory.save()
    }

    async updateCategory(catId: string, dto: CreateCategoryDTO) {
        const query = {'_id': Types.ObjectId(catId)}
        await this.categoryModel.findOneAndUpdate(query, dto, {
            upsert: true,
            runValidators: true,
            useFindAndModify: false
        }).exec()
    }

    async deleteCategory(catId: string) {
        const query = {'_id': Types.ObjectId(catId)}
        return (await this.categoryModel.deleteOne(query).exec()).deletedCount
    }

    // These are here because I couldn't write a comprehensive update that could be used for adding/removal of products
    async addProductToCategory(catId: string, productId: string) {
        const query = {'_id': Types.ObjectId(catId)}
        this.categoryModel.updateOne(query, {$push: {products: Types.ObjectId(productId)}}).exec()
    }

    async removeProductFromCategory(catId: string, productId: string): Promise<void> {
        const query = {'_id': Types.ObjectId(catId)}
        this.categoryModel.updateOne(query, {$pull: {products: Types.ObjectId(productId)}}).exec()
    }

    // TODO Add to subcat's controller
    async addSubcatToCategory(catId: string, subcatId: string) {
        const query = {'_id': Types.ObjectId(catId)}
        this.categoryModel.updateOne(query, {$push: {subcategories: Types.ObjectId(subcatId)}}).exec()
    }

    async removeSubcatFromCategory(catId: string, subcatId: string): Promise<void> {
        const query = {'_id': Types.ObjectId(catId)}
        this.categoryModel.updateOne(query, {$pull: {products: Types.ObjectId(subcatId)}}).exec()
    }

    async getSubcategoriesFromCategory(categoryId: string): Promise<object[]> {
        const categoriesNested = await this.categoryModel.aggregate(
            [
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
                        path: '$subcategories',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $lookup: {
                        from: 'subcategories',
                        localField: 'subcategories',
                        foreignField: '_id',
                        as: 'subcategory_obj'
                    }
                },
                {
                    $unwind: {
                        path: '$subcategory_obj',
                        preserveNullAndEmptyArrays: false
                    }
                }, {
                $project: {
                    products: 0,
                    subcategories: 0
                }
            }
            ]
        ).exec()
        return categoriesNested.map(structuredObj => ({
            _id: structuredObj.subcategory_obj._id,
            name: structuredObj.subcategory_obj.name
        }))
    }
}
