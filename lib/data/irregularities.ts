import { fetchIrregularitiesWazeData } from "@/server/fetchIrregularitiesAction";
import { mapIrregularitiesWazeData } from "@/utils/mappers/mapIrregularitiesWazeData";

interface GetIrregularitiesParams {
  page?: number;
  limit?: number;
  city?: string | null;
}

export async function getIrregularitiesLogic(
  params: GetIrregularitiesParams = {}
) {
  const { page = 1, limit = 20, city } = params;

  const data = await fetchIrregularitiesWazeData();

  if (!data || !data.irregularities) {
    throw new Error("No data found");
  }

  const mappedData = mapIrregularitiesWazeData(data);

  let filteredIrregularities = mappedData.irregularities;
  if (city) {
    filteredIrregularities = filteredIrregularities.filter(
      (irregularity) => irregularity.city === city
    );
  }

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
