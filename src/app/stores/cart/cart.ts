import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { Cart } from "./cart.model";

// Actions
export enum ActionTypes {

  GetCart = "[Cart] Get cart",
  GetCartSuccess = "[Cart] Get cart success",
  GetCartFailure = "[Cart] Get cart failure",

  GetCartList = "[Cart] Get cart list",
  GetCartListSuccess = "[Cart] Get cart list success",
  GetCartListFailure = "[Cart] Get cart list failure",

  AddCart = "[Cart] Add cart",
  AddCartSuccess = "[Cart] Add cart success",
  AddCartFailure = "[Cart] Add cart failure",

  UpdateCart = "[Cart] Update cart",
  UpdateCartSuccess = "[Cart] Update cart success",
  UpdateCartFailure = "[Cart] Update cart failure",

  DeleteCart = "[Cart] Delete cart",
  DeleteCartSuccess = "[Cart] Delete cart success",
  DeleteCartFailure = "[Cart] Delete cart failure",
}

export class GetCart implements Action {
  readonly type = ActionTypes.GetCart;
  constructor(public payload: { id: number }) {}
}

export class GetCartSuccess implements Action {
  readonly type = ActionTypes.GetCartSuccess;
  constructor(public payload: Cart) {}
}

export class GetCartFailure implements Action {
  readonly type = ActionTypes.GetCartFailure;
  constructor(public payload: { code?: number, reason?: string }){};
}

export class GetCartList implements Action {
  readonly type = ActionTypes.GetCartList;
  constructor() {}
}

export class GetCartListSuccess implements Action {
  readonly type = ActionTypes.GetCartListSuccess;
  constructor(public payload: Cart[]) {}
}

export class GetCartListFailure implements Action {
  readonly type = ActionTypes.GetCartListFailure;
  constructor(public payload: { code?: number, reason?: string }){};
}

export class AddCart implements Action {
  readonly type = ActionTypes.AddCart;
  constructor(public payload: Cart) {}
}

export class AddCartSuccess implements Action {
  readonly type = ActionTypes.AddCartSuccess;
  constructor(public payload: Cart) {}
}

export class AddCartFailure implements Action {
  readonly type = ActionTypes.AddCartFailure;
  constructor(public payload: { code?: number, reason?: string }) {}
}

export class UpdateCart implements Action {
  readonly type = ActionTypes.UpdateCart;
  constructor(public id: number, public payload: Cart) {}
}

export class UpdateCartSuccess implements Action {
  readonly type = ActionTypes.UpdateCartSuccess;
  constructor(public payload: Cart) {}
}

export class UpdateCartFailure implements Action {
  readonly type = ActionTypes.UpdateCartFailure;
  constructor(public payload: { code?: number, reason?: string }) {}
}

export class DeleteCart implements Action {
  readonly type = ActionTypes.DeleteCart;
  constructor(public id: number) {}
}

export class DeleteCartSuccess implements Action {
  readonly type = ActionTypes.DeleteCartSuccess;
  constructor(public payload: Cart) {}
}

export class DeleteCartFailure implements Action {
  readonly type = ActionTypes.DeleteCartFailure;
  constructor(public payload: { code?: number, reason?: string }) {}
}


export type ActionsUnion = 
| GetCart
| GetCartSuccess
| GetCartFailure
| GetCartList
| GetCartListSuccess
| GetCartListFailure
| AddCart
| AddCartSuccess
| AddCartFailure
| UpdateCart
| UpdateCartSuccess
| UpdateCartFailure
| DeleteCart
| DeleteCartSuccess
| DeleteCartFailure
;

// State
export interface State {
  cart: Cart;
  cartList: EntityState<Cart>;
  addCart: Cart;
  updateCart: Cart;
  deleteCart: Cart;
}

export const cartsAdapter: EntityAdapter<Cart> = createEntityAdapter<Cart>({
  sortComparer: false,
});

export const initialState: State = {
  cart: null,
  cartList: cartsAdapter.getInitialState(),
  addCart: null,
  updateCart: null,
  deleteCart: null,
};

// Reducers
export const reducer: ActionReducer<State, Action> = combineReducers({
  cart: getCartReducer,
  cartList: cartListReducer,
  addCart: addCartReducer,
  updateCart: updateCartReducer,
  deleteCart: deleteCartReducer,
});

export function getCartReducer(state: Cart = null, action: ActionsUnion): Cart {
  switch (action.type) {
    case ActionTypes.GetCartSuccess:
      return { ...state, ...action.payload }; 
    case ActionTypes.AddCartSuccess:
      return { ...state, ...action.payload }; 
    case ActionTypes.UpdateCartSuccess:
      return { ...state, ...action.payload }; 
    case ActionTypes.DeleteCartSuccess:
      return { ...state, ...action.payload }; 
    default: {
      return state;
    }
  }
}

export function cartListReducer(state: EntityState<Cart> = initialState.cartList, action: ActionsUnion): EntityState<Cart> {
  switch (action.type) {
    case ActionTypes.GetCartListSuccess:
      return cartsAdapter.setAll(action.payload, state);
    case ActionTypes.GetCartListFailure:
      return;
    default: {
      return state;
    }
  }
}

export function addCartReducer(state: Cart = null, action: ActionsUnion): Cart {
  switch (action.type) {
    case ActionTypes.AddCartSuccess:
      return { ...state, ...action.payload }; 
    default: {
      return state;
    }
  }
}

export function updateCartReducer(state: Cart = null, action: ActionsUnion): Cart {
  switch (action.type) {
    case ActionTypes.UpdateCartSuccess:
      return { ...state, ...action.payload }; 
    default: {
      return state;
    }
  }
}

export function deleteCartReducer(state: Cart = null, action: ActionsUnion): Cart {
  switch (action.type) {
    case ActionTypes.DeleteCartSuccess:
      return { ...state, ...action.payload }; 
    default: {
      return state;
    }
  }
}

// Projectors
export const projectors = {
  cart: (state: State) => state.cart,
  carts: (state: State) => state.cartList,
  addCart: (state: State) => state.addCart,
  updateCart: (state: State) => state.updateCart,
  deleteCart: (state: State) => state.deleteCart,
};

