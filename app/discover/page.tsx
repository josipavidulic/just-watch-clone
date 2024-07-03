import React from "react";
import ListContainer from "./_components/ListContainer";
import { discoverList } from "@/types/staticData";

const Page = () => {
  return (
    <main className="w-full max-w-[1752px] h-full bg-[#060d17] flex flex-col px-4 sm:px-16 py-2 gap-14 pb-12 mx-auto">
      {discoverList.map((row) => (
        <ListContainer
          key={row.id}
          lastElement={row.lastElemement}
          showRankingNumber={row.showRankingNumber}
          title={row.title}
          requestType={row.requestType}
        />
      ))}
    </main>
  );
};

export default Page;
