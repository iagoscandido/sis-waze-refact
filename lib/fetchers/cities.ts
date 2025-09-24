const getCities = async (): Promise<string[]> => {
  const res = await fetch("/api/cities");

  return res.json();
};

export { getCities };
