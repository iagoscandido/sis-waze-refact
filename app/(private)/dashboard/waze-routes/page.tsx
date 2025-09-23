import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getRoutes } from "@/server/getRoutesAction";
import RoutesCard from "../_components/routes-card";

const RoutesPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoutesCard />
    </HydrationBoundary>
  );
};

export default RoutesPage;
