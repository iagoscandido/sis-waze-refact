import type { RoutesWazeData } from "@/types/routes-waze-data";

export async function fetchRoutesData(): Promise<RoutesWazeData> {
  if (!process.env.ROUTES)
    throw Error(
      "varialbe de ambiente para rotas não encontrada ou não definida"
    );
  const url = process.env.ROUTES;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Waze data: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
