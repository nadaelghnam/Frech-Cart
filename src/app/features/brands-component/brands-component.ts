import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../core/Services/category-service';
import { Brand, Category } from '../../core/models/product-interface';
import { BrandService } from '../../core/Services/brand-service';

@Component({
  selector: 'app-brands-component',
  imports: [],
  templateUrl: './brands-component.html',
  styleUrl: './brands-component.css',
})
export class BrandsComponent {
  brandService = inject(BrandService)
  brandList = signal<Brand[]>([])


  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe({

      next: (res) => {
        console.log(res);
        this.brandList.set(res.data)
        console.log(this.brandList());


      }, error: (err) => {
        console.log(err);

      }

    })
  }

  brandDetails(id: string) {
    this.brandService.getSpecificBrand(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}

