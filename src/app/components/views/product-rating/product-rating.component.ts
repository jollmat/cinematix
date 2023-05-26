import { Component, Input, OnInit } from '@angular/core';
import { ProductRatingInterface } from 'src/app/model/interface/product-rating.interface';

@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit {

  @Input() productRating?: ProductRatingInterface;
  @Input() hideProviderName: boolean = false;

  constructor() { }

  getRoundPercent(val: number): number {
    function roundUpNearest10(value: number) {
      return Math.ceil(value / 10) * 10;
    }
    let valueRounded = 100 - (roundUpNearest10(val));
    return 100 - valueRounded;
  }

  getRoundRating(val: number): number {
    return Math.floor(val);
  }

  ngOnInit(): void {
  }

}
