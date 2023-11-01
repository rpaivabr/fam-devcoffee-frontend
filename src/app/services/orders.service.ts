import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  order: Order = {
    products: [],
  };

  constructor(private http: HttpClient) {}

  saveOrder() {
    return this.http.post<Order>('http://localhost:3000/orders', this.order);
  }

  addToCart(product: Product) {
    this.order.products.push(product);
  }
}
