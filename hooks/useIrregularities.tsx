"use client";
import { useQuery } from "@tanstack/react-query";

import { getIrregularities } from "@/lib/fetchers/irregularities";

export function useIrregularities() {
  return useQuery({
    queryKey: ["irregularities"],
    queryFn: getIrregularities,
  });
}
