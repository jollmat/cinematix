import { ProductDtoInterface } from "../dto/product-dto.interface";
import { ProductTypeEnum } from "../enums/product-type.enum";
import { ProductRatingInterface } from "../interface/product-rating.interface";
import { ProductInterface } from "../interface/product.interface";
import { ProductRatingEntity } from "./product-rating.entity";

export class ProductEntity implements ProductInterface {
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

    constructor({title, year, rated, released, runtimeMinutes, genre, directors, writers, actors, plot, languages, countries, awards, 
        posterUrl, ratings, metascore, imdbRating, imdbVotes, imdbId, type, dvdDate, boxOffice, boxOfficeSymbol, production, website, 
        response, totalSeasons}: Partial<ProductInterface>) {

        this.title = title || '';
        this.year = year;
        this.rated = rated;
        this.released = released;
        this.runtimeMinutes = runtimeMinutes;
        this.genre = genre;
        this.directors = directors;
        this.writers = writers;
        this.actors = actors;
        this.plot = plot;
        this.languages = languages;
        this.countries = countries;
        this.awards = awards;
        this.posterUrl = posterUrl;
        this.ratings = ratings;
        this.metascore = metascore;
        this.imdbRating = imdbRating;
        this.imdbVotes = imdbVotes;
        this.imdbId = imdbId;
        this.type = type;
        this.dvdDate = dvdDate;
        this.boxOffice = boxOffice;
        this.boxOfficeSymbol = boxOfficeSymbol;
        this.production = production;
        this.website = website;
        this.response = response;
        this.totalSeasons = totalSeasons;
    }

    static fromDto(dto: ProductDtoInterface): ProductInterface {

        const ratings = dto.Ratings? (dto.Ratings.map((_ratingDto) => {
            return ProductRatingEntity.fromDto(_ratingDto);
        })) : undefined;

       return new ProductEntity({
            title: dto.Title,
            year: dto.Year ? parseInt(dto.Year) : undefined,
            rated: dto.Rated,
            released: dto.Released && dto.Released!=='N/A' ? new Date(dto.Released) : undefined,
            runtimeMinutes: dto.Runtime && dto.Runtime!=='N/A' ? parseInt(dto.Runtime.split(' ')[0]) : undefined,
            genre: dto.Genre ? dto.Genre.split(', ') : undefined,
            directors: dto.Director && dto.Director!=='N/A' ? dto.Director.split(', ') : undefined,
            writers: dto.Writer && dto.Writer!=='N/A' ? dto.Writer.split(', ') : undefined,
            actors: dto.Actors && dto.Actors!=='N/A' ? dto.Actors.split(', ') : undefined,
            plot: dto.Plot,
            languages: dto.Language ? dto.Language.split(', ') : undefined,
            countries: dto.Country ? dto.Country.split(', ') : undefined,
            awards: dto.Awards,
            posterUrl: dto.Poster,
            ratings: ratings,
            metascore: dto.Metascore && dto.Metascore!=='N/A' ? parseInt(dto.Metascore) : undefined,
            imdbRating: dto.imdbRating ? parseInt(dto.imdbRating) : undefined,
            imdbVotes: dto.imdbVotes ? parseInt(dto.imdbVotes) : undefined,
            imdbId: dto.imdbID,
            type: dto.Type,
            dvdDate: dto.DVD ? new Date(dto.DVD) : undefined,
            boxOffice: dto.BoxOffice ? parseInt(dto.BoxOffice.substring(1)) : undefined,
            boxOfficeSymbol: dto.BoxOffice ? dto.BoxOffice.substring(0, 1) : undefined,
            production: dto.Production,
            website: dto.Website,
            response: dto.Response ? new Boolean(dto.Response.toLowerCase()).valueOf() : undefined,
            totalSeasons: dto.totalSeasons ? parseInt(dto.totalSeasons) : undefined
        });
    }
}