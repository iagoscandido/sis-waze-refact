import { NextResponse } from "next/server";
import { fetchRoutesData } from "@/server/fetchRoutesAction";
import { mapRoutesWazeData } from "@/utils/mappers/mapRoutesWazeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") ?? "";

    const data = await fetchRoutesData();

    if (!data || !data.irregularities)
      return NextResponse.json({ error: "No data found" }, { status: 404 });

    const mappedData = mapRoutesWazeData(data);

    // Ordenação
    const sorted = [...mappedData.routes];
    switch (sort) {
      case "percentage":
        sorted.sort((a, b) => b.reductionPercentage - a.reductionPercentage);
        break;
      case "alphabetic":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "length":
        sorted.sort((a, b) => b.length - a.length);
        break;
    }

    return NextResponse.json({
      data: sorted,
      updateTime: mappedData.updateTime,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}
