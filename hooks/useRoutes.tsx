"use client";
import { useQuery } from "@tanstack/react-query";

import { getWazeRoutes } from "@/lib/fetchers/wazeRoutes";

export function useWazeRoutes() {
  return useQuery({
    queryKey: ["irregularities"],
    queryFn: getWazeRoutes,
  });
}
