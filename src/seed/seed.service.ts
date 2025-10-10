import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';
import { Product } from 'src/products/entities';



@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,

  ) { }
  async runSeed() {
    await this.insertNewProducts()
    return 'Seed executed';
  }

  private async insertNewProducts() {
    //This.ProductsService.deleteAllProducts()
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    type CreateReturn = ReturnType<ProductsService['create']>;
    const insertPromises: CreateReturn[] = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product));
    })

    const result = await Promise.all(insertPromises);
    return true
  }
}
