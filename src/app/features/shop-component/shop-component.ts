import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductInterface } from '../../core/models/product-interface';
import { ProductCart } from "../../shared/ui/product-cart/product-cart";
import { ProductService } from '../../core/Services/product-service';

@Component({
  selector: 'app-shop-component',
  imports: [ProductCart],
  templateUrl: './shop-component.html',
  styleUrl: './shop-component.css',
})
export class ShopComponent implements OnInit {
  productService = inject(ProductService);
  productsList = signal<ProductInterface[]>([]);

  currentPage = signal<number>(1);
  numberOfPages = signal<number>(1);

  ngOnInit(): void {
    this.getProducts(1);
  }

  getProducts(page: number) {
    this.productService.getAllProducts(page, 20).subscribe({
      next: (res) => {
        this.productsList.set(res.data);
        this.currentPage.set(res.metadata.currentPage);
        this.numberOfPages.set(res.metadata.numberOfPages);

        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.numberOfPages()) {
      this.getProducts(page);
    }
  }
}
