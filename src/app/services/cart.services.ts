import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../stores";
import { AddCart, DeleteCart, GetCart, GetCartList, UpdateCart } from "../stores/cart/cart";
import { Cart } from "../stores/cart/cart.model";
import { addCartSelector, cartListSelector, deleteCartSelector, getCartSelector, updateCartSelector } from "../stores/cart/cart.selectors";

@Injectable({
  providedIn:'root'
})
export class CartService {

  constructor(private store: Store<AppState>) {
  }

  getCart(): Observable<Cart> {
    return this.store.select(getCartSelector);
  }

  fetchCart(id: number) {
    this.store.dispatch(new GetCart({ id }));
  }

  getCartList(): Observable<Cart[]> {
    return this.store.select(cartListSelector);
  }

  fetchCartList() {
    this.store.dispatch(new GetCartList());
  }

  addCart(payload: Cart) {
    this.store.dispatch(new AddCart(payload));
  }

  addCartResult(): Observable<Cart | Error> {
    return this.store.select(addCartSelector);
  }

  updateCart(id: number, payload: Cart) {
    this.store.dispatch(new UpdateCart(id, payload))
  }

  updateCartResult(): Observable<Cart> {
    return this.store.select(updateCartSelector);
  }

  deleteCart(id: number) {
    this.store.dispatch(new DeleteCart(id))
  }

  deleteCartResult(): Observable<Cart> {
    return this.store.select(deleteCartSelector);
  }
}