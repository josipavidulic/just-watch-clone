"use client";
import { FavoriteContext, useFavorites } from "@/context/FavoriteContext";
import { kebabCase } from "@/lib/kebabCase";
import {
  addFavoriteId,
  getFavoriteIds,
  removeFavoriteId,
} from "@/lib/localStorageUtils";
import { cn } from "@/lib/utils";
import { ResponseData } from "@/types/types";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState, useEffect, useContext } from "react";

interface RowProps {
  showRankingNumber?: boolean;
  results: ResponseData[];
  rowId: string;
  hasFavoriteIcon?: boolean;
}

const Row = ({
  showRankingNumber,
  results,
  rowId,
  hasFavoriteIcon,
}: RowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { favoriteIds, addFavoriteId, removeFavoriteId } = useFavorites();

  useEffect(() => {
    const slider = sliderRef.current;
    const handleScroll = () => {
      if (slider) {
        setCanScrollLeft(slider.scrollLeft > 0);
        setCanScrollRight(
          slider.scrollLeft + slider.clientWidth < slider.scrollWidth
        );
      }
    };
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => {
      if (slider) {
        slider.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const slideLeft = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
    }
  };

  const handleFavoriteId = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (!favoriteIds.includes(id)) {
      addFavoriteId(id);
    } else {
      removeFavoriteId(id);
    }
  };

  return (
    <div className="relative w-full  flex items-center overflow-hidden group">
      {canScrollLeft && (
        <button
          onClick={slideLeft}
          className="absolute left-0 w-12 h-full bg-[#060d17] bg-opacity-60 z-10 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-12 h-12 text-white" />
        </button>
      )}

      <div
        id={"slider" + rowId}
        ref={sliderRef}
        className={cn(
          "overflow-x-scroll scrollbar-hide flex items-center flex-nowrap gap-6 mr-4",
          hasFavoriteIcon && "gap-3"
        )}
      >
        {results.map((item, index) => {
          const title = (item.original_title as string) ?? item.original_name;
          return (
            <div
              key={item.id}
              className="flex items-end h-full  text-[130px] sm:text-[180px] font-black text-[#222c38]"
            >
              {showRankingNumber && (
                <div className="overflow-hidden leading-none tracking-[-20px]">
                  {index + 1}
                </div>
              )}
              <Link
                href={`/hr/${
                  item.media_type === "movie" ? "film" : "serija"
                }/${kebabCase(title)}/${item.id}`}
                className="relative flex bg-[#0a151f] overflow-hidden w-[190px] outline-none text-[#78a6b8]"
              >
                {hasFavoriteIcon && (
                  <Bookmark
                    onClick={(e) => handleFavoriteId(item.id, e)}
                    className={cn(
                      `absolute top-[-6px] m-2 mt-0 w-10 h-10 fill-[#fff] text-[#fff] opacity-40 hover:opacity-80`,
                      favoriteIds.includes(item.id) && "opacity-100"
                    )}
                  />
                )}
                <Image
                  src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                  alt={(item.original_title as string) ?? item.name}
                  width={190}
                  height={270}
                  className="inline-block w-full h-[270px] rounded-md"
                />
              </Link>
            </div>
          );
        })}
      </div>
      {canScrollRight && (
        <button
          onClick={slideRight}
          className="absolute right-0 w-12 h-full  bg-[#060d17] bg-opacity-60 z-10 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-12 h-12 text-white" />
        </button>
      )}
    </div>
  );
};

export default Row;
