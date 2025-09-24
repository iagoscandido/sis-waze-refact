const getIrregularities = () => {
  return fetch("/api/irregularities").then((res) => res.json());
};

export { getIrregularities };
