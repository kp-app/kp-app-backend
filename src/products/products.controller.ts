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
    Query,
} from '@nestjs/common'
import {CreateProductDTO} from './dto/create-product.dto'
import {SubcategoriesService} from 'src/subcategories/subcategories.service';
import {Product, ProductDocument} from './schemas/product.schema';
import {UpdateProductDTO} from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly categoriesService: CategoriesService,
        private readonly subcategoriesService: SubcategoriesService
    ) {
    }

    @Post('?')
    create(
        @Body() createProductDto: CreateProductDTO,
        @Query('categoryId') productCategoryId: string
    ): void {
        const productDoc: Promise<ProductDocument> = this.productsService.create(createProductDto)
        //return productId
        productDoc.then(
            (prodDoc: ProductDocument) => {
                let id_ = prodDoc.toObject()._id.toString()
                this.categoriesService.addProductToCategory(productCategoryId, id_)
                //this.subcategoriesService.addProductToSubcategory(productId, id_)
            }
        )
    }

    // TODO add subcategory Id to search. First step: fetch all subcats, second step: fetch all products from it
    // should work with subcat and without subcat
    @Get('?')
    getProductsByCatAndSubcat(
        @Query('categoryId') categoryId: string,
        @Query('subcategoryId') subcategoryId?: string
    ): Promise<Product[]> {
        return this.categoriesService.getAllProductsByCategory(categoryId)
    }

    // TODO add subcat id in query params
    @Delete(':id?')
    removeProduct(
        @Param('id') productId: string,
        @Query('categoryId') categoryId?: string
    ): Promise<number> {
        const deletedCount = this.productsService.remove(productId)
        if (categoryId) {
            this.categoriesService.removeProductFromCategory(categoryId, productId)
        }
        //this.subcategoriesService.removeProductFromSubcategory(productId)
        return deletedCount
    }

    // use updateProductDto
    @Put(':id')
    updateProductInfo(@Body() createProductDto: UpdateProductDTO, @Param('id') id: string) {
        this.productsService.update(id, createProductDto)
    }
}
