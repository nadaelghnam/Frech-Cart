import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  myHttp=inject(HttpClient)



  getAllProducts(page: number = 1, limit: number = 15): Observable<any> {
  return this.myHttp.get(environment.baseUrl + `/products?page=${page}&limit=${limit}`);
}

  getSpecificProducts(id:string):Observable<any>{
   return this.myHttp.get(environment.baseUrl+`/products/${id}`)
  }
}
