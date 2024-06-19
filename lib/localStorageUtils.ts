const STORAGE_KEY = "favoriteIds";

export const getFavoriteIds = (): number[] => {
  try {
    const favoriteIdsString = localStorage.getItem(STORAGE_KEY);
    if (favoriteIdsString) {
      return JSON.parse(favoriteIdsString);
    }
    return [];
  } catch (error) {
    console.error("Error retrieving favorite IDs from localStorage:", error);
    return [];
  }
};

export const addFavoriteId = (id: number) => {
  try {
    const favoriteIds = getFavoriteIds();
    if (!favoriteIds.includes(id)) {
      favoriteIds.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
    }
  } catch (error) {
    console.error("Error adding favorite ID to localStorage:", error);
  }
};

export const removeFavoriteId = (id: number) => {
  try {
    const favoriteIds = getFavoriteIds();
    const updatedFavoriteIds = favoriteIds.filter((favId) => favId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavoriteIds));
  } catch (error) {
    console.error("Error removing favorite ID from localStorage:", error);
  }
};
