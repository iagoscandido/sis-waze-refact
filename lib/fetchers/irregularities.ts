import type { MappedIrregularities } from "@/utils/mappers/mapIrregularitiesWazeData";

const getIrregularities = async (): Promise<MappedIrregularities[]> => {
  const res = await fetch("/api/irregularities");
  const json: { data: MappedIrregularities[] } = await res.json();

  return json.data;
};

export { getIrregularities };
