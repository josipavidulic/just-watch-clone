import React from "react";
import Row from "../Row";
import { getData } from "@/app/actions";
import uuid from "react-uuid";

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
  const results = await getData(requestType);
  return (
    <div className="w-full flex flex-col gap-5 items-start">
      <h2 className="text-[#fff] text-[28px] font-bold ">{title}</h2>
      <Row
        results={results.slice(0, lastElement)}
        showRankingNumber={showRankingNumber}
        rowId={uuid()}
        hasFavoriteIcon={true}
      />
    </div>
  );
};

export default ListContainer;
