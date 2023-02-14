import {
  AfterViewInit,
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DialogData } from '../../../models/dialog.model';
import { getAllCategoriesSelector } from '../../../store/selectors/categories/categories.selector';
import { isDialogLoadingSelector } from '../../../store/selectors/products/products.selector';
import { addNewProduct, updateProduct } from '../../../store/actions/products/products.action';
import { ProductsService } from '../../services/products.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { MODES } from '../../enums/products.enum';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.html',
  styleUrls: ['./products-dialog.scss'],
})
export class ProductsDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  dialogForm: FormGroup;

  categories$: Observable<string[]>;

  isDialogLoading$: Observable<boolean>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  mode: string = MODES.ADD;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData,
    private readonly store: Store,
    private readonly productsService: ProductsService,
    private readonly dialogRef: MatDialogRef<ProductsDialogComponent>,
    private readonly snackBarService: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.createDialogForm();
    this.closeDialogListener();
    this.selectAllCategories();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngAfterViewInit(): void {
    this.mode = this.data.mode;
    this.dialogForm.patchValue(this.data.product);
  }

  createDialogForm(): void {
    this.dialogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  get formKeys() {
    return Object.keys(this.dialogForm.value);
  }

  selectAllCategories(): void {
    this.categories$ = this.store.pipe(select(getAllCategoriesSelector));
    this.isDialogLoading$ = this.store.pipe(select(isDialogLoadingSelector));
  }

  addNewProduct(): void {
    const product = this.dialogForm.value;
    this.store.dispatch(addNewProduct({ product }));
  }

  updateProduct() {
    const { id, rating } = this.data.product;
    const product = { ...this.dialogForm.value, rating, id };
    this.store.dispatch(updateProduct({ product }));
  }

  deleteProduct() {

  }

  closeDialogListener() {
    this.productsService.closeDialog$.pipe(
      tap((dialogValue = false) => {
        if (dialogValue) {
          this.dialogRef.close();
          this.productsService.closeDialog$.next(false);
          this.snackBarService.openSnackBar('Product added successfully', 'success-snack');
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }
}
