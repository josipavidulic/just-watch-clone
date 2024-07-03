"use client";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GenresContent from "./GenresContent";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import SingleRangeSlider from "./SingleRangeSlider";
import DualRangeSlider from "./DualRangeSlider";
import { useFilter } from "@/context/FilterContext";
import { cn } from "@/lib/utils";

const Filter = () => {
  const [openedFilterId, setOpenedFilterId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { filters, setFilters } = useFilter();

  const handleResetButton = () => {
    setFilters({
      releaseYearFrom: 1900,
      releaseYearUntil: new Date().getFullYear(),
      genres: [],
      rating: 0,
    });
  };

  const toggleFilter = useCallback((id: number) => {
    setOpenedFilterId((prevId) => (prevId === id ? null : id));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filterList = [
    {
      id: 0,
      filterName: "Release year",
      isActive:
        filters.releaseYearFrom !== 1900 ||
        filters.releaseYearUntil !== new Date().getFullYear(),
      content: (
        <DualRangeSlider min={1900} max={new Date().getFullYear()} step={1} />
      ),
    },
    {
      id: 1,
      filterName: "Genres",
      isActive: filters.genres.length > 0,
      content: <GenresContent />,
    },
    {
      id: 2,
      filterName: "Rating",
      isActive: filters.rating > 0,
      content: <SingleRangeSlider min={0} max={10} step={0.1} />,
    },
  ];

  return (
    <div className="relative max-[402px]:self-center flex max-[402px]:flex-col  items-center justify-center gap-2 sm:gap-4">
      <div className="flex items-center justify-center gap-2  max-[402px]:order-2">
        {filterList.map((filter) => (
          <Fragment key={filter.id}>
            <button
              onClick={() => toggleFilter(filter.id)}
              key={filter.id}
              className={cn(
                `relative flex justify-center items-center py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md gap-1 sm:gap-2 text-[#b9bdcc]`,
                filter.isActive && "bg-[#434f5b]"
              )}
            >
              <h3
                className={cn(
                  "text-sm sm:text-md font-medium text-nowrap",
                  filter.isActive && "font-semibold text-[#fff]"
                )}
              >
                {filter.filterName}
              </h3>
              {openedFilterId === filter.id ? (
                <ChevronUp className="max-sm:w-4 max-sm:h-4" />
              ) : (
                <ChevronDown className="max-sm:w-4 max-sm:h-4" />
              )}
            </button>
            {openedFilterId === filter.id && (
              <div
                ref={ref}
                className="z-10 mt-2 top-full absolute flex flex-col gap-6 p-6 rounded-md min-w-[250px] max-w-[350px]  sm:w-[400px] bg-[#10161d]"
              >
                {filter.content}
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <button
        className="flex items-center gap-1 max-[402px]:order-1 py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md hover:bg-[#5e6b76] hover:bg-opacity-10"
        onClick={handleResetButton}
        disabled={filterList.every((filter) => filter.isActive === false)}
      >
        <X className="text-[#4c5a67] w-4 h-4" />
        <h2 className="text-sm text-[#4c5a67] uppercase font-bold">reset</h2>
      </button>
    </div>
  );
};

export default Filter;
