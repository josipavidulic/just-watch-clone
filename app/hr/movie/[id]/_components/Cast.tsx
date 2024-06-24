import React, { useEffect, useRef, useState } from "react";
import { Cast } from "@/types/types";
import { ChevronUp, ChevronDown } from "lucide-react";

interface CastProps {
  castList: Cast[];
}

const CastList = ({ castList }: CastProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleScroll = () => {
      if (slider) {
        setCanScrollUp(slider.scrollTop > 0);
        setCanScrollDown(
          slider.scrollTop + slider.clientHeight < slider.scrollHeight
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

  const slideUp = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ top: -slider.clientHeight, behavior: "smooth" });
    }
  };

  const slideDown = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ top: slider.clientHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-[500px] flex flex-col overflow-hidden group">
      {canScrollUp && (
        <button
          onClick={slideUp}
          className="absolute top-0 left-0 w-full h-8 bg-[#060d17] bg-opacity-60 z-10 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronUp className="w-8 h-8 text-white mx-auto" />
        </button>
      )}
      <div
        id={"slider"}
        ref={sliderRef}
        className="flex-1 overflow-y-auto scrollbar-hide grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {castList.map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-start font-medium text-md"
          >
            <h5 className="text-[#78a6b8] overflow-hidden overflow-ellipsis">
              {actor.name}
            </h5>
            <h5 className="text-[#b9bdcc] overflow-hidden overflow-ellipsis">
              {actor.character}
            </h5>
          </div>
        ))}
      </div>
      {canScrollDown && (
        <button
          onClick={slideDown}
          className="absolute bottom-0 left-0 w-full h-8 bg-[#060d17] bg-opacity-60 z-10 transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ChevronDown className="w-8 h-8 text-white mx-auto" />
        </button>
      )}
    </div>
  );
};

export default CastList;
