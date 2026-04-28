import { Routes } from '@angular/router';
import { mainGuardGuard } from './core/auth/guards/main-guard-guard';
import { userGuardGuard } from './core/auth/guards/user-guard-guard';


export const routes: Routes = [
  {
    path: 'login',
    canActivate:[userGuardGuard],
    title: 'Login - FreshCart',
    loadComponent: () => import("./features/login-component/login-component").then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate:[userGuardGuard],
    title: 'Register - FreshCart',
    loadComponent: () => import('./features/register-component/register-component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgetPassword',
    canActivate:[userGuardGuard],
    title: 'ForgetPassword - FreshCart',
    loadComponent: () => import('./features/forget-password-component/forget-password-component').then(m => m.ForgetPasswordComponent)
  },

  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        title: 'Home - FreshCart',
        loadComponent: () => import('./features/home-component/home-component').then(m => m.HomeComponent)
      },
      {
        path: 'shop',
        title: 'Shop - Products',
        loadComponent: () => import('./features/shop-component/shop-component').then(m => m.ShopComponent)
      },
      {
        path: 'product-details/:id',
        title: 'Product Details',
        loadComponent: () => import('./features/product-details-component/product-details-component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'categories',
        title: 'Categories',
        loadComponent: () => import('./features/categories-component/categories-component').then(m => m.CategoriesComponent)
      },
      {
        path: 'brands',
        title: 'Brands',
        loadComponent: () => import('./features/brands-component/brands-component').then(m => m.BrandsComponent)
      },
      {
        path: 'wishlist',
        title: 'My Wishlist',
        loadComponent: () => import('./features/wish-list-component/wish-list-component').then(m => m.WishListComponent)
      },
      {
        path: 'profile',
        canActivate: [mainGuardGuard],
        title: 'My Profile',
        loadComponent: () => import('./features/profile-component/profile-component').then(m => m.ProfileComponent)
      },
      {
        path: 'allorders',
        canActivate: [mainGuardGuard],
        title: 'Order History',
        loadComponent: () => import('./features/all-orders-component/all-orders-component').then(m => m.AllOrdersComponent)
      },
      {
        path: 'checkout',
        canActivate: [mainGuardGuard],
        title: 'Checkout',
        loadComponent: () => import('./features/check-out-component/check-out-component').then(m => m.CheckOutComponent)
      },
      {
        path: 'payment/:id',
        canActivate: [mainGuardGuard],
        title: 'payment',
        loadComponent: () => import('./features/payment-component/payment-component').then(m => m.PaymentComponent)
      },
      {
        path: 'details/:id',
        title: 'details',
        loadComponent: () => import('./features/product-details-component/product-details-component').then(m => m.ProductDetailsComponent)
      },
      {
        path: 'support',
        title: 'Customer Support',
        loadComponent: () => import('./features/support-component/support-component').then(m => m.SupportComponent)
      }
    ]
  },

  {
    path: '**',
    title: '404 - Not Found',
    loadComponent: () => import('./features/not-found-component/not-found-component').then(m => m.NotFoundComponent)
  }
];
