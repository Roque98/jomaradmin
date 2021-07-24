import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from 'src/app/core/interfaces/article.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  url = environment.urlApi + '/articles'

  constructor(
    private http: HttpClient
  ) { }

  findAll(){
    return this.http.get<Article[]>(this.url);
  }

  findOne(id: string){
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  create(article: Article){
    return this.http.post<Article>(this.url, article);
  }

  update(id: string, changes: Partial<Article>){
    return this.http.patch<Article>(`${this.url}/${id}`, changes);
  }

  deleteOne(id: string){
    return this.http.delete<Article>(`${this.url}/${id}`)
  }
}
