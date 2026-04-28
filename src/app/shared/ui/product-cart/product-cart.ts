import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../../../core/Services/cart-service';
import { ProductInterface } from '../../../core/models/product-interface';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/Services/wishlist-service';

@Component({
  selector: 'app-product-cart',
  imports: [RouterLink],
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css',
})
export class ProductCart implements OnChanges {

  product = input.required<ProductInterface>()
  cartService = inject(CartService)
  wishListService=inject(WishlistService)
  toastr = inject(ToastrService)

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.product);
  }



  addToCart(productId: string | undefined) {

    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Product added to cart successfully!', 'FreshCart!');
        this.cartService.totalCartItem.update((val)=>val+1)

      }, error: (err) => {
        console.log(err);
        this.toastr.error(err.message || 'something went wrong', 'FreshCart!');

      }
    })
  }
  addToWishList(productId: string | undefined) {

    this.wishListService.addToWishList(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Product added to WishList successfully!', 'FreshCart!');
        this.wishListService.totalWishListItem.update((val)=>val+1)

      }, error: (err) => {
        console.log(err);
        this.toastr.error(err.message || 'something went wrong', 'FreshCart!');

      }
    })
  }
}
