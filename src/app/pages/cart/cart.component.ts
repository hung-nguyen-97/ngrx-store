import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.services';
import { Cart } from 'src/app/stores/cart/cart.model';
import { ToastrService } from 'ngx-toastr';


export enum StateType {
  Normal,
  Add,
  Update
}

export const State = new Map<number, string>([
  [StateType.Normal, "Add to cart"],
  [StateType.Add, "Add to cart"],
  [StateType.Update, "Update to cart"],
])
  
export class StateButton {
  state: Number = StateType.Normal;
  text: String = State.get(StateType.Normal);
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  formCart: FormGroup;
  data: Cart[];
  saveButton: StateButton = new StateButton();

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCartList();
    this.cartService.addCartResult().subscribe(data => {
      if(data) {
        this.showSuccess(`Add cart ${data.name} successfully`);
      }
    });
    
    this.cartService.updateCartResult().subscribe(data => {
      if(data) {
        this.showSuccess(`Update cart ${data.name} successfully`);
      }
    });

    this.cartService.deleteCartResult()
    .subscribe(data => {
      if(data) {
        this.showSuccess(`Delete cart ${data.name} successfully`);
      }
    });

    this.cartService.fetchCartList();
  }

  getCartList() {
    this.cartService.getCartList()
    .subscribe((data) => {
      this.data = data;
    });
  }

  //#region Form
  initForm() {
    this.formCart = this.fb.group({
      id: null,
      name: this.fb.control(''),
      price: this.fb.control(''),
      thumbnail: this.fb.control(''),
      images: this.fb.array([
        this.fb.control('')
      ]),
      active: this.fb.control(false)
    });
  }

  get images(): FormArray{ 
    return this.formCart.get('images') as FormArray;
  }

  addImages() {
    this.images.push(this.fb.control(''));
  }

  removeImages(index: number) {
    this.images.removeAt(index);
  }

  resetForm() {
    this.saveButton.state = StateType.Normal;
    this.saveButton.text = State.get(StateType.Normal);
    this.formCart.reset();
    this.formCart.setControl('images', 
      this.fb.array([''])
    );
  }
  //#endregion

  /**
   * Submit to add or update cart
   */
  onSubmit() {

    // Submit add cart
    if(this.saveButton.state === StateType.Add || this.saveButton.state === StateType.Normal) {
      this.cartService.addCart(this.formCart.value);
    }

    // Submit update cart
    if(this.saveButton.state === StateType.Update) {
      this.cartService.updateCart(this.formCart.value.id, this.formCart.value);
    }

    // Refresh Cart list
    this.cartService.fetchCartList();
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
  }

  updateCartToForm(id: number){
    this.saveButton.state = StateType.Update;
    this.saveButton.text = State.get(StateType.Update);
    this.cartService.fetchCart(id);
    this.cartService.getCart().subscribe(data => {
      this.formCart.patchValue(data);
      this.formCart.setControl('images', 
        this.fb.array(data.images || [])
      );
    });
  }

  deleteCart(id: number) {
    // this.cartService.deleteCart(id);

    // // Refresh Cart list
    // this.cartService.fetchCartList();
  }

  showSuccess(message: string, title?: string) {
    if(!title) {
      title = "Notification!"
    }
    this.toastr.success(message, title);
  }
}
