import { NextResponse } from "next/server";
import { fetchRoutesData } from "@/server/fetchRoutesAction";
import { mapRoutesWazeData } from "@/utils/mappers/mapRoutesWazeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);

    const data = await fetchRoutesData();

    if (!data || !data.irregularities)
      return NextResponse.json({ error: "No data found" }, { status: 404 });

    const mappedData = mapRoutesWazeData(data);

    // Paginação
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = mappedData.routes.slice(start, end);

    return NextResponse.json({
      page,
      limit,
      total: mappedData.routes.length,
      totalPages: Math.ceil(mappedData.routes.length / limit),
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
