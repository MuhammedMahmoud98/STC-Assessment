import { Product } from './products.model';

export interface DialogData {
  title?: string;
  mode?: string;
  product?: Product;
  id?: number;
}
