import { NextResponse } from "next/server";
import { fetchIrregularitiesWazeData } from "@/server/fetchIrregularitiesAction";

export async function GET() {
  try {
    const data = await fetchIrregularitiesWazeData();

    if (!data)
      return NextResponse.json({ error: "No cities found" }, { status: 404 });

    const cities = data.irregularities.map((irregularity) => irregularity.city);

    const res = Array.from(new Set(cities));

    return NextResponse.json(res);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message ?? "Erro interno" },
      { status: 500 }
    );
  }
}
