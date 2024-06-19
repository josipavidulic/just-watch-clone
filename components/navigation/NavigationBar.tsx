"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { LinkButton } from "@/types/types";
import { Bookmark, Menu, UserRoundCog } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuOptions: LinkButton[] = [
  { id: 0, name: "Početna", href: "/" },
  { id: 1, name: "Novo", href: "/" },
  { id: 2, name: "Najgledanije", href: "/" },
  { id: 3, name: "Liste", href: "/" },
];

const NavigationBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // const navigationBarOptions = isHomePage
  //   ? menuOptions.slice(1, 3)
  //   : menuOptions;

  return (
    <nav
      className={cn(
        "w-full z-50 top-0 sticky mx-auto",
        isHomePage
          ? "lg:h-20 bg-transparent px-4 sm:px-6 xl:px-16 lg:pt-4 -mb-[114px] lg:-mb-20"
          : "bg-[#060d17] px-4 py-2 lg:px-16 lg:py-3"
      )}
    >
      <div
        className={cn(
          `flex flex-col lg:flex-row items-center justify-between font-lato text-sm text-[#8c8c8c]`,
          isHomePage && "max-w-[1752px]"
        )}
      >
        <div className="max-lg:w-full flex items-center justify-between lg:px-3">
          <Menu className="block lg:hidden" />
          <Link href="/" className="max-lg:p-5 lg:pr-6 flex-shrink-0">
            <Image
              src="/justwatch-logo.svg"
              alt="logo"
              width={234}
              height={71}
              className={`${
                isHomePage
                  ? "w-[131px] h-[20px] lg:w-[210px] lg:h-[60px] xl:w-[234px] xl:h-[71px]"
                  : "w-[131px] h-[20px]"
              }`}
            />
          </Link>
          <div className="flex gap-3 items-center">
            {!isHomePage && (
              <Bookmark className="fill-[#8c8c8c] block lg:hidden" />
            )}
            <UserRoundCog className="block lg:hidden" />
          </div>
        </div>
        <div
          className={`flex items-center overflow-visible gap-4 lg:px-3 ${
            !isHomePage && "w-full"
          }`}
        >
          <div
            className={cn(
              "hide-first-last-small-screens flex gap-4",
              isHomePage && "hide-first-last"
            )}
          >
            {menuOptions.map((item) => (
              <Link
                key={item.id}
                href={item.href as string}
                className={`hover:text-[#d5d5d5] ${
                  isExpanded && "hidden sm:block"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <SearchInput
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            isHomePage={isHomePage}
          />
          <button className="hidden lg:flex items-center justify-center text-[#fff] text-sm bg-[#1c252f] rounded-md py-3 px-6 hover:bg-[#383d47] h-[35px]">
            Prijava
          </button>
          <Menu className={`${isHomePage ? "hidden" : "hidden lg:block"}`} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
