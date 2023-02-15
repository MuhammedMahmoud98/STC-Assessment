import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
  @Input() rate = 0;

  ratings = [];

  constructor() { }

  ngOnInit(): void {
    this.createStarRatings();
  }

  createStarRatings() {
    if (this.rate > 10 || isNaN(this.rate)) return;
    let decimalValue = ((this.rate / 2) % 1) * 10;
    for (let i = 1; i <= 5; i++) {
      if (i <= (this.rate)) {
        this.ratings.push('star');
      } else if (decimalValue !== 0) {
        this.ratings.push('star_half');
        decimalValue = 0;
      } else {
        this.ratings.push('star_outline');
      }
    }
  }
}
