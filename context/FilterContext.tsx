"use client";
import { movieGenres } from "@/lib/responses";
import { useRouter, useSearchParams } from "next/navigation";
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

const initialFilters: FilterState = {
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

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
