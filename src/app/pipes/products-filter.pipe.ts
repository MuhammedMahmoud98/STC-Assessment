import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/products.model';

@Pipe({
  name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
  transform(products: Product[], selectedCategory: string): Product[] {
    return products.filter((product) => product.category === selectedCategory);
  }
}
