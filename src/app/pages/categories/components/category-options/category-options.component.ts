import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Dropdown, Modal } from 'bootstrap';
import { AppState } from 'src/app/core/app.state';
import { Category } from 'src/app/core/interfaces/category.interface';
import { getDirtyValues } from 'src/app/core/utils/dirtyValues';
import { categoriesActions } from '../../ngrx/categories.actions';

@Component({
  selector: 'app-category-options',
  templateUrl: './category-options.component.html',
  styleUrls: ['./category-options.component.scss'],
})
export class CategoryOptionsComponent implements OnInit, AfterViewInit {
  @Input('category') category: Category | undefined;

  @ViewChild('dropdown') dropdownElement: ElementRef | undefined;
  @ViewChild('modalUpdate') modalUpdateElement: ElementRef | undefined;
  @ViewChild('modalDelete') modaldeleteElement: ElementRef | undefined;

  dropdown: Dropdown | undefined;
  modalUpdate: Modal | undefined;
  modalDelete: Modal | undefined;

  regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  updateCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    image: new FormControl('', [Validators.required, Validators.pattern(this.regexUrl)]),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.pathForm();
  }

  ngAfterViewInit() {
    this.modalUpdate = new Modal(this.modalUpdateElement?.nativeElement);
    this.modalDelete = new Modal(this.modaldeleteElement?.nativeElement);
    this.dropdown = new Dropdown(this.dropdownElement?.nativeElement);
  }

  // Form
  deleteCategory() {}

  sendUpdateForm() {
    if(this.updateCategoryForm.valid){
      this.store.dispatch(
        categoriesActions.updateCategory({
          id: this.category?._id || '',
          changes: getDirtyValues(this.updateCategoryForm)
        })
      )
  
      this.closeModalUpdate();
    } else {
      this.updateCategoryForm.markAllAsTouched();
    }
  }

  getImage() {
    return this.updateCategoryForm.get('image')?.value;
  }

  clearImageInput(){
    this.updateCategoryForm.get('image')?.setValue('')
  }

  pathForm(){
    this.updateCategoryForm.patchValue({ ...this.category });
  }

  // ***** Components bootstrap

  // Dropdown
  toggleDropdown() {
    this.dropdown?.toggle();
  }

  // modalUpdate
  openModalUpdate() {
    this.pathForm();
    this.modalUpdate?.show();
  }

  closeModalUpdate() {
    this.modalUpdate?.hide();
  }

  // modalDelete
  openModalDelete() {
    this.modalDelete?.show();
  }

  closeModalDelete() {
    this.modalDelete?.hide();
  }
}
