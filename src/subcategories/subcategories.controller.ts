import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {SubcategoriesService} from "./subcategories.service";
import {CategoriesService} from "../categories/categories.service";
import {CreateOrUpdateSubcategoryDTO} from "./dto/create-or-update-subcategory.dto";
import {Role} from "../roles/enums/roles.enum";
import {Roles} from "../roles/roles.decorator";

@Roles(Role.Admin)
@Controller('subcategories')
export class SubcategoriesController {
    constructor(
        private readonly subcategoriesService: SubcategoriesService,
        private readonly categoryService: CategoriesService
    ) {
    }

    @Roles(Role.User)
    @Get('all')
    async getAllSubcategories(): Promise<object[]> {
        return this.subcategoriesService.getAllSubcategories()
    }

    @Roles(Role.User)
    @Get('?')
    async getSubcategoriesByCategory(@Query('categoryId') categoryId: string) {
        return this.categoryService.getSubcategoriesFromCategory(categoryId)
    }


    @Post('?')
    async createSubcategory(@Body() subcategoryDto: CreateOrUpdateSubcategoryDTO,
                            @Query('categoryId') categoryId: string
    ): Promise<void> {
        const subcatId = await this.subcategoriesService.createSubcategory(subcategoryDto)
        this.categoryService.addSubcatToCategory(categoryId, subcatId)

    }

    @Put(':id')
    async renameSubcategory(@Body() newNameDto: CreateOrUpdateSubcategoryDTO,
                            @Param('id') subcatId: string
    ): Promise<object> {
        return await this.subcategoriesService.renameSubcategory(subcatId, newNameDto)
    }

    @Delete(':id?')
    async deleteSubcategory(@Param('id') subcatId: string,
                            @Query('categoryId') categoryId: string
    ): Promise<number> {
        this.categoryService.removeSubcatFromCategory(categoryId, subcatId)
        return this.subcategoriesService.deleteSubcategory(subcatId)
    }
}
