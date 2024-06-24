import { LinkButton, ResponseData, TMDbResponse } from "@/types/types";
import { Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { getData } from "../actions";
import { apiKey, request } from "@/lib/requests";
import SearchResponse from "./SearchResponse";
import ExpandedInputContent from "./ExpandedInputContent";

interface SearchInputProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const SearchInput = ({ isExpanded, setIsExpanded }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [debouncedValue] = useDebounceValue(value, 500);
  const [recentSearch, setRecentSearch] = useState<ResponseData[]>([]);
  const [searchResults, setSearchResults] = useState<ResponseData[]>([]);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const data = await getData<TMDbResponse>(request.trendingAll);
        if (data.results) {
          setRecentSearch(data.results);
        }
      } catch (error) {
        console.error("Error loading recent search", error);
      }
    };
    fetchRecentSearches();
  }, []);

  const fetchSearchResults = useCallback(async (query: string) => {
    try {
      const url = `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}&include_adult=false&language=hr-HR&page=1`;
      const data = await getData<TMDbResponse>(url);
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error("Error searching", error);
    }
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      fetchSearchResults(debouncedValue);
    } else {
      setSearchResults([]);
    }
  }, [debouncedValue, fetchSearchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsExpanded]);

  const handleItemClick = useCallback(
    (name: string, event: React.MouseEvent<HTMLDivElement>) => {
      setValue(name);
      event.stopPropagation();
      setIsExpanded(true);
    },
    [setIsExpanded]
  );

  return (
    <div
      ref={searchContainerRef}
      className={`relative flex w-full flex-col justify-start rounded bg-[#10161d] text-md transition-width duration-[600ms] delay-[100ms] ${
        isExpanded && "flex-grow rounded-b-none"
      }`}
    >
      <div className="h-[38px] py-1 flex items-center justify-center">
        <Search className="w-5 h-5 m-4" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          type="text"
          placeholder="Pretražite filmove ili serije"
          className="border-none bg-transparent m-0 outline-none w-full placeholder:text-[#8c8c8c] text-[#ffff]"
        />
        {value.length > 0 && (
          <X
            className="w-6 h-6 text-[#fff] m-4 cursor-pointer"
            onClick={() => setValue("")}
          />
        )}
      </div>

      {isExpanded &&
        (value === "" ? (
          <ExpandedInputContent
            isExpanded={isExpanded}
            recentSearch={recentSearch}
            onHandleClick={handleItemClick}
          />
        ) : (
          <SearchResponse
            searchResponseData={searchResults}
            isExpanded={isExpanded}
            value={value}
          />
        ))}
    </div>
  );
};

export default SearchInput;
