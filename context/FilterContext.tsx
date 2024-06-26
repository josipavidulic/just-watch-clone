"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface FilterState {
  releaseYearFrom: number;
  releaseYearUntil: number;
  genres: number[];
  rating: number;
}

interface FilterContextProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

export const initialFilters: FilterState = {
  releaseYearFrom: 1900,
  releaseYearUntil: new Date().getFullYear(),
  genres: [],
  rating: 0,
};

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFitler must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const releaseYearFrom = searchParams.get("releaseYearFrom");
    const releaseYearUntil = searchParams.get("releaseYearUntil");
    const genres = searchParams.get("genres");
    const rating = searchParams.get("rating");

    setFilters({
      releaseYearFrom: releaseYearFrom ? parseInt(releaseYearFrom, 10) : 1900,
      releaseYearUntil: releaseYearUntil
        ? parseInt(releaseYearUntil, 10)
        : new Date().getFullYear(),
      genres: genres ? genres.split(",").map(Number) : [],
      rating: rating ? parseFloat(rating) : 0,
    });
  }, []);

  useEffect(() => {
    const query = new URLSearchParams();
    if (filters.releaseYearFrom !== 1900)
      query.set("releaseYearFrom", filters.releaseYearFrom.toString());
    if (filters.releaseYearUntil !== new Date().getFullYear())
      query.set("releaseYearUntil", filters.releaseYearUntil.toString());
    if (filters.genres.length > 0)
      query.set("genres", filters.genres.join(","));
    if (filters.rating !== 0) query.set("rating", filters.rating.toString());

    const queryString = query.toString();
    router.replace(`${pathname}?${queryString}`);
  }, [filters, router, pathname]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
