import { fetchIrregularitiesWazeData } from "@/server/fetchIrregularitiesAction";
import type { JsonResponseIrregularity } from "@/types/json-response-waze-irregularities";
import { sortIrregularitiesByReduction } from "@/utils/sort";

export const getIrregularities = async () => {
  const wazeData = await fetchIrregularitiesWazeData();

  if (!wazeData || !wazeData.irregularities) return [];

  return wazeData.irregularities.sort(sortIrregularitiesByReduction);
};

export async function getIrregularitiesByCity(
  city: string
): Promise<JsonResponseIrregularity[] | null> {
  if (!city) {
    console.error("City is required for filtering.");
    return null;
  }

  const irregularities = await getIrregularities();

  if (!irregularities) {
    console.error("No Irregularities found");
    return null;
  }

  const filteredIrregularities = irregularities.filter(
    (irregularity) => irregularity.city === city
  );

  return filteredIrregularities;
}
