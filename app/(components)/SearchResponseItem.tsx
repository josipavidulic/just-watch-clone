import { cn } from "@/lib/utils";
import { ResponseData } from "@/types/types";
import Image from "next/image";
import React from "react";

interface SearchResponseProps {
  data: ResponseData;
  isPerson?: boolean;
}

const SearchResponseItem = ({ data, isPerson }: SearchResponseProps) => {
  return (
    <div className="flex items-center rounded-md p-2 gap-4 tracking-[0.27px] h-[75px] hover:bg-[#1c252f] leading-3">
      <Image
        src={
          !isPerson
            ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
            : data.profile_path !== null && data.profile_path !== undefined
            ? `https://image.tmdb.org/t/p/original/${data.profile_path}`
            : "no-actor.png"
        }
        alt={(data.original_title as string) ?? data.original_name}
        width={46}
        height={65}
        className={cn(
          "inline-block rounded-md w-auto h-auto",
          isPerson && "w-[55px] h-[55px] rounded-full object-fit"
        )}
      />
      <div className="flex flex-col gap-2 ">
        <h3 className="text-[#fff] font-normal text-lg leading-6">
          {data.title ?? data.name}
        </h3>
        <p className="lowercase">
          {isPerson
            ? `known for ${data.known_for_department}`
            : `${data.media_type}, ${
                data.release_date?.split("-")[0] ??
                data.first_air_date?.split("-")[0]
              }`}
        </p>
      </div>
    </div>
  );
};

export default SearchResponseItem;
