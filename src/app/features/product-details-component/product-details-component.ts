import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/Services/product-service';
import { ProductInterface } from '../../core/models/product-interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/Services/cart-service';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute)
  productService = inject(ProductService)
  productDetails = signal<ProductInterface>({} as ProductInterface)
  cartService = inject(CartService)
  toastr = inject(ToastrService)

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      // console.log(param.get('id'));
      this.getProductDetails(param.get('id') as string)

    })
  }
  getProductDetails(id: string) {
    this.productService.getSpecificProducts(id).subscribe({
      next: (res) => {
        console.log(res);
        this.productDetails.set(res.data)
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  addToCart(productId: string | undefined) {

    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Product added to cart successfully!', 'FreshCart!');
        this.cartService.totalCartItem.update((val) => val + 1)

      }, error: (err) => {
        console.log(err);
        this.toastr.error(err.message || 'something went wrong', 'FreshCart!');

      }
    })
  }
}
