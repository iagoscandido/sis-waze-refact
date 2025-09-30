import type { MappedRoutes } from "@/utils/mappers/mapRoutesWazeData";

type FetchRoutesParams = {
  sort?: string;
};

const getWazeRoutes = async (
  { sort = "percentage" }: FetchRoutesParams = {
    sort: "percentage",
  }
): Promise<MappedRoutes[]> => {
  const params = new URLSearchParams();

  if (sort) params.set("sort", sort);

  const res = await fetch(`/api/waze-routes?${params.toString()}`, {
    next: { revalidate: 5 },
  });

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);

  const json: { data: MappedRoutes[] } = await res.json();

  return json.data;
};

export { getWazeRoutes };
