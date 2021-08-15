import { Controller } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    
    getAll (category: string): string {
        return category
    }

}
