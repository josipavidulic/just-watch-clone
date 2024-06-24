import { ResponseData } from "@/types/types";
import React from "react";
import SearchResponseItem from "./SearchResponseItem";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

interface SearchResponseProps {
  isExpanded: boolean;
  searchResponseData: ResponseData[];
  value: string;
}

const SearchResponse = ({
  isExpanded,
  searchResponseData,
  value,
}: SearchResponseProps) => {
  const pathname = usePathname();
  const responseList = [
    {
      title: "filmovi & serije",
      content: searchResponseData
        .filter((data) => data.media_type !== "person")
        .slice(0, 4)
        .map((data) => (
          <SearchResponseItem
            key={data.original_title ?? data.original_name}
            data={data}
          />
        )),
    },
    {
      title: "ljudi",
      content: searchResponseData
        .filter((data) => data.media_type === "person")
        .slice(0, 4)
        .map((data) => (
          <SearchResponseItem
            key={data.original_name}
            data={data}
            isPerson={true}
          />
        )),
    },
  ];
  return (
    <div className="absolute top-[38px] w-full overflow-hidden bg-[#10161d] text-base font-normal leading-5 rounded-b text-[#b9bdcc]">
      <div
        className={`grid p-6 ${isExpanded ? "block" : "hidden"} ${
          pathname === "/"
            ? "grid-cols-1 2xl:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
        }`}
      >
        {responseList.map((response) => (
          <div key={response.title} className="pr-4">
            <h3 className="w-full uppercase text-base font-bold border-b-[1px] py-2 border-[#b9bdcc]">
              {response.title}
            </h3>
            <div className="flex flex-col gap-3 mt-2">{response.content}</div>
          </div>
        ))}
      </div>
      <Link
        href={{ pathname: "/search", query: { q: value } }}
        className="w-full bg-transparent text-[#78a6b8] text-base font-bold hover:text-[#d9e8ed] p-4 flex items-center justify-center border-t-[0.3px] border-[#1c252f]"
      >
        Pogledajte sve rezultate za {value}
        <ChevronsRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default SearchResponse;
