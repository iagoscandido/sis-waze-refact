import { Suspense, use } from "react";
import { MapButtonProps } from "@/components/map-button";
import WazeCard from "@/components/waze-card/waze-card";
import { getSeverityDescription } from "@/components/waze-card/waze-card.config";
import { getIrregularitiesByCity } from "@/server/getUnusualAction";
import { AlertSubTypeInfo } from "@/utils/mappers/alert-sub-type-info";
import { AlertTypeInfo } from "@/utils/mappers/alert-type-info";

export default async function Citypage({
  params,
}: {
  params: { city: string };
}) {
  const city = decodeURIComponent(params.city);

  const irregularities = use(getIrregularitiesByCity(city)) ?? [];

  console.log("city: ", city);
  console.log("irregularities: ", irregularities);

  if (!irregularities || irregularities.length === 0)
    return (
      <p className="text-center text-xl font-bold">
        Nenhuma irregularidade encontrada para {city} no momento.
      </p>
    );

  return (
    <div>
      <h1>Irregularities in {city}</h1>

      <div>
        {irregularities
          .filter((i) => i.city === city && i.line?.length > 0)
          .map((i) => (
            <Suspense key={i.id} fallback={<p>Carregando Card...</p>}>
              <WazeCard
                title={i.street}
                trend={i.trend}
                current={i.seconds}
                historic={i.delaySeconds + i.seconds}
                type="irregularity"
                metrics={[
                  {
                    id: "traffic-desc",
                    label: "Tráfego",
                    value: `${getSeverityDescription(i.severity)}`,
                  },
                  {
                    id: "cause",
                    label: "Motivo",
                    value: i.causeAlert
                      ? AlertTypeInfo[
                          i.causeAlert.type as keyof typeof AlertTypeInfo
                        ].label
                      : "",
                    group: "cause",
                  },

                  {
                    id: "cause_subtype",
                    label: "Subtipo",
                    value: i.causeAlert?.subType
                      ? AlertSubTypeInfo[
                          i.causeAlert.subType as keyof typeof AlertSubTypeInfo
                        ].label
                      : "",
                    group: "cause",
                  },
                  {
                    id: "current-speed",
                    label: "Velocidade atual",
                    value: `${(i.speed).toFixed(0)} km/h`,
                    group: "speed",
                  },
                  {
                    id: "regular-speed",
                    label: "Velocidade histórica",
                    value: `${(i.regularSpeed).toFixed(0)} km/h`,
                    group: "speed",
                  },
                  {
                    id: "current-time",
                    label: "Tempo atual",
                    value: `${(i.seconds / 60).toFixed(0)} min`,
                    group: "time",
                  },
                  {
                    id: "delay-time",
                    label: "Atraso",
                    value: `${((i.delaySeconds + i.seconds) / 60).toFixed(0)} min`,
                    group: "time",
                  },
                  {
                    id: "distance",
                    label: "Distância",
                    value: `${(i.length * 0.001).toFixed(3)} km`,
                  },
                ]}
                action={
                  <MapButtonProps
                    fromLat={i.line[0].y}
                    fromLon={i.line[0]?.x}
                    toLat={i.line[i.line.length - 1].y}
                    toLon={i.line[i.line.length - 1].x}
                  />
                }
              />
            </Suspense>
          ))}
      </div>
    </div>
  );
}
