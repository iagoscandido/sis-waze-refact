"use client";
import { useQuery } from "@tanstack/react-query";
import { getIrregularities } from "@/lib/fetchers/irregularities";

type UseIrregularitiesProps = {
  sort: string;

  city: string;
};

export function useIrregularities({
  sort,

  city,
}: UseIrregularitiesProps) {
  return useQuery({
    queryKey: ["irregularities", sort, city],
    queryFn: () => getIrregularities({ sort, city }),
    refetchOnWindowFocus: true,
    refetchInterval: 120 * 1000,
  });
}
