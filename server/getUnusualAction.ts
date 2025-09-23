import { fetchIrregularitiesData } from "@/server/fetchIrregularitiesAction";
import type { Irregularity } from "@/types/irregularities-waze-data";

const sortByReduction = (a: Irregularity, b: Irregularity) => {
  const calcReduction = (current: number, historic: number): number => {
    if (historic <= 0) return 0;
    const percentage = (current / historic) * 100;
    return 100 - percentage;
  };

  const reductionA = calcReduction(a.speed, a.regularSpeed);
  const reductionB = calcReduction(b.speed, b.regularSpeed);

  return reductionB - reductionA;
};

export const getIrregularities = async () => {
  const wazeData = await fetchIrregularitiesData();

  if (!wazeData || !wazeData.irregularities) return [];

  return wazeData.irregularities.sort(sortByReduction);
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
