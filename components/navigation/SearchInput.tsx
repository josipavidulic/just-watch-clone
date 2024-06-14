import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface SearchInputProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const trendSearch: LinkButton[] = [
  { id: 0, name: "Presumed Innocent" },
  { id: 1, name: "Mayor of Kingstown" },
  { id: 2, name: "Sweet Tooth: Rogati dječak" },
  { id: 3, name: "Punch" },
  { id: 4, name: "liar" },
  { id: 5, name: "Warm Meet You" },
  { id: 6, name: "Hi Venus" },
  { id: 7, name: "Zmajeva kuća" },
  { id: 8, name: "I Love You" },
  { id: 9, name: "Digitalni ugljik" },
];

const SearchInput = ({ isExpanded, setIsExpanded }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  const handleItemClick = (
    name: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setValue(name);
    event.stopPropagation();
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      ref={searchContainerRef}
      className={`relative flex flex-col w-[474px] justify-start rounded bg-[var(--ion-color-tertiary-shade)] m-2 sm:mr-4 text-md transition-width duration-[600ms] delay-[100ms] ${
        isExpanded && "flex-grow rounded-b-none"
      }`}
    >
      <div className="h-[38px] py-1 flex items-center justify-center">
        <Search className="w-5 h-5 m-4" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Pretražite filmove ili serije"
          className="border-none bg-transparent m-0 outline-none w-full placeholder:text-[#8c8c8c] text-[#ffff] pr-4"
        />
      </div>
      <div
        className={` absolute top-[38px] w-full flex flex-col justify-center p-6 overflow-hidden bg-[var(--ion-color-tertiary-shade)] text-base font-normal leading-5 rounded-b ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        <h5 className="mb-8">Nema posljednjih istraživanja</h5>
        <div className="min-w-full">
          <h5 className="text-[#ffff] mb-4">Pretraživanja u trendu</h5>
          <div className="flex flex-wrap">
            {trendSearch.map((item) => (
              <div
                onClick={(e) => handleItemClick(item.name, e)}
                key={item.id}
                className="rounded-md border-2 border-[#383d47] hover:border-[#5e6b76] whitespace-nowrap overflow-hidden overflow-ellipsis flex justify-center items-center gap-2 mb-3 mr-2 cursor-pointer py-1.5 px-2.5"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm text-[#ffff]">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
