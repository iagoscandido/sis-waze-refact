"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getIrregularities } from "@/lib/fetchers/irregularities";

export function useIrregularities() {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") ?? "percentage";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);
  return useQuery({
    queryKey: ["irregularities", sort, page, limit],
    queryFn: () => getIrregularities({ sort, page, limit }),
    refetchOnWindowFocus: true,
  });
}
