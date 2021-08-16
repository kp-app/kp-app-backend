import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const pass: string = process.env.MONGO_PASS
const user: string = process.env.MONGO_USER
const dbname: string = process.env.MONGO_DBNAME

@Module({
    imports: [ProductsModule, MongooseModule.forRoot(`mongodb+srv://${user}:${pass}@kp-app.ke9ej.mongodb.net/${dbname}?retryWrites=true&w=majority`)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
