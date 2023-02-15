import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { MaterialApisModule } from './material-apis/material-apis.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { ProductsDialogComponent } from './dialogs/products-dialog/products-dialog';
import { CardSkeletonComponent } from './components/card-skeleton/card-skeleton.component';
import { StarsComponent } from './components/stars/stars.component';
import {ProductsFilterPipe} from "../pipes/products-filter.pipe";

@NgModule({
  declarations: [
    LanguageSwitcherComponent,
    NavBarComponent,
    ProductsTableComponent,
    TruncatePipe,
    ProductsDialogComponent,
    CardSkeletonComponent,
    StarsComponent,
    ProductsFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialApisModule,
    RouterModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LanguageSwitcherComponent,
    MaterialApisModule,
    NavBarComponent,
    ProductsTableComponent,
    TruncatePipe,
    ProductsDialogComponent,
    CardSkeletonComponent,
    StarsComponent,
    ProductsFilterPipe,
  ],
})
export class SharedModule { }
