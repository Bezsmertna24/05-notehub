import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
const link: string = "https://api.themoviedb.org/3/search/movie";
const TMDB_KEY:string = import.meta.env.VITE_API_KEY;

export default async function getMovies(searchText: string, page: number = 1): Promise<MovieSearchResponse> {
 
    const response = await axios.get<MovieSearchResponse>(link, {
      params: {
        query: searchText,
        include_adult: false,
        language: 'en-US',
        page: page,
      },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_KEY}`
        }
      },
    );
    return response.data;
}
