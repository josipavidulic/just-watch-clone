"use client";
import React, { ReactNode, createContext, useState } from "react";

interface ExpandedStateContextType {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

const ExpandedStateContext = createContext<ExpandedStateContextType>({
  isExpanded: false,
  setIsExpanded: () => {},
});

export const ExpandedStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ExpandedStateContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ExpandedStateContext.Provider>
  );
};

export const useExpandedState = () => {
  return React.useContext(ExpandedStateContext);
};
