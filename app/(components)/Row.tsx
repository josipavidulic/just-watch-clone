"use client";
import { cn } from "@/lib/utils";
import { ResponseData } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect, useContext } from "react";
import Card from "./Card";

interface RowProps {
  showRankingNumber?: boolean;
  results: ResponseData[];
  rowId: string;
  hasFavoriteIcon?: boolean;
  className?: string;
}

const Row = ({
  showRankingNumber,
  results,
  rowId,
  hasFavoriteIcon,
  className,
}: RowProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  return (
    <div className="relative w-full flex items-center overflow-hidden group">
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
        {results.map((item, index) => (
          <div
            key={item.id}
            className="flex items-end h-full text-[130px] sm:text-[180px] font-black text-[#222c38]"
          >
            {showRankingNumber && (
              <div className="overflow-hidden leading-none tracking-[-20px]">
                {index + 1}
              </div>
            )}
            <Card
              card={item}
              hasFavoriteIcon={hasFavoriteIcon}
              className={className}
            />
          </div>
        ))}
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
