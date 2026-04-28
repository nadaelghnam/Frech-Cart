import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  myHttp = inject(HttpClient)

  getAllBrands(): Observable<any> {

    return this.myHttp.get(environment.baseUrl + `/brands`)
  }
  getSpecificBrand(id: string): Observable<any> {
    return this.myHttp.get(environment.baseUrl + `/brands/${id}`)
  }
}
