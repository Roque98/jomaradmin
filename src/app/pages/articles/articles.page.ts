import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/app.state';
import { generateMongoObjectId } from 'src/app/core/utils/mongoId';
import { articlesActions } from './ngrx/articles.actions';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss']
})
export class ArticlesPage implements AfterViewInit{
  
  @ViewChild('createModal') createModalElement:ElementRef | undefined;
  @ViewChild('nameArticleModalInput') inputNameCreateModalElement:ElementRef | undefined;

  modal: Modal | undefined;
  nameArticleInputModalForm = new FormControl('', [Validators.required]);

  searchBar = new FormControl('')

  constructor(
    private store: Store<AppState>,   
  ) {}

  ngAfterViewInit(){
    this.modal = new Modal(this.createModalElement?.nativeElement);
  }

  getStateArticles() {
    return this.store.select('articlesFeature')
      .pipe(
        map((articleState) => {
          return articleState.articles.filter(article => !article.removed)
        })
      )
  }
  
  sendArticleForm() {
    if( this.nameArticleInputModalForm.valid ){
      
      const name = this.nameArticleInputModalForm.value;    

      const article = {
          _id: generateMongoObjectId(),
          categories: [],
          name,
          removed: false
      }

      this.store.dispatch(articlesActions.createArticle({ article }));
      this.closeModal();
    } else {
      this.nameArticleInputModalForm.markAsTouched()
    }

  }

  closeModal(){
    this.modal?.hide();
  }

  openModal(){
    this.nameArticleInputModalForm.reset();
    this.modal?.show();
  }
}
