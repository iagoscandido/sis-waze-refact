import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { getIrregularities } from "@/server/getUnusualAction";
import IrregularitiesCard from "./_components/irregularities-card";

const IrregularitiesPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["irregularities"],
    queryFn: getIrregularities,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IrregularitiesCard />
    </HydrationBoundary>
  );
};

export default IrregularitiesPage;
