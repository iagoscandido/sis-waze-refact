import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
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
      <Suspense fallback={<p>Carregando...</p>}>
        <IrregularitiesCard />
      </Suspense>
    </HydrationBoundary>
  );
};

export default IrregularitiesPage;
