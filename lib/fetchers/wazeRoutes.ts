import type { MappedRoutes } from "@/utils/mappers/mapRoutesWazeData";

const getWazeRoutes = async (): Promise<MappedRoutes[]> => {
  const res = await fetch("/api/waze-routes");
  const json: { data: MappedRoutes[] } = await res.json();

  return json.data;
};

export { getWazeRoutes };
