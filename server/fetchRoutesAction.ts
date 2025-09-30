import type { JsonResponseRoutesWazeData } from "@/types/json-response-waze-routes";

export async function fetchRoutesData(): Promise<JsonResponseRoutesWazeData> {
  if (!process.env.ROUTES)
    throw Error(
      "Variavel de ambiente para rotas não encontrada ou não definida"
    );
  const url = process.env.ROUTES;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Waze routes data: ${res.statusText}`);
  }

  const data = await res.json();

  if (!data) throw new Error("No Waze rotues data found");

  return data;
}
