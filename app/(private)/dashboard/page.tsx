import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { getIrregularities } from "@/lib/fetchers/irregularities";
import { getQueryClient } from "@/lib/get-query-client";
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
