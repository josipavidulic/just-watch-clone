import React from "react";

import { getData } from "@/app/actions";
import uuid from "react-uuid";
import { TMDbResponse } from "@/types/types";
import Row from "@/app/(components)/Row";

interface ListContainerProps {
  title: string;
  requestType: string;
  lastElement: number;
  showRankingNumber?: boolean;
}

const ListContainer = async ({
  title,
  requestType,
  showRankingNumber,
  lastElement,
}: ListContainerProps) => {
  const data = await getData<TMDbResponse>(requestType);
  return (
    <div className="w-full flex flex-col gap-5 items-start">
      <h2 className="text-[#fff] text-[28px] font-bold ">{title}</h2>
      <Row
        results={data.results.slice(0, lastElement)}
        showRankingNumber={showRankingNumber}
        rowId={uuid()}
        hasFavoriteIcon={true}
        className="w-[190px]"
      />
    </div>
  );
};

export default ListContainer;
