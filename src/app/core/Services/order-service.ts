import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  myHttp = inject(HttpClient)

    getUserOrders(userId: string |null): Observable<any> {
    return this.myHttp.get(environment.baseUrl + `/orders/user/${userId}`)

  }

}
