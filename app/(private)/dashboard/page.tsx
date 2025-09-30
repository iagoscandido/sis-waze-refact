import { Suspense } from "react";
import IrregularitiesCard from "./_components/irregularities-card";

const IrregularitiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;

  const sort = (params.sort as string) ?? "percentage";
  const city = (params.city as string) ?? "Rio de Janeiro";

  return (
    <Suspense>
      <IrregularitiesCard sort={sort} city={city} />
    </Suspense>
  );
};

export default IrregularitiesPage;
