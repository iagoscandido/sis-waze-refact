import { NextResponse } from "next/server";
import { fetchIrregularitiesWazeData } from "@/server/fetchIrregularitiesAction";
import { mapIrregularitiesWazeData } from "@/utils/mappers/mapIrregularitiesWazeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const city = searchParams.get("city");

    const data = await fetchIrregularitiesWazeData();

    if (!data || !data.irregularities)
      return NextResponse.json({ error: "No data found" }, { status: 404 });

    const mappedData = mapIrregularitiesWazeData(data);

    // Filtro opcional
    const filtered = mappedData;
    if (city) {
      filtered.irregularities = filtered.irregularities.filter(
        (irregularity) => irregularity.city === city
      );
    }

    // Paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.irregularities.slice(start, end);

    return NextResponse.json({
      page,
      limit,
      total: filtered.irregularities.length,
      totalPages: Math.ceil(filtered.irregularities.length / limit),
      data: paginated,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}
