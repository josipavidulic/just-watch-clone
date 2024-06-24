import { movieGenres } from "./responses";

export const getCroatianGenres = (genres: { id: number; name: string }[]) => {
  if (!genres || genres.length === 0) {
    return [];
  }

  const croatianGenres: string[] = genres.map((genre) => {
    const croatianGenre = movieGenres.find(
      (movieGenre) => movieGenre.id === genre.id
    );
    return croatianGenre ? croatianGenre.name : genre.name;
  });

  return croatianGenres;
};
