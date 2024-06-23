import { FilterState } from "@/context/FilterContext";
import { apiKey } from "./requests";

export const buildUrl = (filters: FilterState, page: number): string => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

  if (filters.genres && filters.genres.length > 0) {
    url += `&with_genres=${filters.genres.join(",")}`;
  }
  if (filters.releaseYearFrom && filters.releaseYearFrom !== 1900) {
    url += `&primary_release_date.gte=${filters.releaseYearFrom}-01-01`;
  }
  if (
    filters.releaseYearUntil &&
    filters.releaseYearUntil !== new Date().getFullYear()
  ) {
    url += `&primary_release_date.lte=${filters.releaseYearUntil}-12-31`;
  }

  if (filters.rating && filters.rating !== 0) {
    url += `&vote_average.gte=${filters.rating}`;
  }
  return url;
};
