import { ProductsService } from './products.service'
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
import { CreateProductDTO } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() createProductDto: CreateProductDTO): void {
        this.productsService.create(createProductDto)
    }

    @Delete(':id')
    removeProduct(@Param('id') id: string): string {
        return id
    }

    // use updateProductDto
    @Put(':id')
    updateProductInfo(@Body() createProductDto: CreateProductDTO, @Param('id') id: string): string {
        return "hey, an update!"
    }
}
