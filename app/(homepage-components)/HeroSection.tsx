import { movieProvidersResponse } from "@/lib/responses";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="w-full flex h-[750px] flex-col items-center justify-end gap-10 text-center bg-[url(/hero-image.png)] bg-cover ">
      <div className="absolute w-full h-full bg-custom-gradient"></div>
      <h1 className="leasing-[48px] sm:leading-[58px] lg:leading-[70px] text-4xl sm:text-5xl lg:text-6xl w-[90%] lg:w-2/3 2xl:w-1/2 font-bold lg:font-black text-[#fff] z-10">
        Vaš vodič za streaming filmovi, TV serije i sport
      </h1>
      <p className="hidden sm:block w-[90%] sm:w-[80%] text-xl text-[#999c9f] z-10">
        Uz JustWatch pronađite gdje streamati nove, popularne i nadolayeće
        sadržaje.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 z-10">
        <Link
          href="/discover"
          className="rounded-lg text-base font-bold  bg-[#fbc500] hover:bg-[#ddad00] text-[#000] py-4 px-10 sm:px-16"
        >
          Otkrijte filmove i serije
        </Link>
        <Link
          href="/"
          className="rounded-lg text-base font-bold border-[1px] border-[#999c9f] bg-transparent hover:bg-[#9c9f99] hover:bg-opacity-10 text-[#999c9f] py-4 px-10 sm:px-16"
        >
          Značajke
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 z-10 mt-16">
        <p className="text-[#657182] font-normal text-base">
          Streaming servisi na JustWatchu
        </p>
        <div className="flex justify-center items-center gap-3 sm:gap-5 px-2 sm:px-4 flex-wrap">
          {movieProvidersResponse.slice(0, 12).map((provider, index) => (
            <div
              key={provider.provider_id}
              className={cn("cursor-pointer", index >= 4 && "hidden lg:block")}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                width={48}
                height={48}
                className="rounded-lg w-12 h-12"
              />
            </div>
          ))}
          <button className="outline-none border-0 h-12 px-3 rounded-lg bg-[#10161d] text-[#657182] font-bold text-sm">
            POGLEDAJTE SVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
