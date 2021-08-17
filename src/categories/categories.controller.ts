import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Category } from './schemas/category.schema';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async getAll(): Promise<Category[]> {
        return this.categoriesService.findAllCategories()
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDTO): void {
        this.categoriesService.createCategory(createCategoryDto)
    }

    @Put(':id')
    updateCategory(
        @Body() createCategoryDTO: CreateCategoryDTO, 
        @Param('id') categoryId: string
    ) {
        this.categoriesService.updateCategory(categoryId, createCategoryDTO)
    }

    @Delete(':id')
    deleteCategory(
        @Param('id') categoryId: string
    ) {
        return this.categoriesService.deleteCategory(categoryId)
    }
}
