import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ProductDtoInterface } from '../model/dto/product-dto.interface';
import { ProductEntity } from '../model/entity/product.entity';
import { ProductInterface } from '../model/interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  favourites: ProductInterface[] = [];
  downloads: ProductInterface[] = [];

  apiUrl: string = 'https://www.omdbapi.com';
  apiKey: string = '?apikey=d8a4d08';
  baseUrl: string = this.apiUrl + '/' + this.apiKey;

  constructor(private http: HttpClient) {
    const favourites = localStorage.getItem('favourites');
    if (favourites) {
      this.favourites = eval(favourites) as ProductInterface[];
    } else {
      this.favourites = [];
      localStorage.setItem('favourites', JSON.stringify([]));
    }

    const downloads = localStorage.getItem('downloads');
    if (downloads) {
      this.downloads = eval(downloads) as ProductInterface[];
    } else {
      this.downloads = [];
      localStorage.setItem('downloads', JSON.stringify([]));
    }
  }

  addFavourite(product: ProductInterface): Observable<boolean> {
    if (this.favourites && !this.favourites.find((_product) => { return _product.imdbId===product.imdbId; })) {
      this.favourites.push(product);
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    }
    return of(true);
  }

  removeFavourite(product: ProductInterface): Observable<boolean> {
    this.favourites = this.favourites.filter((_product) => {
      return _product.imdbId!==product.imdbId;
    })
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
    return of(true);
  }

  isFavourite(product: ProductInterface) {
    return this.favourites.find((_product) => { return _product.imdbId===product.imdbId; })!=undefined;
  }

  getFavourites(): ProductInterface[] {
    return this.favourites;
  }

  getDownloads(): ProductInterface[] {
    return this.downloads;
  }

  searchProduct(id: string): Observable<ProductInterface> {
    return this.http.get<ProductDtoInterface>(this.baseUrl + '&i=' + id).pipe(map((_productDto: ProductDtoInterface) => {
      const product: ProductInterface = ProductEntity.fromDto(_productDto);
      this.downloads.push(product);
      localStorage.setItem('downloads', JSON.stringify(this.downloads));
      return product;
    }));
  }

  searchProducts(text: string): Observable<ProductInterface[]> {
    return this.http.get<{Search: ProductDtoInterface[]}>(this.baseUrl + '&s=' + text).pipe(map((_searchResult) => {
      return _searchResult.Search.map((_productDto) => {
        return ProductEntity.fromDto(_productDto);
      });
    }));
  }
}
