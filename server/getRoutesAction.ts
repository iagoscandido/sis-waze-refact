import { NextResponse } from "next/server";

export async function fetchRoutes() {
  try {
    const url =
      "https://www.waze.com/row-partnerhub-api/feeds-tvt/?id=11072621667";
    const res = await fetch(url, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
// export async function getCities(): Promise<string[]> {
//   const routes = await fetchRoutes();

//   if (!routes) throw new Error("No Waze data found");

//   const cities = routes.map((irregularity) => irregularity.city);

//   return Array.from(new Set(cities));
// }
