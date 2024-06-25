import { FilterProvider } from "@/context/FilterContext";
import React, { Suspense } from "react";
import Filter from "./_components/Filter";
import MovieList from "./_components/MovieList";

const page = () => {
  return (
    <main className="w-full max-w-[1752px] mx-auto min-h-screen h-full bg-[#060d17] flex flex-col px-4 lg:px-16 py-2 pb-18 font-lato">
      <div className="w-full flex flex-col gap-5 items-start">
        <h2 className="text-[#fff] text-[28px] font-bold ">Najpopularnije</h2>
        <Filter />
        <MovieList />
      </div>
    </main>
  );
};

export default page;
