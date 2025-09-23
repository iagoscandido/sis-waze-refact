import { Suspense, use } from "react";
import { MapButton } from "@/components/map-button";
import WazeCard from "@/components/waze-card/waze-card";
import { getSeverityDescription } from "@/components/waze-card/waze-card.config";
import { getIrregularities } from "@/server/getUnusualAction";
import { AlertSubTypeInfo } from "@/utils/mappers/alert-sub-type-info";
import { AlertTypeInfo } from "@/utils/mappers/alert-type-info";

const DashboardPage = () => {
  const irregularities = use(getIrregularities());

  if (irregularities.length === 0)
    return (
      <p className="text-center text-xl font-bold">
        Nenhuma irregularidade encontrada no momento.
      </p>
    );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-2 justify-center">
        <Suspense fallback={<p>Carregando...</p>}>
          {irregularities
            .filter((i) => i.city === "Rio de Janeiro")
            .map((i) => (
              <Suspense key={i.id} fallback={<p>Carregando Card...</p>}>
                <WazeCard
                  title={i.street}
                  trend={i.trend}
                  current={i.speed}
                  historic={i.regularSpeed}
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
                            i.causeAlert
                              .subType as keyof typeof AlertSubTypeInfo
                          ].label
                        : "",
                      group: "cause",
                    },
                    {
                      id: "start-node",
                      label: "Inicio",
                      value: `${i.startNode}`,
                      group: "route-node",
                    },
                    {
                      id: "end-node",
                      label: "Fim",
                      value: `${i.endNode}`,
                      group: "route-node",
                    },
                    {
                      id: "current-speed",
                      label: "Velocidade atual",
                      value: `${(i.speed).toFixed(2)} km/h`,
                      group: "speed",
                    },
                    {
                      id: "regular-speed",
                      label: "Velocidade histórica",
                      value: `${(i.regularSpeed).toFixed(2)} km/h`,
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
                      label: "Tempo Histórico",
                      value: `${((i.seconds - i.delaySeconds) / 60).toFixed(0)} min`,
                      group: "time",
                    },
                    {
                      id: "lentgh",
                      label: "Extensão",
                      value: `${(i.length * 0.001).toFixed(3)} km`,
                    },
                  ]}
                  action={
                    <MapButton
                      fromLat={i.line[0].y}
                      fromLon={i.line[0]?.x}
                      toLat={i.line[i.line.length - 1].y}
                      toLon={i.line[i.line.length - 1].x}
                    />
                  }
                />
              </Suspense>
            ))}
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardPage;
