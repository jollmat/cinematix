import { ProductTypeEnum } from "../enums/product-type.enum";
import { ProductRatingInterface } from "./product-rating.interface"

export interface ProductInterface {
    title: string;
    year?: number;
    rated?: string;
    released?: Date;
    runtimeMinutes?: number;
    genre?: string[];
    directors?: string[];
    writers?: string[];
    actors?: string[];
    plot?: string;
    languages?: string[];
    countries?: string[];
    awards?: string;
    posterUrl?: string;
    ratings?: ProductRatingInterface[];
    metascore?: number;
    imdbRating?: number;
    imdbVotes?: number;
    imdbId?: string;
    type?: ProductTypeEnum;
    dvdDate?: Date;
    boxOffice?: number;
    boxOfficeSymbol?: string;
    production?: string;
    website?: string;
    response?: boolean;
    totalSeasons?: number;
}