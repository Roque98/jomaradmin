import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../../core/interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = environment.urlApi + '/categories'

  constructor(
    private http: HttpClient
  ) { }

  findAll(){
    return this.http.get<Category[]>(`${this.url}`);
  }

  findOne(id: string){
    return this.http.get<Category>(`${this.url}/${id}`);
  }

  create(category: Category){
    return this.http.post<Category>(this.url, category);
  }

  update(id: string, changes: Partial<Category>){
    return this.http.patch<Category>(`${this.url}/${id}`, changes);
  }

  deleteOne(id: string){
    return this.http.delete<Category>(`${this.url}/${id}`)
  }
}
