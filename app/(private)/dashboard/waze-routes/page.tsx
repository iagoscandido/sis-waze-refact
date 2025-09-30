import { Suspense } from "react";
import RoutesCard from "@/app/(private)/dashboard/_components/routes-card";

const RoutesPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;

  const sort = (params.sort as string) ?? "percentage";

  return (
    <Suspense>
      <RoutesCard sort={sort} />
    </Suspense>
  );
};

export default RoutesPage;
