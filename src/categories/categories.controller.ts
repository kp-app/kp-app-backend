import {CreateCategoryDTO} from './dto/create-category.dto';
import {CategoriesService} from './categories.service';
import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Category} from './schemas/category.schema';
import {Roles} from "../roles/roles.decorator";
import {Role} from "../roles/enums/roles.enum";

@Roles(Role.Admin)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    @Roles(Role.User)
    @Get()
    async getAll(): Promise<Category[]> {
        return this.categoriesService.findAllCategories()
    }

    @Post()
    async createCategory(@Body() createCategoryDto: CreateCategoryDTO): Promise<void> {
        await this.categoriesService.createCategory(createCategoryDto)
    }

    @Put(':id')
    async updateCategory(
        @Body() createCategoryDTO: CreateCategoryDTO,
        @Param('id') categoryId: string
    ) {
        await this.categoriesService.updateCategory(categoryId, createCategoryDTO)
    }

    @Delete(':id')
    deleteCategory(
        @Param('id') categoryId: string
    ) {
        return this.categoriesService.deleteCategory(categoryId)
    }
}
