import { cn } from "@/lib/utils";
import { ResponseData } from "@/types/types";
import Image from "next/image";
import React from "react";
import { handleDetailsPage } from "@/lib/handleDetailsPage";
import { useRouter } from "next/navigation";
import { handleSearchedItems } from "@/lib/handleSearcheditems";
import { useExpandedState } from "@/context/ExpandendStateContext";

interface SearchResponseProps {
  data: ResponseData;
  isPerson?: boolean;
  isSelected?: boolean;
}

const SearchResponseItem = ({
  data,
  isPerson,
  isSelected,
}: SearchResponseProps) => {
  const router = useRouter();
  const { setIsExpanded } = useExpandedState();

  const handleItemClick = (e: React.MouseEvent) => {
    setIsExpanded(false);
    handleSearchedItems((data.title as string) ?? data.name);
    const url = handleDetailsPage(data, e);
    if (!isPerson) {
      router.push(url);
    }
  };

  return (
    <button
      onClick={(e) => handleItemClick(e)}
      className={cn(
        "flex items-center rounded-md p-2 gap-4 tracking-[0.27px] w-full h-[75px] hover:bg-[#1c252f] leading-3",
        isSelected && "bg-[#1c252f]"
      )}
    >
      <Image
        src={
          !isPerson
            ? `https://image.tmdb.org/t/p/original/${data.poster_path}`
            : data.profile_path !== null && data.profile_path !== undefined
            ? `https://image.tmdb.org/t/p/original/${data.profile_path}`
            : "/no-actor.png"
        }
        alt={(data.original_title as string) ?? data.original_name}
        width={46}
        height={65}
        className={cn(
          "inline-block rounded-md w-[46px] h-[65]",
          isPerson && "w-[55px] h-[55px] rounded-full object-fit"
        )}
      />
      <div className="flex flex-col gap-2 items-start ">
        <h3 className="text-[#fff] font-normal text-lg leading-6 text-start">
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
    </button>
  );
};

export default SearchResponseItem;
