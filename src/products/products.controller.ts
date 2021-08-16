import { ProductsService } from './products.service'
import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Put,
} from '@nestjs/common'
import { CreateProductDTO } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
        this.productsService = productsService
    }

    @Get()
    getAll(): string {
        return 'chuch'
    }

    @Get(':id')
    getByCategory(@Param('id') id: string): string {
        return `robot of category with id of ${id}`
    }

    @Post()
    create(@Body() createProductDto: CreateProductDTO): string {
        return `Title of the product is ${createProductDto.fullName}`
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
