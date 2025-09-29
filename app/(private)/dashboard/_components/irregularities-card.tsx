"use client";

import Loading from "@/app/loading";
import { MapButtonProps } from "@/components/map-button";
import { Badge } from "@/components/ui/badge";
import WazeCard from "@/components/waze-card/waze-card";
import { getSeverityDescription } from "@/components/waze-card/waze-card.config";
import { useIrregularities } from "@/hooks/useIrregularities";
import { formatData } from "@/utils/time";

export default function IrregularitiesCard({
  sort,
  page,
  limit,
}: {
  sort: string;
  page: number;
  limit: number;
}) {
  const {
    data: irregularities,
    isPending,
    dataUpdatedAt,
    isError,
  } = useIrregularities({
    sort,
    page,
    limit,
  });

  if (isPending) return <Loading />;

  if (isError) return <p>Erro ao carregar irregularidades</p>;

  if (!irregularities)
    return <p>Nenhuma irregularidade encontrada no momento.</p>;
  return (
    <div className="gap-2">
      <div className="flex items-center justify-center">
        <Badge variant={"secondary"} appearance={"ghost"}>
          atualização: {formatData(dataUpdatedAt)}
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-2 justify-center">
        {irregularities
          .filter((i) => i.city === "Rio de Janeiro")
          .map((i) => (
            <WazeCard
              key={i.id}
              title={i.street}
              trend={i.trend}
              current={i.CurrentSpeed}
              historic={i.historicSpeed}
              metrics={[
                {
                  id: "traffic-desc",
                  label: "Tráfego",
                  value: `${getSeverityDescription(i.severity)}`,
                },
                {
                  id: "cause",
                  label: "Motivo",
                  value: i.cause,
                  group: "cause",
                },

                {
                  id: "cause_subtype",
                  label: "Subtipo",
                  value: i.subCause,
                  group: "cause",
                },
                // {
                //   id: "start-node",
                //   label: "Inicio",
                //   value: i.startNode ?? "",
                //   group: "route-node",
                // },
                // {
                //   id: "end-node",
                //   label: "Fim",
                //   value: i.endNode ?? "",
                //   group: "route-node",
                // },
                {
                  id: "current-speed",
                  label: "Velocidade atual",
                  value: `${(i.CurrentSpeed).toFixed(2)} km/h`,
                  group: "speed",
                },
                {
                  id: "regular-speed",
                  label: "Velocidade histórica",
                  value: `${(i.historicSpeed).toFixed(2)} km/h`,
                  group: "speed",
                },
                {
                  id: "current-time",
                  label: "Tempo atual",
                  value: `${(i.currentTimeSeconds / 60).toFixed(0)} min`,
                  group: "time",
                },
                {
                  id: "delay-time",
                  label: "Tempo Histórico",
                  value: `${((i.currentTimeSeconds - i.delayTimeSeconds) / 60).toFixed(0)} min`,
                  group: "time",
                },
                {
                  id: "lentgh",
                  label: "Extensão",
                  value: `${(i.length * 0.001).toFixed(3)} km`,
                },
              ]}
              action={
                <MapButtonProps
                  fromLat={i.coordinates[0].lat}
                  fromLon={i.coordinates[0].lng}
                  toLat={i.coordinates[i.coordinates.length - 1].lat}
                  toLon={i.coordinates[i.coordinates.length - 1].lng}
                />
              }
            />
          ))}
      </div>
    </div>
  );
}
