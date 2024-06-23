"use client";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import GenresContent from "./GenresContent";
import { ChevronDown, ChevronUp } from "lucide-react";
import SingleRangeSlider from "./SingleRangeSlider";
import DualRangeSlider from "./DualRangeSlider";

const Filter = () => {
  const [activeFilterId, setActiveFilterId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

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

  const toggleFilter = useCallback(
    (id: number) => {
      if (activeFilterId === id) {
        setActiveFilterId(null);
      } else {
        setActiveFilterId(id);
      }
    },
    [activeFilterId]
  );

  const filterList = [
    {
      id: 0,
      filterName: "Release year",
      content: <DualRangeSlider min={1900} max={2024} step={1} />,
    },
    {
      id: 1,
      filterName: "Genres",
      content: <GenresContent />,
    },
    {
      id: 2,
      filterName: "Rating",
      content: <SingleRangeSlider min={0} max={10} step={0.1} />,
    },
  ];

  return (
    <div className="relative self-center flex items-center justify-center gap-4 mb-5">
      {filterList.map((filter) => (
        <Fragment key={filter.id}>
          <button
            onClick={() => toggleFilter(filter.id)}
            key={filter.id}
            className="relative flex justify-center items-center gap-2 text-[#b9bdcc]"
          >
            <h3 className="text-md font-medium">{filter.filterName}</h3>
            {activeFilterId === filter.id ? <ChevronUp /> : <ChevronDown />}
          </button>
          {activeFilterId === filter.id && (
            <div
              ref={ref}
              className="z-10 mt-2 top-full absolute flex flex-col gap-6 px-6 py-6 rounded-md w-[300px] sm:w-[400px] bg-[#10161d]"
            >
              {filter.content}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Filter;
