import {CategoriesService} from '../categories/categories.service'
import {ProductsService} from './products.service'
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
    Query, Patch,
} from '@nestjs/common'
import {CreateProductDTO} from './dto/create-product.dto'
import {SubcategoriesService} from 'src/subcategories/subcategories.service';
import {Product, ProductDocument} from './schemas/product.schema';
import {UpdateProductDTO} from './dto/update-product.dto';
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/enums/roles.enum";

@Roles(Role.Admin)
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoriesService: CategoriesService,
        private readonly subcategoriesService: SubcategoriesService
    ) {
    }

    @Post('?')
    async create(
        @Body() createProductDto: CreateProductDTO,
        @Query('categoryId') productCategoryId: string,
        @Query('subcategoryId') productSubcategoryId?: string
    ): Promise<void> {
        const productDoc: ProductDocument = await this.productsService.create(createProductDto)
        //return productId. Could use async/await syntax
        let id_ = productDoc.toObject()._id.toString()
        this.categoriesService.addProductToCategory(productCategoryId, id_)
        if (productSubcategoryId) {
            this.subcategoriesService.addProductToSubcategory(productSubcategoryId, id_)
        }

    }

    // TODO add subcategory Id to search. First step: fetch all subcats, second step: fetch all products from it
    // should work with subcat and without subcat
    @Roles(Role.User)
    @Get('category?')
    getProductsByCat(
        @Query('categoryId') categoryId: string
    ): Promise<Product[]> {
        return this.categoriesService.getAllProductsByCategory(categoryId)
    }

    @Roles(Role.User)
    @Get('subcategory?')
    getBySubcategory(
        @Query('subcategoryId') subcategoryId: string
    ): Promise<Product[]> {
        return this.subcategoriesService.getAllProductsBySubcategory(subcategoryId)
    }

    @Delete(':id?')
    removeProduct(
        @Param('id') productId: string,
        @Query('categoryId') categoryId: string,
        @Query('subcategoryId') productSubcategoryId?: string
    ): Promise<number> {
        const deletedCount = this.productsService.remove(productId)
        if (categoryId) {
            this.categoriesService.removeProductFromCategory(categoryId, productId)

        }
        if (productSubcategoryId) {
            this.subcategoriesService.removeProductFromSubcategory(productSubcategoryId, productId)
        }
        return deletedCount
    }

    // use updateProductDto
    @Put(':id')
    async updateProductInfo(@Body() createProductDto: UpdateProductDTO, @Param('id') id: string) {
        await this.productsService.update(id, createProductDto)
    }

    @Patch('setPrice')
    async updateProductPriceByFullName(
        @Query('fullName') fullNameEncoded: string,
        @Body() updateProductDto: UpdateProductDTO
    ) {
        // This will lead to data inconsistency if used by more than one user
        const product = await this.productsService.findByName(fullNameEncoded)
        await this.productsService.update(product._id, updateProductDto)
    }
}
