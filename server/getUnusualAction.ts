import { getIrregularitiesData } from "@/server/getIrregularitiesAction";
import type { Irregularity } from "@/types/irregularities-waze-data";

const sortByDelay = (a: Irregularity, b: Irregularity) => {
  return b.seconds + b.delaySeconds - (a.seconds + a.delaySeconds);
};

export const getIrregularities = async () => {
  const wazeData = await getIrregularitiesData();

  if (!wazeData) throw new Error("No Waze data found");

  return wazeData.irregularities.sort(sortByDelay);
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
  const wazeData = await getIrregularitiesData();

  if (!wazeData) throw new Error("No Waze data found");

  const cities = wazeData.irregularities.map(
    (irregularity) => irregularity.city
  );

  return Array.from(new Set(cities));
}
