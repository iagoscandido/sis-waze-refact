import type { MappedIrregularities } from "@/utils/mappers/mapIrregularitiesWazeData";

type fetchIrregularitiesParams = {
  sort?: string;
  city?: string;
};

const getIrregularities = async (
  {
    sort = "percentage",
    city = "Rio de Janeiro",
  }: fetchIrregularitiesParams = {
    sort: "percentage",
    city: "Rio de Janeiro",
  }
): Promise<MappedIrregularities[]> => {
  const params = new URLSearchParams();

  if (sort) params.set("sort", sort);
  if (city) params.set("city", city);

  const res = await fetch(`/api/irregularities?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.statusText}`);
  const json: { data: MappedIrregularities[] } = await res.json();

  return json.data;
};

export { getIrregularities };
