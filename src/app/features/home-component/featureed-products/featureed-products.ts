import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../core/Services/product-service';
import { ProductInterface } from '../../../core/models/product-interface';
import { RouterLink } from "@angular/router";
import { ProductCart } from "../../../shared/ui/product-cart/product-cart";

@Component({
  selector: 'app-featureed-products',
  imports: [ProductCart],
  templateUrl: './featureed-products.html',
  styleUrl: './featureed-products.css',
})
export class FeatureedProducts implements OnInit {
  productService = inject(ProductService)
  productsList = signal<ProductInterface[]>([])



  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({

      next: (res) => {
        console.log(res);
        this.productsList.set(res.data)
        console.log(this.productsList());


      }, error: (err) => {
        console.log(err);

      }

    })
  }


}
