"use client";
import { useQuery } from "@tanstack/react-query";
import { getWazeRoutes } from "@/lib/fetchers/wazeRoutes";

type UseWazeRoutesProps = {
  sort: string;
};

export function useWazeRoutes({ sort }: UseWazeRoutesProps) {
  return useQuery({
    queryKey: ["irregularities", sort],
    queryFn: () => getWazeRoutes({ sort }),
    refetchOnWindowFocus: true,
    refetchInterval: 120 * 1000,
  });
}
