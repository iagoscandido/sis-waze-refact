export const calcReduction = (current: number, historic: number): number => {
  if (historic <= 0) return 0;
  const percentage = (current / historic) * 100;
  return 100 - percentage;
};

export const calculateSpeedPercentage = (
  currentSpeed: number,
  historicSpeed: number,
) => {
  if (historicSpeed <= 0) return 0;

  const currentPercentage = (currentSpeed / historicSpeed) * 100;
  const ReductionPercentage = 100 - currentPercentage;

  return ReductionPercentage;
};

export const calculateTimePercentage = (
  currentTime: number,
  historicTime: number,
) => {
  if (historicTime <= 0) return 0;

  return ((currentTime - historicTime) / historicTime) * 100;
};
