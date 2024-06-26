"use client";

import React from "react";

import { useFavorites } from "@/context/FavoriteContext";
import Card from "@/app/(components)/Card";

const Page = () => {
  const { favoriteMovies } = useFavorites();

  return (
    <main className="w-full max-w-[1752px] mx-auto min-h-screen h-full bg-[#060d17] flex flex-col px-4 lg:px-16 py-2 pb-18">
      <div className="w-full flex flex-col gap-5 items-start">
        <h2 className="text-[#fff] text-[28px] font-bold ">Moja lista</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 overflow-y-scroll scrollbar-hide mx-auto justify-start">
          {favoriteMovies.map((movie) => (
            <Card
              key={movie.id}
              card={movie}
              hasFavoriteIcon={true}
              className="w-auto h-auto"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
