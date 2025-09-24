const getCities = async (): Promise<string[]> => {
  const res = await fetch("/api/cities");
  return await res.json();
};

export { getCities };
