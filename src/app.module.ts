import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {CategoriesModule} from './categories/categories.module';
import {SubcategoriesModule} from './subcategories/subcategories.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";


@Module({
    imports: [ProductsModule, MongooseModule.forRoot(`mongodb+srv://@kp-app.ke9ej.mongodb.net/kp-app?retryWrites=true&w=majority`),
        CategoriesModule,
        SubcategoriesModule,
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
