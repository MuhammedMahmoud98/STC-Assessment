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

@NgModule({
  declarations: [
    LanguageSwitcherComponent,
    NavBarComponent,
    ProductsTableComponent,
    TruncatePipe,
    ProductsDialogComponent,
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
  ],
})
export class SharedModule { }
