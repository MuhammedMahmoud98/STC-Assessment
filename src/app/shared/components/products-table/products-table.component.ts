import {
  ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../../models/products.model';
import { ProductsDialogComponent } from '../../dialogs/products-dialog/products-dialog';
import { MODES } from '../../enums/products.enum';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit, OnChanges {
  @Input() products: Product[];

  @Input() searchInputValue: string;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['image', 'title', 'description', 'price', 'category', 'rating', 'actions'];

  dataSource: MatTableDataSource<Product>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdRef.detectChanges();
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchInputValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(product: Product): void {
    this.dialog.open(ProductsDialogComponent, {
      width: '600px',
      panelClass: 'stc-dialog-defaults',
      disableClose: true,
      data: {
        title: 'Edit product dialog',
        mode: MODES.EDIT,
        product,
      },
    });
  }

  trackByFn(index: number): number {
    return index;
  }
}
