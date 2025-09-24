import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/lib/fetchers/cities";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });
}
