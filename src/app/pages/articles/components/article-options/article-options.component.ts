import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Dropdown, Modal } from 'bootstrap';
import { AppState } from 'src/app/core/app.state';
import { Article } from 'src/app/core/interfaces/article.interface';
import { articlesActions } from '../../ngrx/articles.actions';

@Component({
  selector: 'app-article-options',
  templateUrl: './article-options.component.html',
  styleUrls: ['./article-options.component.scss'],
})
export class ArticleOptionsComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdown') dropdownElement: ElementRef | undefined;
  @ViewChild('modal') modalUpdateElement: ElementRef | undefined;
  @ViewChild('modalDelete') modalDeletemElement: ElementRef | undefined;
  @ViewChild('nameArticleModal') nameArticleModalInputElement:
    | ElementRef
    | undefined;

  @Input() article: Article | undefined;

  dropdown: Dropdown | undefined;
  modalUpdate: Modal | undefined;
  modalDelete: Modal | undefined;

  nameArticleModalInput = new FormControl('', [Validators.required]);

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.patchForm();

  }

  ngAfterViewInit(): void {
    this.dropdown = new Dropdown(this.dropdownElement?.nativeElement);

    this.modalUpdate = new Modal(this.modalUpdateElement?.nativeElement);
    this.modalDelete = new Modal(this.modalDeletemElement?.nativeElement);
  }

  // Form
  sendUpdateForm() {
    if(this.nameArticleModalInput.valid){
      const nameArticle = this.nameArticleModalInput.value;    
      this.store.dispatch(articlesActions.updateArticle({ id: this.article?._id || '' , changes: {name: nameArticle} }));
      this.closeUpdateModal();
    }
  }

  patchForm(){
    this.nameArticleModalInput.setValue(this.article?.name)
  }

  // toggle
  toggleDropdown() {
    this.dropdown?.toggle();
  }


  // Modal update
  closeUpdateModal() {
    this.modalUpdate?.hide();
  }

  openUpdateModal() {
    this.patchForm();
    this.modalUpdate?.show();
  }

  // Modal delete
  openDeleteModal(){
    this.modalDelete?.show();
  }

  closeDeleteModal(){
    this.modalDelete?.hide();
  }

  // store
  deletearticle(){
    this.store.dispatch(articlesActions.deleteArticle({ id: this.article?._id || ''}))
    this.closeDeleteModal();
  }
}
