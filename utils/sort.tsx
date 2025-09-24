import type { JsonResponseIrregularity } from "@/types/json-response-waze-irregularities";
import type { JsonResponseRoute } from "@/types/json-response-waze-routes";
import { calcReduction } from "@/utils/calcs";

export const sortIrregularitiesByReduction = (
  a: JsonResponseIrregularity,
  b: JsonResponseIrregularity,
) => {
  const reductionA = calcReduction(a.speed, a.regularSpeed);
  const reductionB = calcReduction(b.speed, b.regularSpeed);

  return reductionB - reductionA;
};

export const sortRoutesByReduction = (
  a: JsonResponseRoute,
  b: JsonResponseRoute,
) => {
  const reductionA = calcReduction(a.time, a.historicTime);
  const reductionB = calcReduction(b.time, b.historicTime);

  return reductionA - reductionB;
};
