import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import { ConfirmationDialogService } from "../confirmation-dialog/confirmation-dialog.service";

@NgModule({
  declarations: [CartComponent],
  exports: [CartComponent],
  imports: [
    BrowserModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ConfirmationDialogService]
})
export class CartModule {}