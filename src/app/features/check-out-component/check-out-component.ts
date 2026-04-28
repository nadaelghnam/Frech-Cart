import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/Services/cart-service';
import { CartProductInterface } from '../../core/models/cart-product-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-out-component',
  imports: [RouterLink],
  templateUrl: './check-out-component.html',
  styleUrl: './check-out-component.css',
})
export class CheckOutComponent implements OnInit {

  cartService = inject(CartService)
  toastrService = inject(ToastrService)

  productsList = signal<CartProductInterface[]>([])

  totalCount = signal(0)
  totalCartPrice = signal(0)

  cartDetails=signal ("")

  ngOnInit(): void {
    this.getCarData()
  }


  getCarData() {
    this.totalCount.set(0)
    this.totalCartPrice.set(0)
    this.cartService.getCartData().subscribe({
      next: (res) => {
        console.log(res);
        this.productsList.set(res.data.products)
        this.cartDetails = res.cartId;
        console.log(this.cartDetails);



        this.productsList().forEach((val) =>
          this.totalCount.update((count) => count + val.count)
        )
        this.cartService.totalCartItem.set(this.totalCount())

        this.productsList().forEach((val) =>
          this.totalCartPrice.update((total) => total + (val.price * val.count))
        )

      }, error: (err) => {
        console.log(err);
      }
    })
  }

  removeCartItem(productId: string) {
    this.cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success("Product remove successfully", "Fresh Cart!")
        this.getCarData()
      }, error: (err) => {
        console.log(err);
        this.toastrService.error(err.message || "something went wrong", "Fresh Cart!")
      }
    })
  }


  clearCart() {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.productsList.set([])
        this.totalCount.set(0)
        this.totalCartPrice.set(0)
        this.cartService.totalCartItem.set(this.totalCount())

      }, error: (err) => {
        console.log(err);
      }
    })
  }


  updateProductQuantity(productId: string, count: number) {
    this.cartService.updateProductQuantity(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success("Product quantity updated", "Fresh Cart!")
        this.getCarData()

      }, error: (err) => {
        console.log(err);
        this.toastrService.error("something went wrong", "Fresh Cart!")

      }
    })

  }
}
