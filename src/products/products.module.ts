import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}
