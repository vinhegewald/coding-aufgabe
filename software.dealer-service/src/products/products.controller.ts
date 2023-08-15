import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async products(): Promise<any> {
    return await this.productsService.products();
  }

  @Get('/latest')
  async getLatestProducts(): Promise<any> {
    return await this.productsService.getLatestProducts();
  }

  @Get(':id')
  async product(@Param('id') id: string): Promise<Product> {
    return await this.productsService.product(id);
  }

  @Post('/search')
  async searchProducts(@Body() body: any): Promise<Product> {
    return await this.productsService.searchProducts(body);
  }
  @Post()
  async createProduct(@Body() body: any): Promise<Product> {
    return await this.productsService.createProduct(body);
  }
}
