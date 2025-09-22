export function getTimePercentage(
  currentTimeSeconds: number,
  historicTimeSeconds: number,
) {
  if (historicTimeSeconds === 0) return 0;
  return (
    ((currentTimeSeconds - historicTimeSeconds) / historicTimeSeconds) * 100
  );
}
