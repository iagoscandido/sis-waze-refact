"use client";
import { useQuery } from "@tanstack/react-query";
import { getIrregularities } from "@/lib/fetchers/irregularities";

type UseIrregularitiesProps = {
  sort: string;
  page: number;
  limit: number;
};

export function useIrregularities({
  sort,
  page,
  limit,
}: UseIrregularitiesProps) {
  return useQuery({
    queryKey: ["irregularities", sort, page, limit],
    queryFn: () => getIrregularities({ sort, page, limit }),
    refetchOnWindowFocus: true,
    refetchInterval: 120 * 1000,
  });
}
