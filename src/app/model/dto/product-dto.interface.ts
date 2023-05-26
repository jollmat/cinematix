import { ProductTypeEnum } from "../enums/product-type.enum";
import { ProductRatingDtoInterface } from "./product-rating-dto.interface";

export interface ProductDtoInterface {
    "Title"?: string,
    "Year"?: string,
    "Rated"?: string,
    "Released"?: string,
    "Runtime"?: string,
    "Genre"?: string,
    "Director"?: string,
    "Writer"?: string,
    "Actors"?: string,
    "Plot"?: string,
    "Language"?: string,
    "Country"?: string,
    "Awards"?: string,
    "Poster"?: string,
    "Ratings"?: ProductRatingDtoInterface[],
    "Metascore"?: string,
    "imdbRating"?: string,
    "imdbVotes"?: string,
    "imdbID"?: string,
    "Type"?: ProductTypeEnum,
    "DVD"?: string,
    "BoxOffice"?: string,
    "Production"?: string,
    "Website"?: string,
    "Response"?: string,
    "totalSeasons"?: string
}