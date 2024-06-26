import { ResponseData } from "@/types/types";

export async function fetchFilteredData(url: string): Promise<ResponseData[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
}
