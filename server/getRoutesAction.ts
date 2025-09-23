import { fetchRoutesData } from "@/server/fetchRoutesAction";
import type { Route } from "@/types/routes-waze-data";

const sortByReduction = (a: Route, b: Route) => {
  const calcReduction = (current: number, historic: number): number => {
    if (historic <= 0) return 0;
    const percentage = (current / historic) * 100;
    return 100 - percentage;
  };

  const reductionA = calcReduction(a.time, a.historicTime);
  const reductionB = calcReduction(b.time, b.historicTime);

  return reductionB - reductionA;
};

export const getRoutes = async (): Promise<Route[]> => {
  const data = await fetchRoutesData();

  if (!data) throw new Error("No Waze data found");

  return data.routes.sort(sortByReduction);
};
