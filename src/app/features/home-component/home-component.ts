import { Component, HostListener, OnInit, signal } from '@angular/core';
import { MainSlider } from './main-slider/main-slider';
import { Offers } from './offers/offers';
import { FeatureedProducts } from './featureed-products/featureed-products';
import { ContactSection } from './contact-section/contact-section';
import { CategoriesSection } from './categories-section/categories-section';

@Component({
  selector: 'app-home-component',
  imports: [MainSlider,Offers,FeatureedProducts,ContactSection,CategoriesSection],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit{
  isMenuOpen = signal(false);
    isScrolled = signal(false);

    ngOnInit(): void {
      this.checkScroll();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
    this.checkScroll();
  }


    private checkScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }


}
