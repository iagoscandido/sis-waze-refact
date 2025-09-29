import { Suspense } from "react";
import IrregularitiesCard from "./_components/irregularities-card";

const IrregularitiesPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });
  // if (!session) {
  //   redirect("/sign-in");
  // }

  const params = await searchParams;

  const sort = (params.sort as string) ?? "percentage";
  const page = parseInt((params.page as string) ?? "1", 10);
  const limit = parseInt((params.limit as string) ?? "20", 10);
  return (
    <Suspense>
      <IrregularitiesCard sort={sort} page={page} limit={limit} />
    </Suspense>
  );
};

export default IrregularitiesPage;
