const getWazeRoutes = async () => {
  const res = await fetch("/api/routes");
  return await res.json();
};

export { getWazeRoutes };
