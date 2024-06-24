import Filter from "@/app/hr/popular/_components/Filter";
import MovieList from "@/app/hr/popular/_components/MovieList";
import { FilterProvider } from "@/context/FilterContext";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <FilterProvider>
        <main className="w-full max-w-[1752px] mx-auto min-h-screen h-full bg-[#060d17] flex flex-col px-4 lg:px-16 py-2 pb-18 font-lato">
          <div className="w-full flex flex-col gap-5 items-start">
            <h2 className="text-[#fff] text-[28px] font-bold ">
              Najpopularnije
            </h2>
            <Filter />
            <MovieList />
          </div>
        </main>
      </FilterProvider>
    </Suspense>
  );
};

export default page;
