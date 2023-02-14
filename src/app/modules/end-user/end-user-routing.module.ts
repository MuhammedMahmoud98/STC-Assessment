import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndUserComponent } from './end-user.component';

const routes: Routes = [{ path: '', component: EndUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndUserRoutingModule { }
