import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { getAllProducts } from '../../store/actions/products/products.action';
import { Product } from '../../models/products.model';
import { getAllProductsSelector, isProductsLoadingSelector } from '../../store/selectors/products/products.selector';
import { ProductsDialogComponent } from '../../shared/dialogs/products-dialog/products-dialog';
import { MODES } from '../../shared/enums/products.enum';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  isProductsLoading: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateProductsWithStore();
    this.loadProductsSelectorListener();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  updateProductsWithStore() {
    this.products$ = this.store.pipe(select(getAllProductsSelector));
    this.isProductsLoading = this.store.pipe(select(isProductsLoadingSelector));
  }

  loadProductsSelectorListener(): void {
    this.store.pipe(
      select(getAllProductsSelector),
      tap((products) => {
        if (!products.length) {
          this.store.dispatch(getAllProducts());
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  addProduct(): void {
    this.dialog.open(ProductsDialogComponent, {
      width: '600px',
      panelClass: 'stc-dialog-defaults',
      disableClose: true,
      data: {
        mode: MODES.ADD,
        title: 'Add new product dialog',
      },
    });
  }
}
