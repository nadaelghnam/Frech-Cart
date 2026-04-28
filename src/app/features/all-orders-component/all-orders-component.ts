import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { OrderService } from '../../core/Services/order-service';
import { AuthService } from '../../core/auth/services/auth-service';
import { isPlatformBrowser } from '@angular/common';
import { UserOderInterface } from '../../core/models/user-oder-interface';

@Component({
  selector: 'app-all-orders-component',
  imports: [],
  templateUrl: './all-orders-component.html',
  styleUrl: './all-orders-component.css',
})
export class AllOrdersComponent implements OnInit {
  orderService = inject(OrderService);
  authService = inject(AuthService);
  PLATFORM_Id = inject(PLATFORM_ID);

  userOrders = signal<UserOderInterface[]>([]);

  userId = signal<string | null>(null);

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    if (isPlatformBrowser(this.PLATFORM_Id)) {
      const userData = localStorage.getItem("userDataDecoded");
      if (userData) {
        const id = JSON.parse(userData).id;
        this.userId.set(id);
        console.log(this.userId());
        this.getAllOrders();
      }
    }
  }

  getAllOrders() {
    const currentId = this.userId();
    if (currentId) {
      this.orderService.getUserOrders(currentId).subscribe({
        next: (res) => {
          this.userOrders.set(res)
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
