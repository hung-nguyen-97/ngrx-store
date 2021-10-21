
import { InjectionToken } from "@angular/core";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap, createFeatureSelector, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as CartStore from "./cart/cart";

// States

export interface AppState {
  cart: CartStore.State;
  carts: CartStore.State;
  router: RouterReducerState;
}

export const initialState: AppState = {
  cart: CartStore.initialState,
  carts: CartStore.initialState,
  router: null,
}

// Reducers
export function getReducers(): ActionReducerMap<AppState> {
  return {
    carts: CartStore.reducer,
    router: routerReducer,
    cart: CartStore.reducer,
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>("reducers");

// Selectors
export const cartsSelector = createFeatureSelector<AppState, CartStore.State>("carts");