import { useExpandedState } from "@/context/ExpandendStateContext";
import { ResponseData } from "@/types/types";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface ExpandedInputProps {
  onHandleClick: (title: string, e: React.MouseEvent<HTMLDivElement>) => void;
  setIgnoreOutsideClick: (ignoreClick: boolean) => void;
  recentSearch: ResponseData[];
}

const ExpandedInputContent = ({
  onHandleClick,
  setIgnoreOutsideClick,
  recentSearch,
}: ExpandedInputProps) => {
  const { isExpanded } = useExpandedState();
  const storedItems = localStorage.getItem("searchedItems");
  const defaultRecentSearch = recentSearch.map(
    (item) => (item.title as string) ?? item.name
  );
  const [searchedItems, setSearchedItems] = useState<string[]>(() => {
    return storedItems ? JSON.parse(storedItems) : defaultRecentSearch;
  });

  const handleClearAll = () => {
    localStorage.removeItem("searchedItems");
    setSearchedItems(defaultRecentSearch);
    setIgnoreOutsideClick(true);
    setTimeout(() => setIgnoreOutsideClick(false), 0);
  };
  return (
    <div
      className={`absolute top-[38px] w-full flex flex-col justify-center p-6 overflow-hidden bg-[#10161d] text-base font-normal leading-5 rounded-b ${
        isExpanded ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <h5>
          {storedItems && storedItems?.length > 0
            ? "Nedavna pretraživanja"
            : "Nema posljednjih istraživanja"}
        </h5>
        {storedItems !== null && (
          <button
            className="bg'transparent text-[#78a6b8] text-base font-normal hover:text-[#d9e8ed]"
            onClick={handleClearAll}
          >
            Izbriši sve
          </button>
        )}
      </div>

      <div className="min-w-full">
        {!storedItems && (
          <h5 className="text-[#ffff] mb-4">Pretraživanja u trendu</h5>
        )}
        <div className="flex flex-wrap">
          {searchedItems.slice(0, 6).map((item, index) => (
            <div
              onClick={(e) => onHandleClick(item, e)}
              key={index}
              className="rounded-md border-2 border-[#383d47] hover:border-[#5e6b76] whitespace-nowrap overflow-hidden overflow-ellipsis flex justify-center items-center gap-2 mb-3 mr-2 cursor-pointer py-1.5 px-2.5"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm text-[#ffff]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedInputContent;
