// Classe utilitaria para mapear o json recebido do waze e assim reduzir o payload,
// alénm de implementar alguns atributos utilitários
import type {
  JsonResponseRoute,
  JsonResponseRoutesWazeData,
} from "@/types/json-response-waze-routes";
import { calculateTimePercentage } from "../calcs";

export interface MappedRoutes {
  id: string;

  name: string;

  jamLevel: number;

  length: number;
  bbox: {
    minY: number;
    minX: number;
    maxY: number;
    maxX: number;
  };
  alternativeRoute?: string;
  historicTime: number;
  time: number;
  reductionPercentage: number;
}

export type MappedRoutesWazeData = {
  routes: MappedRoutes[];
  updateTime: number;
};

export const mapRoutesWazeData = (
  data: JsonResponseRoutesWazeData
): MappedRoutesWazeData => {
  const routes = data.routes
    .map(mapRoutes)
    .sort((a, b) => b.reductionPercentage - a.reductionPercentage);

  const updateTime = data.updateTime;

  return {
    routes,
    updateTime,
  };
};

const mapRoutes = (route: JsonResponseRoute): MappedRoutes => {
  const reduction = calculateTimePercentage(route.time, route.historicTime);

  return {
    id: route.id,
    name: route.name,

    bbox: route.bbox,
    length: route.length,
    jamLevel: route.jamLevel,
    alternativeRoute: route.alternateRoute?.name,

    historicTime: route.historicTime,
    time: route.time,

    reductionPercentage: reduction,
  };
};
