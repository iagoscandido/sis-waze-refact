"use client";
import { useQuery } from "@tanstack/react-query";
import { getWazeRoutes } from "@/lib/fetchers/wazeRoutes";

type UseWazeRoutesProps = {
  sort: string;
  page: number;
  limit: number;
};

export function useWazeRoutes({ sort, page, limit }: UseWazeRoutesProps) {
  return useQuery({
    queryKey: ["irregularities", sort, page, limit],
    queryFn: () => getWazeRoutes({ sort, page, limit }),
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
  });
}
