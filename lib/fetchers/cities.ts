const getCities = async (): Promise<string[]> => {
  const res = await fetch("/api/irregularities");

  const json = await res.json();

  const cities = json.cities;
  return cities;
};

export { getCities };
