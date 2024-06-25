import { movieGenres, tvGenres } from "./responses";

export const getCroatianGenres = (
  genres: { id: number; name: string }[],
  media_type: string
) => {
  if (!genres || genres.length === 0) {
    return [];
  }

  const genresType = media_type === "tv" ? tvGenres : movieGenres;

  const croatianGenres: string[] = genres.map((genre) => {
    const croatianGenre = genresType.find((item) => item.id === genre.id);
    return croatianGenre ? croatianGenre.name : genre.name;
  });

  return croatianGenres;
};
