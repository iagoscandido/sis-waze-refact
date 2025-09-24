import { Suspense } from "react";
import IrregularitiesCard from "./_components/irregularities-card";

const IrregularitiesPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const sort = (searchParams?.sort as string) ?? "percentage";
  const page = parseInt((searchParams?.page as string) ?? "1", 10);
  const limit = parseInt((searchParams?.limit as string) ?? "20", 10);
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <IrregularitiesCard sort={sort} page={page} limit={limit} />
    </Suspense>
  );
};

export default IrregularitiesPage;
