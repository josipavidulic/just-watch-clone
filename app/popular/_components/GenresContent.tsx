import { FilterState, useFilter } from "@/context/FilterContext";
import { movieGenres } from "@/lib/responses";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const GenresContent = () => {
  const { filters, setFilters } = useFilter();
  const [activeGenres, setActiveGenres] = useState<number[]>(filters.genres);

  useEffect(() => {
    setActiveGenres(filters.genres);
  }, [filters.genres]);

  const handleChosenGenres = useCallback(
    (genre: number) => {
      const updatedGenres = activeGenres.includes(genre)
        ? activeGenres.filter((g) => g !== genre)
        : [...activeGenres, genre];
      setActiveGenres(updatedGenres);
      setFilters((prevState) => ({ ...prevState, genres: updatedGenres }));
    },
    [activeGenres, setFilters]
  );

  const handleResetButton = useCallback(() => {
    setActiveGenres([]);
    setFilters((prevState) => ({ ...prevState, genres: [] }));
  }, [setFilters]);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-md md:text-xl text-[#d5d5d5]">Genres</h2>
        <button
          className="flex items-center gap-1 py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md hover:bg-[#5e6b76] hover:bg-opacity-10"
          onClick={handleResetButton}
        >
          <X className="text-[#4c5a67] w-4 h-4" />
          <h2 className="text-sm text-[#4c5a67] uppercase font-bold">reset</h2>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-1 gap-x-4">
        {movieGenres.map((genre) => (
          <button
            onClick={() => handleChosenGenres(genre.id)}
            key={genre.id}
            className={cn(
              "flex items-center gap-2 py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-md text-nowrap",
              activeGenres.some((activeGenre) => activeGenre === genre.id) &&
                "bg-[#434f5b] "
            )}
          >
            <Check
              className={`text-[#4c5a67] w-4 h-4 sm:w-5 sm:h-5 ${
                activeGenres.some((activeGenre) => activeGenre === genre.id) &&
                "text-[#fff]"
              }`}
            />
            <p
              className={`text-[#b9bdcc] font-normal text-sm sm:text-base ${
                activeGenres.some((activeGenre) => activeGenre === genre.id) &&
                "text-[#fff]"
              }`}
            >
              {genre.name}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default GenresContent;
