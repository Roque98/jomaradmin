import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dropdown, Modal } from 'bootstrap';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
})
export class ProductOptionsComponent implements OnInit, AfterViewInit {
  @Input('product') product: Product | undefined;

  @ViewChild('dropdown') dropdownElement: ElementRef | undefined;
  @ViewChild('modalUpdate') modalUpdateElement: ElementRef | undefined;
  @ViewChild('modalDelete') modaldeleteElement: ElementRef | undefined;

  dropdown: Dropdown | undefined;
  modalUpdate: Modal | undefined;
  modalDelete: Modal | undefined;

  regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  updateProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    finalPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    wholesalePrice: new FormControl('', [Validators.required, Validators.min(1)]),
    providerPrice: new FormControl('', [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required, Validators.pattern(this.regexUrl)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
  })

  constructor() {}

  ngOnInit(): void {
    this.updateProductForm.patchValue({...this.product})
  }

  ngAfterViewInit() {
    this.modalUpdate = new Modal(this.modalUpdateElement?.nativeElement);
    this.modalDelete = new Modal(this.modaldeleteElement?.nativeElement);
    this.dropdown = new Dropdown(this.dropdownElement?.nativeElement);
  }

  // form
  deleteCategory() {}

  sendUpdateForm() {}

  getImage(){
    return this.updateProductForm.get('image')?.value;
  }

  // ***** Components bootstrap

  // Dropdown
  toggleDropdown() {
    this.dropdown?.toggle();
  }

  // modalUpdate
  openModalUpdate() {
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
