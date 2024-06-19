import ListContainer from "@/components/discover-page/ListContainer";
import { request } from "@/lib/requests";
import React from "react";
const discoverList = [
  {
    id: 0,
    title: "Top 3",
    requestType: request.topRatedMovies,
    lastElemement: 3,
  },
  {
    id: 1,
    title: "Najnoviji filmovi",
    requestType: request.latestMovies,
    lastElemement: -1,
  },
  {
    id: 2,
    title: "Top 10 u 🇭🇷 danas",
    requestType: request.popularMovies,
    showRankingNumber: true,
    lastElemement: 10,
  },
  {
    id: 3,
    title: "Akcijski filmovi",
    requestType: request.actionMovies,
    lastElemement: -1,
  },
  {
    id: 4,
    title: "Drama",
    requestType: request.dramaMovies,
    lastElemement: -1,
  },
  {
    id: 5,
    title: "Glazba u filmu",
    requestType: request.musicMovies,
    lastElemement: -1,
  },
];

const Page = () => {
  return (
    <main className="w-full h-full bg-[#060d17] flex flex-col px-4 sm:px-16 py-2 gap-14">
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
