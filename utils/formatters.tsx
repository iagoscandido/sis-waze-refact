export const formatMetersToKm = (meters: number): string => {
  if (meters < 1000) {
    return `${meters.toFixed(0)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

export const formatSpeedToKmh = (speedMps: number): string => {
  return `${(speedMps * 3.6).toFixed(0)} km/h`;
};

export const formatSecondsToMinutes = (totalSeconds: number): string => {
  if (totalSeconds < 60) {
    return `${Math.round(totalSeconds)} s`;
  }
  const minutes = Math.floor(totalSeconds / 60);

  return `${minutes} min`;
};
