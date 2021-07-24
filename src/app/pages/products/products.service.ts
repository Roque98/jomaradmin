import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.urlApi + '/products'

  constructor(
    private http: HttpClient
  ) { }

  create(product: Product){
    return this.http.post<Product>(this.url, product);
  }

  update(id: string, changes: Partial<Product>){
    return this.http.patch<Product>(`${this.url}/${id}`, changes);
  }

  deleteOne(id: string){
    return this.http.delete<Product>(`${this.url}/${id}`)
  }
}
