"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchInput from "./SearchInput";

const menuOptions: LinkButton[] = [
  {
    id: 0,
    name: "Novo",
    href: "/",
  },
  {
    id: 1,
    name: "Najgledanije",
    href: "/",
  },
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        {menuOptions.map((item) => (
          <Link
            key={item.id}
            href={item.href as string}
            className={`mx-4 hover:text-[#d5d5d5] ${
              isExpanded && "hidden sm:block"
            }`}
          >
            {item.name}
          </Link>
        ))}
        <SearchInput isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </div>
    </div>
  );
};

export default NavigationBar;
