import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/app.state';
import { Category } from 'src/app/core/interfaces/category.interface';
import { generateMongoObjectId } from 'src/app/core/utils/mongoId';
import { categoriesActions } from './ngrx/categories.actions';
import { categoriesInitialState } from './ngrx/categories.reducer';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, AfterViewInit {
  @ViewChild('modal') modalElement: ElementRef | undefined;

  // search bar
  searchInput = new FormControl('');

  // modal
  modal: Modal | undefined;
  regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  createCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required, Validators.pattern(this.regexUrl)]),
  })

  // params
  articleId = '';

  // state
  categoriesState = categoriesInitialState;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.articleId = this.activatedRoute.snapshot.params.articleId;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.modal = new Modal(this.modalElement?.nativeElement)
  }

  // store
  getCategories() {
    return this.store.select('categoriesFeature').pipe(
      map((categoriesState) => {
        
        const categories = categoriesState.categories.filter((category) => {
          return (category.articleId === this.articleId) && !category.removed 
        })
        
        return categories;
      })
    );
  }

  getArticle(){
    return this.store.select('articlesFeature').pipe(
      map((articleState) => {
        const article = articleState.articles.find(article => article._id === this.articleId)
        if(!article || article.removed){
          this.router.navigateByUrl('/articles');
        }
        return article;
      })
    )
  }


  // Form
  createCategory(){

    if(this.createCategoryForm.valid){
      const category: Category = {
        _id: generateMongoObjectId(),
        ...this.createCategoryForm.value,
        articleId: this.articleId,
        removed: false
      }
  
      this.store.dispatch(categoriesActions.createCategory({ category }))
      this.closeModal();
    } else {
      this.createCategoryForm.markAllAsTouched();
    }
  }

  // form
  getImage(){
    return this.createCategoryForm.get('image')?.value;
  }


  // Modal
  openModal() {
    this.modal?.show();
  }

  closeModal(){
    this.modal?.hide();
    this.createCategoryForm.reset();
  }
}
