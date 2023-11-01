import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  listProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProductById(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }
}
