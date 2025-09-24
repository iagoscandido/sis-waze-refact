import type { IrregularitiesWazeData } from "@/types/irregularities-waze-data";

export async function fetchIrregularitiesWazeData(): Promise<IrregularitiesWazeData> {
  if (!process.env.IRREGULARITIES)
    throw Error(
      "varialbe de ambiente para rotas não encontrada ou não definida"
    );
  const url = process.env.IRREGULARITIES;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Waze data: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
