"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

const trendSearch = [
  { id: 0, title: "Presumed Innocent" },
  { id: 1, title: "Mayor of Kingstown" },
  { id: 2, title: "Sweet Tooth: Rogati dječak" },
  { id: 3, title: "Punch" },
  { id: 4, title: "liar" },
  { id: 5, title: "Warm Meet You" },
  { id: 6, title: "Hi Venus" },
  { id: 7, title: "Zmajeva kuća" },
  { id: 8, title: "I Love You" },
  { id: 9, title: "Digitalni ugljik" },
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
  }, []);

  const handleItemClick = (
    title: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setValue(title);
    event.stopPropagation();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="lg:h-20 w-full max-w-[1752px] z-50 top-0 flex flex-col lg:flex-row justify-center items-center sticky bg-transparent lg:px-16 lg:pt-4 mx-auto -mb-[106px] lg:-mb-20 font-lato text-sm text-[#8c8c8c]">
      <Link href="/" className="max-lg:p-4 lg:pr-6">
        <Image
          src="/justwatch-logo.svg"
          alt="logo"
          width={234}
          height={71}
          className="w-[131px] h-[20px] lg:w-[234px] lg:h-[71px]"
        />
      </Link>
      <div className="flex justify-center lg:justify-end w-full items-center overflow-visible">
        <Link
          href="/"
          className={`mx-4 hover:text-[#d5d5d5] ${
            isExpanded && "hidden sm:block"
          }`}
        >
          Novo
        </Link>
        <Link
          href="/"
          className={`mx-4 hover:text-[#d5d5d5] ${
            isExpanded && "hidden sm:block"
          }`}
        >
          Najgledanije
        </Link>
        <div
          onClick={toggleExpand}
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
                    onClick={(e) => handleItemClick(item.title, e)}
                    key={item.id}
                    className="rounded-md border-2 border-[#383d47] hover:border-[#5e6b76] whitespace-nowrap overflow-hidden overflow-ellipsis flex justify-center items-center gap-2 mb-3 mr-2 cursor-pointer py-1.5 px-2.5"
                  >
                    <Search className="w-4 h-4" />
                    <span className="text-sm text-[#ffff]">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
