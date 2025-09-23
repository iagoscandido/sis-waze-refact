import { fetchIrregularitiesData } from "@/server/fetchIrregularitiesAction";
import type { Irregularity } from "@/types/irregularities-waze-data";
import { sortIrregularitiesByReduction } from "@/utils/sort";

export const getIrregularities = async () => {
  const wazeData = await fetchIrregularitiesData();

  if (!wazeData || !wazeData.irregularities) return [];

  return wazeData.irregularities.sort(sortIrregularitiesByReduction);
};

export async function getIrregularitiesByCity(
  city: string
): Promise<Irregularity[] | null> {
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

export async function getCities(): Promise<string[]> {
  const data = await fetchIrregularitiesData();

  if (!data || !data.irregularities) return [];

  const cities = data.irregularities.map((irregularity) => irregularity.city);

  return Array.from(new Set(cities));
}
