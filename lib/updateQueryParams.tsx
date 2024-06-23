import { FilterState } from "@/context/FilterContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateQueryParams = (
  pathname: string,
  router: AppRouterInstance,
  filters: FilterState
) => {
  const queryParams = new URLSearchParams();
  const params: { [key: string]: string } = {};

  queryParams.forEach((_, key) => {
    queryParams.delete(key);
  });
  if (filters.genres.length > 0) {
    params["genres"] = filters.genres.join(",");
  }
  if (filters.releaseYearFrom !== 1900) {
    params["release_year_from"] = String(filters.releaseYearFrom);
  }
  if (filters.releaseYearUntil !== new Date().getFullYear()) {
    params["release_year_until"] = String(filters.releaseYearUntil);
  }
  if (filters.rating > 0) {
    params["rating_imdb"] = String(filters.rating);
  }

  Object.entries(params).forEach(([key, value]) => {
    queryParams.set(key, value);
  });

  const query = queryParams.toString();
  router.push(`${pathname}?${query}`);
};
