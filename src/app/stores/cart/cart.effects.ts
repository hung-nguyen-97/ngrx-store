import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartService } from 'src/app/services/cart.services';
import { ActionTypes, AddCart, AddCartFailure, AddCartSuccess, DeleteCart, DeleteCartFailure, DeleteCartSuccess, GetCart, GetCartFailure, GetCartList, GetCartListFailure, GetCartListSuccess, GetCartSuccess, UpdateCart, UpdateCartFailure, UpdateCartSuccess } from './cart';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.services';
import { Cart } from './cart.model';
import { of } from 'rxjs';

@Injectable()
export class CartEffects {
  constructor(private action$: Actions, private backendService: BackendService) {}

  @Effect()
  public GetCart() {
    return this.action$.pipe(
      ofType<GetCart>(ActionTypes.GetCart),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.backendService.getCart(payload.id)
        .pipe(
          map(result => new GetCartSuccess(result)),
          catchError((err) => of(new GetCartFailure({ code: 500, reason: err.message })))
        )
      })
    );
  }

  @Effect()
  public GetCartsList() {
    return this.action$.pipe(
      ofType<GetCartList>(ActionTypes.GetCartList),
      switchMap(() => {
        return this.backendService.getCartList()
        .pipe(
          map((result) => new GetCartListSuccess(result)),
          catchError((err) => of(new GetCartListFailure({ code: 500, reason: err.message })))
        )
      }),
    );
  }

  @Effect()
  public AddCart() { 
    return this.action$.pipe(
      ofType<AddCart>(ActionTypes.AddCart),
      map((action) => action.payload),
      switchMap((addCart) => {
        const cart: Cart = {
          id: undefined,
          name: addCart.name,
          price: addCart.price,
          thumbnail: addCart.thumbnail,
          images: addCart.images,
          active: addCart.active
        };

        return this.backendService.addCart(cart)
        .pipe(
          map((result) => new AddCartSuccess(result)),
          catchError((err) => of(new AddCartFailure({ code: 500, reason: err.message })))
        )
      })
    );
  }

  @Effect()
  public UpdateCart() { 
    return this.action$.pipe(
      ofType<UpdateCart>(ActionTypes.UpdateCart),
      map((action) => action.payload),
      switchMap((addCart) => {
        const cart: Cart = {
          id: addCart.id,
          name: addCart.name,
          price: addCart.price,
          thumbnail: addCart.thumbnail,
          images: addCart.images,
          active: addCart.active
        };

        return this.backendService.updateCart(cart.id, cart)
        .pipe(
          map((result) => new UpdateCartSuccess(result)),
          catchError((err) => of(new UpdateCartFailure({ code: 500, reason: err.message })))
        )
      })
    );
  }

  @Effect()
  public DeleteCart() {
    return this.action$.pipe(
      ofType<DeleteCart>(ActionTypes.DeleteCart),
      map((action)=> action.id),
      switchMap((id: number) => {
        return this.backendService.deleteCart(id)
        .pipe(
          map((result) => new DeleteCartSuccess(result)),
          catchError((err) => of(new DeleteCartFailure({ code: 500, reason: err.message })))
        )
      }) 
    );
  }
}
