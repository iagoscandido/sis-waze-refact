import { Suspense } from "react";
import RoutesCard from "@/app/(private)/dashboard/_components/routes-card";

const RoutesPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const sort = (searchParams?.sort as string) ?? "percentage";
  const page = parseInt((searchParams?.page as string) ?? "1", 10);
  const limit = parseInt((searchParams?.limit as string) ?? "20", 10);

  return (
    <Suspense>
      <RoutesCard sort={sort} page={page} limit={limit} />
    </Suspense>
  );
};

export default RoutesPage;
