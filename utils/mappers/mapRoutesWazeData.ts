// Classe utilitaria para mapear o json recebido do waze e assim reduzir o payload,
// alénm de implementar alguns atributos utilitários
import type { Route, RoutesWazeData } from "@/types/routes-waze-data";
import { calculateTimePercentage } from "../calcs";

interface MappedRoutes {
  id: string;

  name: string;
  jamLevel: number;
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
};

export const mapRoutesWazeData = (
  data: RoutesWazeData
): MappedRoutesWazeData => {
  const routes = data.routes
    .map(mapRoutes)
    .sort((a, b) => b.reductionPercentage - a.reductionPercentage);

  return {
    routes,
  };
};

const mapRoutes = (route: Route) => {
  const reduction = calculateTimePercentage(route.time, route.historicTime);

  return {
    id: route.id,
    name: route.name,

    bbox: route.bbox,

    jamLevel: route.jamLevel,
    alternativeRoute: route.alternateRoute?.name,

    historicTime: route.historicTime,
    time: route.time,

    reductionPercentage: reduction,
  };
};
