import { fetchRoutesData } from "@/server/fetchRoutesAction";
import type { JsonResponseRoute } from "@/types/json-response-waze-routes";
import { sortRoutesByReduction } from "@/utils/sort";

export const getRoutes = async (): Promise<JsonResponseRoute[]> => {
  const data = await fetchRoutesData();

  if (!data) throw new Error("No Waze data found");

  return data.routes.sort(sortRoutesByReduction);
};
