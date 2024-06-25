import { ResponseData } from "@/types/types";
import { kebabCase } from "./kebabCase";

export const handleDetailsPage = (
  card: ResponseData,
  e: React.MouseEvent | KeyboardEvent
): string => {
  e.preventDefault();
  e.stopPropagation();
  const title = (card.original_title as string) ?? card.original_name;
  const media_type =
    card.media_type !== null && card.media_type !== undefined
      ? card.media_type
      : card.original_title
      ? "movie"
      : "tv";

  if (title && card.media_type !== "person") {
    localStorage.setItem(
      "detailsPageId",
      JSON.stringify({ media_type: media_type, id: card.id })
    );
  }
  const url = `/${media_type}/${kebabCase(title)}`;
  return url;
};
