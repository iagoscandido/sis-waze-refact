import { Suspense } from "react";
import RoutesCard from "../_components/routes-card";

const RoutesPage = async () => {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <RoutesCard />
    </Suspense>
  );
};

export default RoutesPage;
