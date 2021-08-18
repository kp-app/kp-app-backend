import {Module} from '@nestjs/common';
import {SubcategoriesService} from './subcategories.service';
import {SubcategoriesController} from './subcategories.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Subcategory, SubcategorySchema} from './schemas/subcategory.schema';
import {CategoriesService} from "../categories/categories.service";
import {CategoriesModule} from "../categories/categories.module";
import {Category, CategorySchema} from "../categories/schemas/category.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Subcategory.name, schema: SubcategorySchema}]),
        CategoriesModule,
        MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}])],
    providers: [SubcategoriesService, CategoriesService],
    controllers: [SubcategoriesController]
})
export class SubcategoriesModule {
}
