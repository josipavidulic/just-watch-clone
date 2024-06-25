import { ResponseData } from "@/types/types";
import React, { useCallback, useEffect, useState } from "react";
import SearchResponseItem from "./SearchResponseItem";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";
import { handleDetailsPage } from "@/lib/handleDetailsPage";
import { useRouter } from "next/navigation";
import { handleSearchedItems } from "@/lib/handleSearcheditems";
import { useExpandedState } from "@/context/ExpandendStateContext";

interface SearchResponseProps {
  searchResponseData: ResponseData[];
  value: string;
  loading: boolean;
}

const SearchResponse = ({
  searchResponseData,
  value,
  loading,
}: SearchResponseProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { isExpanded, setIsExpanded } = useExpandedState();
  const pathname = usePathname();
  const router = useRouter();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (searchResponseData.length === 0) return;

      const filteredData = searchResponseData.filter(
        (data) => data.media_type !== "person"
      );

      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= filteredData.length - 1
            ? 0
            : prevIndex + 1
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex <= 0
            ? filteredData.length - 1
            : prevIndex - 1
        );
      } else if (event.key === "Enter" && selectedIndex !== null) {
        const selectedItem = searchResponseData[selectedIndex];
        if (selectedItem.media_type !== "person") {
          const url = handleDetailsPage(selectedItem, event);
          router.push(url);

          handleSearchedItems(
            (selectedItem.title as string) ?? selectedItem.name
          );
        }
        setIsExpanded(false);
      }
    },
    [selectedIndex, searchResponseData, router, setIsExpanded]
  );

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, handleKeyDown]);

  const responseList = [
    {
      title: "filmovi & serije",
      content: searchResponseData
        .filter((data) => data.media_type !== "person")
        .slice(0, 4)
        .map((data, index) => (
          <div key={data.id}>
            <SearchResponseItem
              data={data}
              isSelected={index === selectedIndex}
            />
          </div>
        )),
    },
    {
      title: "ljudi",
      content: searchResponseData
        .filter((data) => data.media_type === "person")
        .slice(0, 4)
        .map((data) => (
          <div key={data.id}>
            <SearchResponseItem data={data} isPerson={true} />
          </div>
        )),
    },
  ];

  const handleSeeAll = () => {
    setIsExpanded(false);
    handleSearchedItems(value);
  };

  if (loading) {
    return (
      <div className="absolute top-[38px] flex items-center justify-center w-full h-[300px] bg-[#10161d] text-base font-bold leading-5 rounded-b text-[#b9bdcc]">
        <div className="w-6 h-6 border-4 border-[#fff] border-opacity-50 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (searchResponseData.length === 0) {
    return (
      <div className="absolute top-[38px] flex items-center justify-center w-full h-[300px] bg-[#10161d] text-base font-bold leading-5 rounded-b text-[#b9bdcc]">
        Nema rezultata za traženo
      </div>
    );
  }

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
        onClick={handleSeeAll}
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
