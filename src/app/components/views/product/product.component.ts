import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductInterface } from 'src/app/model/interface/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges {

  @Input() product?: ProductInterface;
  @Output() requestProductEmitter = new EventEmitter<ProductInterface>();
  @Output() toggleFavouriteProductEmitter = new EventEmitter<ProductInterface>();

  collapsed: boolean = true;
  dataLoaded: boolean = false;

  constructor(private productsService: ProductsService) { }
  
  isFavourite(): boolean {
    return this.product!=undefined && this.productsService.isFavourite(this.product);
  }

  toggleFavourite() {
    console.log('toggleFavourite()');
    if (this.product!=undefined) {
      if (this.isFavourite()) {
        this.productsService.removeFavourite(this.product).subscribe(() => {
          this.toggleFavouriteProductEmitter.emit(this.product);
        });
      } else {
        this.productsService.addFavourite(this.product).subscribe(() => {
          this.toggleFavouriteProductEmitter.emit(this.product);
        });
      }
    }
  }

  toggleCollapsed() {
    console.log('toggleCollapsed()');
    if (!this.dataLoaded) {
      this.requestProductEmitter.emit(this.product);
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['product'].currentValue.response) {
      this.dataLoaded = true;
      this.collapsed = !this.collapsed;
    }
  }

  ngOnInit(): void {
    this.dataLoaded = this.productsService.downloads.some((_pd) => this.product?.imdbId===_pd.imdbId);
  }

}
