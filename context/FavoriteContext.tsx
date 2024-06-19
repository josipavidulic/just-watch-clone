"use client";
import {
  addFavoriteId,
  getFavoriteIds,
  removeFavoriteId,
} from "@/lib/localStorageUtils";
import { createContext, useContext, useEffect, useState } from "react";

interface FavoriteContextProps {
  favoriteIds: number[];
  addFavoriteId: (id: number) => void;
  removeFavoriteId: (id: number) => void;
}

export const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const storedFavoriteIds = getFavoriteIds();
    setFavoriteIds(storedFavoriteIds);
  }, []);
  const handleAddFavoriteIds = (id: number) => {
    if (!favoriteIds.includes(id)) {
      addFavoriteId(id);
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  const handleRemoveFavoriteId = (id: number) => {
    if (favoriteIds.includes(id)) {
      removeFavoriteId(id);
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
    }
  };

  const contextValue: FavoriteContextProps = {
    favoriteIds,
    addFavoriteId: handleAddFavoriteIds,
    removeFavoriteId: handleRemoveFavoriteId,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
