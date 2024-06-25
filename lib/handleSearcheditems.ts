export const handleSearchedItems = (value: string) => {
  const existingSearchedItems: string[] = JSON.parse(
    localStorage.getItem("searchedItems") || "[]"
  );

  if (existingSearchedItems.some((item) => item === value.toLowerCase())) {
    return;
  }

  existingSearchedItems.push(value.toLowerCase());
  localStorage.setItem("searchedItems", JSON.stringify(existingSearchedItems));
};
