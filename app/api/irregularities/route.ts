import { NextResponse } from "next/server";
import { fetchIrregularitiesWazeData } from "@/server/fetchIrregularitiesAction";
import { mapIrregularitiesWazeData } from "@/utils/mappers/mapIrregularitiesWazeData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") ?? "";
    const sort = searchParams.get("sort") ?? "";

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

    const filteredCities = filtered.irregularities.map(
      (irregularity) => irregularity.city
    );
    const cities = [...new Set(filteredCities)];

    // Ordenação
    const sorted = [...filtered.irregularities];
    switch (sort) {
      case "percentage":
        sorted.sort((a, b) => b.reductionPercentage - a.reductionPercentage);
        break;
      case "alphabetic":
        sorted.sort((a, b) => a.street.localeCompare(b.street));
        break;
      case "length":
        sorted.sort((a, b) => b.length - a.length);
        break;
    }

    return NextResponse.json({
      data: sorted,
      cities: cities,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}
