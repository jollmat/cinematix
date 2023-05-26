import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/layouts/products/products.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/views/product/product.component';
import { ProductRatingComponent } from './components/views/product-rating/product-rating.component';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductComponent,
    ProductRatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxJsonViewerModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
