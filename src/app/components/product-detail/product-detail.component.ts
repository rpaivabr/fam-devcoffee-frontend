import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private ordersService: OrdersService
  ) {}

  id = this.route.snapshot.params['id'];
  product$ = this.productsService.getProductById(this.id);

  addToCart(product: Product) {
    this.ordersService.addToCart(product);
    this.router.navigate(['cart']);
  }
}
