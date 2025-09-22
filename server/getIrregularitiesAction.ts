import type { WazeData } from "@/types/irregularities-waze-data";

export async function getIrregularitiesData(): Promise<WazeData> {
  const url =
    "https://www.waze.com/row-partnerhub-api/partners/11633596527/waze-feeds/e8185b12-350b-47cc-88fd-44b72765d111";

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Waze data: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
