import { Component, inject, signal } from '@angular/core';
import { Category } from '../../../core/models/product-interface';
import { CategoryService } from '../../../core/Services/category-service';

@Component({
  selector: 'app-categories-section',
  imports: [],
  templateUrl: './categories-section.html',
  styleUrl: './categories-section.css',
})
export class CategoriesSection {
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
}
