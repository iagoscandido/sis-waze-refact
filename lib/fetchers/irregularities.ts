import type { MappedIrregularities } from "@/utils/mappers/mapIrregularitiesWazeData";

type fetchIrregularitiesParams = {
  sort?: string;
  page?: number;
  limit?: number;
};

const getIrregularities = async (
  { sort = "percentage", page = 1, limit = 20 }: fetchIrregularitiesParams = {
    sort: "percentage",
  }
): Promise<MappedIrregularities[]> => {
  const params = new URLSearchParams();

  if (sort) params.set("sort", sort);
  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());

  const res = await fetch(`/api/irregularities?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
  const json: { data: MappedIrregularities[] } = await res.json();

  return json.data;
};

export { getIrregularities };
