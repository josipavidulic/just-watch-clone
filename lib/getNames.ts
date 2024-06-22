export const getNames = (genres: { name: string }[]) => {
  if (!genres) {
    return [];
  }
  return genres.map((genre) => genre.name);
};
