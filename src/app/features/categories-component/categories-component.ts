import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../core/Services/category-service';
import { Category } from '../../core/models/product-interface';

@Component({
  selector: 'app-categories-component',
  imports: [],
  templateUrl: './categories-component.html',
  styleUrl: './categories-component.css',
})
export class CategoriesComponent {
  categoryService = inject(CategoryService)
  categoriesList = signal<Category[]>([])


  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe({

      next: (res) => {
        console.log(res);
        this.categoriesList.set(res.data)
        console.log(this.categoriesList());


      }, error: (err) => {
        console.log(err);

      }

    })
  }

  categoryDetails(id: string) {
    this.categoryService.getSpecificCategory(id).subscribe({
      next: (res) => {
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
