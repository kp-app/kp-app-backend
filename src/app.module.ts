import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from './products/products.module';
import {CategoriesModule} from './categories/categories.module';
import {SubcategoriesModule} from './subcategories/subcategories.module';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import configuration from "./config/configuration";


@Module({
    imports: [ProductsModule,
        MongooseModule.forRoot(`mongodb+srv://@kp-app.ke9ej.mongodb.net/kp-app?retryWrites=true&w=majority`),
        CategoriesModule,
        SubcategoriesModule,
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({isGlobal: true, load: [configuration], cache: true})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
