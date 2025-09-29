export function getTimePercentage(
  currentTimeSeconds: number,
  historicTimeSeconds: number,
) {
  if (historicTimeSeconds === 0) return 0;
  return (
    ((currentTimeSeconds - historicTimeSeconds) / historicTimeSeconds) * 100
  );
}

export const formatData = (timestamp: number) => {
  const date = new Date(timestamp);

  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_paulo",
    dateStyle: "short",
    timeStyle: "short",
  });
};
