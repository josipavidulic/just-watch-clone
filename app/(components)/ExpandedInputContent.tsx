import { ResponseData } from "@/types/types";
import { Search } from "lucide-react";
import React from "react";

interface ExpandedInputProps {
  isExpanded: boolean;
  onHandleClick: (title: string, e: React.MouseEvent<HTMLDivElement>) => void;
  recentSearch: ResponseData[];
}

const ExpandedInputContent = ({
  isExpanded,
  onHandleClick,
  recentSearch,
}: ExpandedInputProps) => {
  return (
    <div
      className={`absolute top-[38px] w-full flex flex-col justify-center p-6 overflow-hidden bg-[#10161d] text-base font-normal leading-5 rounded-b ${
        isExpanded ? "block" : "hidden"
      }`}
    >
      <h5 className="mb-8">Nema posljednjih istraživanja</h5>
      <div className="min-w-full">
        <h5 className="text-[#ffff] mb-4">Pretraživanja u trendu</h5>
        <div className="flex flex-wrap">
          {recentSearch.slice(0, 6).map((item) => (
            <div
              onClick={(e) =>
                onHandleClick((item.title as string) ?? item.name, e)
              }
              key={item.id}
              className="rounded-md border-2 border-[#383d47] hover:border-[#5e6b76] whitespace-nowrap overflow-hidden overflow-ellipsis flex justify-center items-center gap-2 mb-3 mr-2 cursor-pointer py-1.5 px-2.5"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm text-[#ffff]">
                {item.title ?? item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedInputContent;
