"use server";

export async function getData<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
}
