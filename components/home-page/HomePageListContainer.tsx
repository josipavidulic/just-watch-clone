import { getData } from "@/app/actions";
import { cn } from "@/lib/utils";
import React from "react";
import Row from "../Row";
import uuid from "react-uuid";
import { TMDbResponse } from "@/types/types";

interface HomePageListContainerProps {
  title?: string;
  description?: string;
  requestType: string;
  showRankingNumber?: boolean;
  seeMoreDescriptionButton?: string;
  className?: string;
}

const HomePageListContainer = async ({
  title,
  description,
  showRankingNumber,
  requestType,
  seeMoreDescriptionButton,
  className,
}: HomePageListContainerProps) => {
  const data = await getData<TMDbResponse>(requestType);

  return (
    <div
      className={cn(
        "w-full flex flex-col sm:flex-row gap-12 overflow-y-visible mt-8 pl-[6%]",
        className
      )}
    >
      {title && description && (
        <div className="flex flex-col justify-between gap-5 sm:h-[270px] sm:min-w-[190px] sm:max-w-[190px]">
          <div className=" flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-black text-[#eaebee]">
              {title}
            </h2>
            <p className="text-sm sm:text-base font-normal text-[#8a8d98]">
              {description}
            </p>
          </div>
          {seeMoreDescriptionButton && seeMoreDescriptionButton.length > 0 && (
            <button className="outline-none font-normal text-base text-start text-[#78a6b8]">
              {seeMoreDescriptionButton}
            </button>
          )}
        </div>
      )}
      <Row
        results={showRankingNumber ? data.results.slice(0, 10) : data.results}
        showRankingNumber={showRankingNumber}
        rowId={uuid()}
        className="w-[190px]"
      />
    </div>
  );
};

export default HomePageListContainer;
