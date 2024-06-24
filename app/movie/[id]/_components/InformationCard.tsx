import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface InformationCardprops {
  title: string;
  content: string | React.ReactNode;
  className?: string;
  hasIcon?: boolean;
}

const InformationCard = ({
  title,
  content,
  hasIcon,
  className,
}: InformationCardprops) => {
  return (
    <div className={cn("flex flex-col gap-2 items-start ", className)}>
      <h3 className="font-bold uppercase text-base text-[#6a7c8f]">{title}</h3>
      <div className="text-[#b9bdcc]  flex items-center gap-2 text-wrap">
        {hasIcon && (
          <Image
            src="/imdb-logo.jpg"
            alt="imdb-logo"
            width={16}
            height={16}
            className="rounded-sm"
          />
        )}
        {content}
      </div>
    </div>
  );
};

export default InformationCard;
