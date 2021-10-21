import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { getReducers, metaReducers, REDUCER_TOKEN } from './stores';
import { CartEffects } from './stores/cart/cart.effects';
import { CartModule } from './pages/cart/cart.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Routing
    AppRoutingModule,
    CartModule,

    // ngrx
    StoreModule.forRoot(REDUCER_TOKEN, {
      metaReducers,
      runtimeChecks: {
        // TODO: remove moment instance from action/state for serializability
        strictActionImmutability: !environment.production,
        strictActionSerializability: false,
        // strictActionSerializability: false,
        strictStateImmutability: !environment.production,
        strictStateSerializability: !environment.production,
        // strictStateSerializability: false,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot([
      CartEffects
    ]),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
