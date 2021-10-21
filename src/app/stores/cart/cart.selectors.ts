import { createSelector } from "@ngrx/store";
import { AppState, cartsSelector } from "..";
import * as CartStore from "./cart";
import { Cart } from "./cart.model";

export const getCartSelector = createSelector<AppState, CartStore.State, Cart>(
  cartsSelector, 
  CartStore.projectors.cart
);

export const cartListSelector = createSelector<AppState, CartStore.State, Cart[]>(
  cartsSelector, ({ cartList: { ids, entities } }) => (ids as string[]).map((id) => entities[id])
);

export const addCartSelector = createSelector<AppState, CartStore.State, Cart | Error>(
  cartsSelector, 
  CartStore.projectors.addCart
);

export const updateCartSelector = createSelector<AppState, CartStore.State, Cart>(
  cartsSelector, 
  CartStore.projectors.updateCart
);

export const deleteCartSelector = createSelector<AppState, CartStore.State, Cart>(
  cartsSelector, 
  CartStore.projectors.deleteCart
);