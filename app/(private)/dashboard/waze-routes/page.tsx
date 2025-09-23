import { MapButton } from "@/components/map-button";
import WazeCard from "@/components/waze-card/waze-card";
import { getRoutes } from "@/server/getRoutesAction";

const routes = (await getRoutes()) ?? [];

const Page = () => {
  if (!routes || routes.length === 0)
    return (
      <p className="text-center text-xl font-bold">
        Nenhuma rota encontrada no momento.
      </p>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-2 justify-center">
      {routes.map((r) => (
        <WazeCard
          key={r.id}
          current={r.time}
          historic={r.historicTime}
          title={r.name}
          metrics={[
            {
              id: "current-time",
              label: "Tempo atual",
              value: `${(r.time / 60).toFixed(0)} min`,
              group: "time",
            },
            {
              id: "historic-time",
              label: "Tempo histórico",
              value: `${(r.historicTime / 60).toFixed(0)} min`,
              group: "time",
            },
            { id: "length", label: "Extensão", value: `${r.length / 1000} km` },
          ]}
          action={
            <MapButton
              fromLat={r.bbox.minY}
              fromLon={r.bbox.minX}
              toLat={r.bbox.maxY}
              toLon={r.bbox.maxX}
            />
          }
        />
      ))}
    </div>
  );
};

export default Page;
