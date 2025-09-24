import type { Irregularity } from "@/types/irregularities-waze-data";
import type { Route } from "@/types/routes-waze-data";
import { calcReduction } from "@/utils/calcs";

export const sortIrregularitiesByReduction = (
  a: Irregularity,
  b: Irregularity,
) => {
  const reductionA = calcReduction(a.speed, a.regularSpeed);
  const reductionB = calcReduction(b.speed, b.regularSpeed);

  return reductionB - reductionA;
};

export const sortRoutesByReduction = (a: Route, b: Route) => {
  const reductionA = calcReduction(a.time, a.historicTime);
  const reductionB = calcReduction(b.time, b.historicTime);

  return reductionA - reductionB;
};
