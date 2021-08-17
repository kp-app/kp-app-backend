import { Product } from 'src/products/schemas/product.schema';
// import { ReadCategoryDTO } from './dto/read-category.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getAll(): Promise<Category[]> {
        return this.categoriesService.findAllCategories()
    }

    @Get(':categoryId')
    getProductsByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
        return this.categoriesService.findAllProductsByCategory(categoryId)
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDTO): void {
        this.categoriesService.createCategory(createCategoryDto)
    }

}
