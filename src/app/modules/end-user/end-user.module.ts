import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndUserRoutingModule } from './end-user-routing.module';
import { EndUserComponent } from './end-user.component';
import {SharedModule} from "../../shared/shared.module";
import { ProductsComponent } from './components/products/products.component';


@NgModule({
  declarations: [
    EndUserComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    EndUserRoutingModule,
    SharedModule,
  ]
})
export class EndUserModule { }
