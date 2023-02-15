import { Component, Input, OnInit } from '@angular/core';
import {
  animate, style, transition, trigger,
} from '@angular/animations';
import { Product } from '../../../../models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('showWithOpacity', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(id): number {
    return id;
  }
}
