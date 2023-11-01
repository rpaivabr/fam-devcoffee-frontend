import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private router: Router, private ordersService: OrdersService) {}

  order = this.ordersService.order;

  submitOrder() {
    this.ordersService.saveOrder().subscribe((order) => {
      console.log(order);
      this.router.navigate(['cart']);
    });
  }
}
