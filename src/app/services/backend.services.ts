import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { observable, Observable } from "rxjs";
import { Cart } from "../stores/cart/cart.model";

@Injectable({
  providedIn:'root'
})
export class BackendService {

  store: Array<Cart> = [];

  getCart(id: number): Observable<Cart> {
    return new Observable(ob => {
      ob.next(this.store.find(x => x.id === id));
      ob.complete();
    });
  }

  getCartList(): Observable<Array<Cart>> {
    return new Observable(ob => {
      ob.next(this.store.map(x => x))
      ob.complete();
    });
  }

  addCart(cart: Cart): Observable<Cart> {
    return new Observable(ob => {
      const maxCartId = Math.max(...this.store.map(x => x.id));
      console.log(maxCartId)
      cart.id = maxCartId !== -Infinity ? maxCartId + 1 : 1;
      this.store.push(cart);
      ob.next(cart)
      ob.complete();
    });
  }

  updateCart(id: number, obj: Cart): Observable<Cart> {
    return new Observable(ob => {
      const cartIndex = this.store.findIndex(x => x.id === id);
      if(cartIndex >= 0) {
        this.store[cartIndex] = obj;
      } else {
        ob.error('Cart item not found');
      }
      ob.next(this.store[cartIndex]);
      ob.complete();
    });
  }

  deleteCart(id: number): Observable<Cart> {
    return new Observable(ob => {
      const cartIndex = this.store.findIndex(x => x.id === id);
      const cart = this.store[cartIndex];
      if(cartIndex >= 0) {
        this.store.splice(cartIndex, 1);
      } else {
        ob.error('Cart item not found');
      }
      ob.next(cart);
      ob.complete();
    });
  }
}