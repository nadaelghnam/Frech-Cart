import { Component, inject, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/Services/wishlist-service';
import { RouterLink } from "@angular/router";
import { WishlistInterface } from '../../core/models/wishlist-interface';

@Component({
  selector: 'app-wish-list-component',
  imports: [RouterLink],
  templateUrl: './wish-list-component.html',
  styleUrl: './wish-list-component.css',
})
export class WishListComponent {
  wishListService = inject(WishlistService)
  toastrService = inject(ToastrService)

  wishList = signal<WishlistInterface[]>([])

  totalCount = signal(0)


  ngOnInit(): void {
    this.getWishListData()
  }


  getWishListData() {
    this.totalCount.set(0)
    this.wishListService.getWishListData().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList.set(res.data)

        this.wishList().forEach((val) =>
          this.totalCount.update((count) => count + 1)
        )
        this.wishListService.totalWishListItem.set(this.totalCount())



      }, error: (err) => {
        console.log(err);
      }
    })
  }

  removeCartItem(productId: string) {
    this.wishListService.removeSpecificWishListItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success("Product remove successfully", "Fresh Cart!")
        this.getWishListData()
      }, error: (err) => {
        console.log(err);
        this.toastrService.error(err.message || "something went wrong", "Fresh Cart!")
      }
    })
  }




  addToWishList(productId: string | undefined) {

    this.wishListService.addToWishList(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('Product added to cart successfully!', 'FreshCart!');
        this.wishListService.totalWishListItem.update((val) => val + 1)

      }, error: (err) => {
        console.log(err);
        this.toastrService.error(err.message || 'something went wrong', 'FreshCart!');

      }
    })
  }
}
