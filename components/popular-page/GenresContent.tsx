import { FilterState, useFilter } from "@/context/FilterContext";
import { movieGenres } from "@/lib/responses";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const GenresContent = () => {
  const { filters, setFilters } = useFilter();
  const [activeGenres, setActiveGenres] = useState<number[]>(filters.genres);

  // useEffect(() => {
  //   setActiveGenres(filters.genres);
  // }, [filters.genres]);

  const handleChosenGenres = useCallback(
    (genre: number) => {
      let updatedGenres = [...activeGenres];
      const activeGenre = activeGenres.find(
        (activeGenre) => activeGenre === genre
      );
      if (activeGenre) {
        updatedGenres = updatedGenres.filter((genre) => genre !== activeGenre);
      } else {
        updatedGenres.push(genre);
      }
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
        <h2 className="text-xl text-[#d5d5d5]">Genres</h2>
        <button className="flex items-center gap-1" onClick={handleResetButton}>
          <X className="text-[#4c5a67] w-4 h-4" />
          <h2 className="text-sm text-[#4c5a67] uppercase font-bold">reset</h2>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-2 gap-x-6">
        {movieGenres.map((genre) => (
          <button
            onClick={() => handleChosenGenres(genre.id)}
            key={genre.id}
            className={cn(
              "flex items-center gap-2 py-1.5 px-2.5 rounded-md",
              activeGenres.some((activeGenre) => activeGenre === genre.id) &&
                "bg-[#434f5b] "
            )}
          >
            <Check
              className={`text-[#4c5a67] w-4 h-4 ${
                activeGenres.some((activeGenre) => activeGenre === genre.id) &&
                "text-[#fff]"
              }`}
            />
            <p
              className={`text-[#b9bdcc] font-normal text-base ${
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
