import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
   myHttp=inject(HttpClient)



    getAllCategories():Observable<any>{
     return this.myHttp.get(environment.baseUrl+`/categories`)
    }

    getSpecificCategory(id:string):Observable<any>{
     return this.myHttp.get(environment.baseUrl+`/categories/${id}`)
    }
  }

