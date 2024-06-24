import { FilterState } from "@/context/FilterContext";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateQueryParams = (
  pathname: string,
  router: AppRouterInstance,
  filters: FilterState
) => {
  const queryParams = [];
  if (filters.genres.length > 0) {
    queryParams.push(`genres=${filters.genres.join(",")}`);
  }
  if (filters.releaseYearFrom !== 1900) {
    queryParams.push(`release_year_from=${filters.releaseYearFrom}`);
  }
  if (filters.releaseYearUntil !== new Date().getFullYear()) {
    queryParams.push(`release_year_until=${filters.releaseYearUntil}`);
  }
  if (filters.rating > 0) {
    queryParams.push(`rating_imdb=${filters.rating}`);
  }

  const queryString = queryParams.join("&");

  router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
};
