import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  mtHttp = inject(HttpClient)
  token: string = ""
  id = inject(PLATFORM_ID)
  totalWishListItem = signal(0)

  constructor() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem("userToken")) {
        this.token = localStorage.getItem("userToken") as string
      }
    }
  }

  addToWishList(productId: string | undefined): Observable<any> {
    return this.mtHttp.post(environment.baseUrl + `/wishlist`,
      { "productId": productId },
      { headers: { token: this.token } }
    )
  }
  getWishListData(): Observable<any> {
    return this.mtHttp.get(environment.baseUrl + `/wishlist`, {
      headers: {
        token: this.token
      }
    })
  }
  removeSpecificWishListItem(productId: string): Observable<any> {
    return this.mtHttp.delete(environment.baseUrl + `/wishlist/${productId}`,
      { headers: { token: this.token } }
    )
  }
}
