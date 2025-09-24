import { Suspense } from "react";
import IrregularitiesCard from "./_components/irregularities-card";

const IrregularitiesPage = async () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <IrregularitiesCard />
    </Suspense>
  );
};

export default IrregularitiesPage;
