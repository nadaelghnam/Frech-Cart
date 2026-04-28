import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, signal, } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth-service';
import { CartService } from '../../core/Services/cart-service';
import { WishlistService } from '../../core/Services/wishlist-service';

@Component({
  selector: 'app-nav-bar-component',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar-component.html',
  styleUrls: ['./nav-bar-component.css']
})
export class NavBarComponent implements OnInit {

  authService = inject(AuthService)
  cartService=inject(CartService)
  wishlistService=inject(WishlistService)
  router = inject(Router)
  id = inject(PLATFORM_ID)

  isMenuOpen = signal(false);
  isScrolled = signal(false);

  isLoggedIn = computed(() => this.authService.isUser())
  cartCount = computed(()=>this.cartService.totalCartItem())
  wishListCount = computed(()=>this.wishlistService.totalWishListItem())


  ngOnInit(): void {
    this.checkScroll();
    this.getCarData();
    this.getWishListData();

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }


  private checkScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }
  toggleMenu() {
    this.isMenuOpen.update(prev => !prev);

    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }



  signOut() {
    if (isPlatformBrowser(this.id)) {
      localStorage.removeItem("userToken")
      localStorage.removeItem("userData")
      localStorage.removeItem("userDataDecoded")
      localStorage.removeItem("socialUser")

    }
    this.authService.isUser.set(false)
    this.router.navigate(["/"])
  }


  getCarData() {
    this.cartService.getCartData().subscribe({
      next: (res) => {
        this.cartService.totalCartItem.set(res.numOfCartItems)

      }, error: (err) => {
        console.log(err);
      }
    })
  }

  getWishListData() {
    this.wishlistService.getWishListData().subscribe({
      next: (res) => {
        this.wishlistService.totalWishListItem.set(res.count)
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}






