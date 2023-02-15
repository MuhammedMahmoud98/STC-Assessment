import {
  AfterViewInit, ChangeDetectorRef,
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
import { addNewProduct, deleteProduct, updateProduct } from '../../../store/actions/products/products.action';
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
    private readonly cdRef: ChangeDetectorRef,
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
    this.cdRef.detectChanges();
  }

  createDialogForm(): void {
    this.dialogForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.max(1000)]),
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
    const { id } = this.data.product;
    this.store.dispatch(deleteProduct({ productId: id }));
  }

  closeDialogListener() {
    this.productsService.closeDialog$.pipe(
      tap((dialogValue = false) => {
        if (dialogValue) {
          this.dialogRef.close();
          this.productsService.closeDialog$.next(false);
          this.displaySnackBar();
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  displaySnackBar(): void {
    switch (this.mode) {
      case MODES.ADD:
        this.snackBarService.openSnackBar('Product added successfully', 'success-snack');
        break;
      case MODES.EDIT:
        this.snackBarService.openSnackBar('Product updated successfully', 'success-snack');
        break;
      case MODES.DELETE:
        this.snackBarService.openSnackBar('Product deleted successfully', 'success-snack');
        break;
      default: break;
    }
  }
}
