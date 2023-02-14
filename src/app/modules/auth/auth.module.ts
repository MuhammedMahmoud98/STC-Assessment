import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MaterialApisModule } from '../../shared/material-apis/material-apis.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialApisModule,
    SharedModule,
  ],
})
export class AuthModule { }
