import { ResponseData, TMDbResponse } from "@/types/types";
import { Search, X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { getData } from "../actions";
import { apiKey, request } from "@/lib/requests";
import SearchResponse from "./SearchResponse";
import ExpandedInputContent from "./ExpandedInputContent";
import { useRouter } from "next/navigation";
import { handleSearchedItems } from "@/lib/handleSearcheditems";
import { useExpandedState } from "@/context/ExpandendStateContext";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [recentSearch, setRecentSearch] = useState<ResponseData[]>([]);
  const [searchResults, setSearchResults] = useState<ResponseData[]>([]);
  const [ignoreOutsideClick, setIgnoreOutsideClick] = useState(false);
  const [debouncedValue] = useDebounceValue(value, 500);
  const { isExpanded, setIsExpanded } = useExpandedState();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      setLoading(true);
      const url = `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}&include_adult=false&language=hr-HR&page=1`;
      const data = await getData<TMDbResponse>(url);
      if (data.results) {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error("Error searching", error);
    } finally {
      setLoading(false);
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
        !searchContainerRef.current.contains(event.target as Node) &&
        !ignoreOutsideClick
      ) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsExpanded, ignoreOutsideClick]);

  const handleItemClick = useCallback(
    (name: string, event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setValue(name);
      setIgnoreOutsideClick(true);
      setTimeout(() => setIgnoreOutsideClick(false), 0);
      handleSearchedItems(name);
    },
    []
  );

  const handleClearAll = () => {
    setValue("");
    setIgnoreOutsideClick(true);
    setTimeout(() => setIgnoreOutsideClick(false), 0);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && debouncedValue.trim() !== "") {
      event.stopPropagation();
      router.push(`/search?q=${encodeURIComponent(debouncedValue.trim())}`);
      handleSearchedItems(debouncedValue);
      setIsExpanded(false);
    }
  };

  return (
    <div
      ref={searchContainerRef}
      className={`relative flex w-full flex-col justify-start rounded bg-[#10161d] text-md transition-width duration-[600ms] delay-[100ms] ${
        isExpanded && "flex-grow rounded-b-none"
      }`}
    >
      <div className="h-[38px] py-1 flex items-center justify-center ">
        <Search className="w-5 h-5 m-2 sm:m-4" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onKeyDown={handleEnter}
          type="text"
          placeholder="Pretražite filmove i serije"
          className="border-none bg-transparent m-0 outline-none w-full placeholder:text-[#8c8c8c] text-[#ffff]"
        />
        {value.length > 0 && (
          <X
            className="w-6 h-6 text-[#fff] m-4 cursor-pointer"
            onClick={handleClearAll}
          />
        )}
      </div>
      {isExpanded &&
        (debouncedValue === "" ? (
          <ExpandedInputContent
            recentSearch={recentSearch}
            onHandleClick={handleItemClick}
            setIgnoreOutsideClick={setIgnoreOutsideClick}
          />
        ) : (
          <SearchResponse
            searchResponseData={searchResults}
            value={value}
            loading={loading}
          />
        ))}
    </div>
  );
};

export default SearchInput;
