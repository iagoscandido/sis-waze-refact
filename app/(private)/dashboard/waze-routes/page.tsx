import { Suspense } from "react";
import RoutesCard from "@/app/(private)/dashboard/_components/routes-card";

const RoutesPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  const params = await searchParams;

  const sort = (params.sort as string) ?? "percentage";
  const page = parseInt((params.page as string) ?? "1", 10);
  const limit = parseInt((params.limit as string) ?? "20", 10);

  return (
    <Suspense>
      <RoutesCard sort={sort} page={page} limit={limit} />
    </Suspense>
  );
};

export default RoutesPage;
