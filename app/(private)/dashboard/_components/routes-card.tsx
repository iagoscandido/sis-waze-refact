"use client";

import { MapButtonProps } from "@/components/map-button";
import { Badge } from "@/components/ui/badge";
import WazeCard from "@/components/waze-card/waze-card";
import { getSeverityDescription } from "@/components/waze-card/waze-card.config";
import { useWazeRoutes } from "@/hooks/useWazeRoutes";
import { formatData } from "@/utils/time";

export default function RoutesCard({
  sort,
  page,
  limit,
}: {
  sort: string;
  page: number;
  limit: number;
}) {
  const {
    data: routes,
    isLoading,
    dataUpdatedAt,
  } = useWazeRoutes({ sort, page, limit });
  if (isLoading) return <p>Carregando...</p>;

  if (!routes || routes.length === 0)
    return (
      <p className="text-center text-xl font-bold">
        Nenhuma rota encontrada no momento.
      </p>
    );

  return (
    <div>
      <div className="flex items-center justify-center">
        <Badge variant={"secondary"} appearance={"ghost"}>
          atualização: {formatData(dataUpdatedAt)}
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-2 justify-center">
        {routes.map((r) => (
          <WazeCard
            key={r.id}
            title={r.name}
            current={r.time}
            historic={r.historicTime}
            type="route"
            metrics={[
              {
                id: "traffic-desc",
                label: "Tráfego",
                value: `${getSeverityDescription(r.jamLevel)}`,
              },
              {
                id: "current-time",
                label: "Tempo atual",
                value: `${(r.time / 60).toFixed(0)} min`,
                group: "time",
              },
              {
                id: "delay-time",
                label: "Tempo Histórico",
                value: `${(r.historicTime / 60).toFixed(0)} min`,
                group: "time",
              },
              {
                id: "lentgh",
                label: "Extensão",
                value: `${(r.length * 0.001).toFixed(3)} km`,
              },
              {
                id: "alternative-route",
                label: "Rota Alternativa",
                value: r.alternativeRoute,
              },
            ]}
            action={
              <MapButtonProps
                fromLat={r.bbox.minY}
                fromLon={r.bbox.minX}
                toLat={r.bbox.maxY}
                toLon={r.bbox.maxX}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
