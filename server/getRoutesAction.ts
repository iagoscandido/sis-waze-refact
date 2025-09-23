import { fetchRoutesData } from "@/server/fetchRoutesAction";
import type { Route } from "@/types/routes-waze-data";
import { sortRoutesByReduction } from "@/utils/sort";

export const getRoutes = async (): Promise<Route[]> => {
  const data = await fetchRoutesData();

  if (!data) throw new Error("No Waze data found");

  return data.routes.sort(sortRoutesByReduction);
};
