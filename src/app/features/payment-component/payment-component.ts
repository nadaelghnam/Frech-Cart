import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/Services/cart-service';
import { Product } from '../../core/models/order-inter-face';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-component',
  imports: [ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css',
})
export class PaymentComponent implements OnInit {

  selectedMethod: string = 'cash';
  cartItems = signal<Product[]>([]);

  fb = inject(FormBuilder)
  activatedRoute = inject(ActivatedRoute)
  cartService = inject(CartService)
  router = inject(Router);
  toastr = inject(ToastrService)

  cartId: WritableSignal<string | null> = signal(null)
  totalOrderPrice: WritableSignal<number> = signal(0);



  paymenForm: FormGroup = this.fb.group({
    details: ["", [Validators.required, Validators.minLength(10)]],
    phone: ["", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ["", [Validators.required]]
  })

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlPath) => {
        this.cartId.set(urlPath.get("id"))
      }
    })
    this.getCartDetails()
  }

  getCartDetails() {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        this.cartItems.set(res.data.products);
        this.totalOrderPrice.set(res.data.totalCartPrice);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  checkoutSession() {
    if (this.paymenForm.invalid) {
      this.paymenForm.markAllAsTouched();
      return;
    }

    let payload = {
      shippingAddress: this.paymenForm.value
    }

    if (this.cartId()) {
      this.cartService.checkoutSession(this.cartId() as string, payload).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  checkoutSessionCash() {
    if (this.paymenForm.invalid) {
      this.paymenForm.markAllAsTouched();
      return;
    }

    let payload = {
      shippingAddress: this.paymenForm.value
    }

    if (this.cartId()) {
      this.cartService.createCashOrder(this.cartId() as string, payload).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            this.cartService.totalCartItem.set(0);
            this.toastr.success('Your order has been shipped', 'FreshCart!');
            this.router.navigate(['/allorders']);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
