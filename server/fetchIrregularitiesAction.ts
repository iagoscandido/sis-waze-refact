import type { JsonResponseIrregularitiesWazeData } from "@/types/json-response-waze-irregularities";

export async function fetchIrregularitiesWazeData(): Promise<JsonResponseIrregularitiesWazeData> {
  if (!process.env.IRREGULARITIES)
    throw Error(
      "Variavel de ambiente para irregularidades não encontrada ou não definida"
    );
  const url = process.env.IRREGULARITIES;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch Waze irregularities data: ${res.statusText}`
    );
  }

  const data = await res.json();

  if (!data) throw new Error("No Waze irregularities data found");

  return data;
}
