import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from 'bootstrap';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/app.state';
import { Product } from 'src/app/core/interfaces/product.interface';
import { generateMongoObjectId } from 'src/app/core/utils/mongoId';
import { productsActions } from './ngrx/products.action';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage implements OnInit, AfterViewInit {

  // Reference from dom
  @ViewChild('modal') modalElement: ElementRef | undefined;

  // search bar
  searchInput = new FormControl('');

  //modal
  modal: Modal | undefined;

  // form
  regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  createProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    finalPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    wholesalePrice: new FormControl('', [Validators.required, Validators.min(1)]),
    providerPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required, Validators.pattern(this.regexUrl)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  // params
  categoryId = '';

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { 
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.modal = new Modal(this.modalElement?.nativeElement)
  }

  // store
  getProducts(){
    return this.store.select('productsFeature').pipe(
      map((productsState) => {
        return productsState.products.filter(product => product.categoryId === this.categoryId)
      })
    )
  }

  getCategory(){
    return this.store.select('categoriesFeature')
      .pipe(
        map((categoryState) => {
          return categoryState.categories.find(category => category._id === this.categoryId)
        })
      )
  }

  // send
  createProduct(){
    const newProduct: Product = {
      _id: generateMongoObjectId(),
      categoryId: this.categoryId,
      ...this.createProductForm.value
    }

    this.store.dispatch(productsActions.createProduct({product: newProduct}))
    this.createProductForm.reset();
    this.closeModal();
  }

  // form
  getImage(){
    return this.createProductForm.get('image')?.value;
  }

  // Modal
  openModal() {
    this.modal?.show();
  }

  closeModal(){
    this.modal?.hide();
  }
}
