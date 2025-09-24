import { fetchRoutesData } from "@/server/fetchRoutesAction";
import { mapRoutesWazeData } from "@/utils/mappers/mapRoutesWazeData";

// Interface para os parâmetros da nossa função
interface GetIrregularitiesParams {
  page?: number;
  limit?: number;
}

// Esta é a nossa nova função de lógica central
export async function getIrregularitiesLogic(
  params: GetIrregularitiesParams = {}
) {
  const { page = 1, limit = 20 } = params;

  const data = await fetchRoutesData();

  if (!data || !data.irregularities) {
    // É melhor lançar um erro aqui para que o chamador possa tratá-lo
    throw new Error("No data found");
  }

  const mappedData = mapRoutesWazeData(data);

  // Filtro opcional
  const filteredIrregularities = mappedData.routes;

  // Paginação
  const total = filteredIrregularities.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filteredIrregularities.slice(start, end);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: paginatedData,
  };
}
