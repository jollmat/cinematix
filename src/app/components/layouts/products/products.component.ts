import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ProductTypeEnum } from 'src/app/model/enums/product-type.enum';
import { RatingProviderEnum } from 'src/app/model/enums/rating-provider.enum';
import { ViewTypeEnum } from 'src/app/model/enums/view-type.enum';
import { ProductRatingInterface } from 'src/app/model/interface/product-rating.interface';
import { ProductInterface } from 'src/app/model/interface/product.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  ViewTypeEnum = ViewTypeEnum;
  RatingProviderEnum = RatingProviderEnum;

  public searchText: string = '';
  searchTextUpdate = new Subject<string>();

  sortBy: {
    field: string
  } = {
    field: 'year'
  };

  filter: {
    type?: ProductTypeEnum,
    genre?: string
  } = {
    type: undefined,
    genre: undefined
  };

  sortFields: {text:string, value: string}[] = [
    {text: 'Year', value: 'year'},
    {text: 'Title', value: 'title'}
  ];

  products?: ProductInterface[];
  favourites?: ProductInterface[] = [];
  productsLoaded: ProductInterface[]= []; 
  productsLoading: ProductInterface[]= []; 

  viewType: ViewTypeEnum = ViewTypeEnum.MOSAIC;

  constructor(private productsService: ProductsService) {
    // Debounce search.
    this.searchTextUpdate.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.searchProducts();
      });
  }

  getProduct(product: ProductInterface) {
    if(product && product.imdbId && !this.isProductLoaded(product)){
      this.productsLoading.push(product);
      this.productsService.searchProduct(product.imdbId).subscribe((_product) => {
        this.productsLoading = this.productsLoading.filter((_p) => _p.imdbId!==product.imdbId);
        this.productsLoaded.push(_product);
        const productIndex = this.products?.findIndex((_p) => {
          return _p.imdbId === _product.imdbId;
        });
        if (productIndex!==undefined && productIndex!==null && productIndex>=0 && this.products) {
          this.products[productIndex] = {..._product};
        }
      });
    }
  }

  isProductLoaded(product: ProductInterface): boolean {
    return this.productsLoaded.some((_p) => { return _p.imdbId===product.imdbId; });
  }

  isProductLoading(product: ProductInterface) {
    return this.productsLoading.some((_p) => { return _p.imdbId===product.imdbId; });
  }

  searchProducts() {
    this.sortBy.field = 'year';
    if (this.searchText.length>2) {
      this.productsService.searchProducts(this.searchText).subscribe((_products) => {
        this.products = _products;
        this.products = this.products.map((_p) => {
          const downloadedProduct: ProductInterface | undefined = this.productsLoaded.find((_pl) => { return _pl.imdbId===_p.imdbId; });
          return downloadedProduct || _p;
        });
        this.sortProducts();
        console.log(this.products);
      });
    } else {
      console.warn('Search text too short');
    }
  }

  sortProducts() {
    if(this.products) {
      this.products.sort((a, b) => {
        if (this.sortBy.field==='year') {
          if (!a.year || !b.year) {
            return -1;
          }
          return ((a.year || 0)>=(b.year || 0)) ? 1 : -1;
        } else if (this.sortBy.field==='title') {
          if (!a.title || !b.title) {
            return -1;
          }
          return ((a.title || 0)>=(b.title || 0)) ? 1 : -1;
        }
        return 1;
      });
    }
  }

  getProductRating(product: ProductInterface, ratingProvider: RatingProviderEnum): ProductRatingInterface | undefined {
    let productRating: ProductRatingInterface | undefined;
    switch(ratingProvider) {
      case RatingProviderEnum.IMDB:
        productRating = product.ratings?.find((_rating) => _rating.source==='Internet Movie Database');
        break;
      case RatingProviderEnum.ROTTEN_TOMATOES:
        productRating = product.ratings?.find((_rating) => _rating.source==='Rotten Tomatoes');
        break;
      case RatingProviderEnum.METACRITIC:
        productRating = product.ratings?.find((_rating) => _rating.source==='Metacritic');
        break;
    }
    return productRating;
  }

  addFavourite(product: ProductInterface) {
    this.productsService.addFavourite(product);
  }

  removeFavourite(product: ProductInterface) {
    this.productsService.removeFavourite(product);
  }

  getFavourites() {
    this.favourites = this.productsService.getFavourites();
  }

  getDownloads() {
    this.productsLoaded = this.productsService.getDownloads();
  }

  toggleViewType() {
    this.viewType = this.viewType===ViewTypeEnum.MOSAIC ? ViewTypeEnum.TABLE : ViewTypeEnum.MOSAIC;
  }

  ngOnInit(): void {
    this.getFavourites();
    this.getDownloads();
  }

}
