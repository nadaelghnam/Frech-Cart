import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  myHttp = inject(HttpClient)
  token: string = ""
  id = inject(PLATFORM_ID)
  totalCartItem = signal(0)

  constructor() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem("userToken")) {
        this.token = localStorage.getItem("userToken") as string
      }
    }
  }


  getCartData(): Observable<any> {
    return this.myHttp.get(environment.baseUrl + `/cart`, {
      headers: {
        token: this.token
      }
    })
  }

  addToCart(productId: string | undefined): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/cart`,
      { "productId": productId },
      { headers: { token: this.token } }
    )
  }


  updateProductQuantity(productId: string, count: number): Observable<any> {
    return this.myHttp.put(environment.baseUrl + `/cart/${productId}`,
      { "count": count },
      { headers: { token: this.token } }
    )
  }


  removeSpecificCartItem(productId: string): Observable<any> {
    return this.myHttp.delete(environment.baseUrl + `/cart/${productId}`,
      { headers: { token: this.token } }
    )
  }


  clearUserCart(): Observable<any> {
    return this.myHttp.delete(environment.baseUrl + `/cart/`,
      { headers: { token: this.token } }
    )
  }

  checkoutSession(cartId: string, data: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/orders/checkout-session/${cartId}?url=${window.location.origin}`, data,
      { headers: { token: this.token } }
    )
  }

  createCashOrder(cartId: string, data: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/orders/${cartId}`, data,
      { headers: { token: this.token } }
    )
  }

  

}
