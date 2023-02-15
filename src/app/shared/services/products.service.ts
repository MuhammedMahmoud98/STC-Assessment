import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/products.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  closeDialog$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  addNewProduct(productPayload: Omit<Product, 'id' | 'rating'>): Observable<Product> {
    return this.http.post<Product>(`${environment.baseUrl}/products`, productPayload);
  }

  updateProduct(productPayload: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.baseUrl}/products/${productPayload?.id}`, productPayload);
  }

  deleteProduct(productId?: number): Observable<Product> {
    return this.http.delete(`${environment.baseUrl}/products/${productId}`);
  }
}
