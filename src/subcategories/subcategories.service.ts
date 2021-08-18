import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Subcategory, SubcategoryDocument} from "./schemas/subcategory.schema";
import {Model, Types} from "mongoose";
import {CreateOrUpdateSubcategoryDTO} from "./dto/create-or-update-subcategory.dto";

@Injectable()
export class SubcategoriesService {
    constructor(@InjectModel(Subcategory.name) private subcategoryModel: Model<SubcategoryDocument>) {
    }

    async getAllProductsBySubcategories(subcategoryId: string): Promise<any[]> {
        return await this.subcategoryModel.aggregate(
            [
                {
                    $match: {
                        _id: Types.ObjectId(subcategoryId)
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

    async createSubcategory(createSubcategoryDto: CreateOrUpdateSubcategoryDTO): Promise<void> {
        const createdSubcat: SubcategoryDocument = new this.subcategoryModel(createSubcategoryDto)
        await createdSubcat.save()
    }

    async renameSubcategory(subcatId: string, dto: CreateOrUpdateSubcategoryDTO) {
        const query = {'_id': Types.ObjectId(subcatId)}
        await this.subcategoryModel.findOneAndUpdate(query, dto, {
            upsert: true,
            runValidators: true,
            useFindAndModify: false
        }).exec()
    }

    async deleteSubcategory(subcatId: string): Promise<number> {
        const query = {'_id': Types.ObjectId(subcatId)}
        return (await this.subcategoryModel.deleteOne(query).exec()).deletedCount
    }

    // These are here because I couldn't write a comprehensive update that could be used for adding/removal of products
    async addProductToSubcategory(subcatId: string, productId: string) {
        const query = {'_id': Types.ObjectId(subcatId)}
        this.subcategoryModel.updateOne(query, {$push: {products: Types.ObjectId(productId)}}).exec()
    }

    async removeProductFromSubcategory(subcatId: string, productId: string): Promise<void> {
        const query = {'_id': Types.ObjectId(subcatId)}
        this.subcategoryModel.updateOne(query, {$pull: {products: Types.ObjectId(productId)}}).exec()
    }
}
