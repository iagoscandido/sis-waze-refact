import {
  MoveDownIcon,
  MoveRightIcon,
  MoveUpIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

const TREND_VISUALS_CONFIG = {
  decrease: { label: "Melhorando", bgColor: "bg-green-500", icon: MoveUpIcon },
  stable: { label: "Constante", bgColor: "bg-yellow-500", icon: MoveRightIcon },
  increase: { label: "Piorando", bgColor: "bg-red-500", icon: MoveDownIcon },
};

export const getTrendVisuals = (trend: number | null) => {
  if (trend === null) return null;

  switch (trend) {
    case -1:
      return TREND_VISUALS_CONFIG.decrease;
    case 0:
      return TREND_VISUALS_CONFIG.stable;
    case 1:
      return TREND_VISUALS_CONFIG.increase;
  }
};

export function getSeverityDescription(level: number): string {
  return (
    {
      0: "Sem trânsito",
      1: "Trânsito livre",
      2: "Trânsito leve",
      3: "Trânsito moderado",
      4: "Trânsito intenso",
      5: "Parado / Congestionado",
    }[level] ?? "Nível de trânsito desconhecido"
  );
}

function calculateSpeedPercentage(currentSpeed: number, historicSpeed: number) {
  if (historicSpeed <= 0) return 0;

  const currentPercentage = (currentSpeed / historicSpeed) * 100;
  const ReductionPercentage = 100 - currentPercentage;

  return ReductionPercentage;
}

function calculateTimePercentage(currentTime: number, historicTime: number) {
  if (historicTime <= 0) return 0;

  return ((currentTime - historicTime) / historicTime) * 100;
}

export function getPercentageVisuals(
  current: number,
  historic: number,
  type: "speed" | "time" = "speed",
): {
  status: string;
  label: string;
  bgColor: string;
  badgeBg: string;
  percentage: number;
  icon: React.ElementType;
} {
  const percentage =
    type === "time"
      ? calculateTimePercentage(current, historic)
      : calculateSpeedPercentage(current, historic);

  const icon = percentage > 0 ? TrendingUpIcon : TrendingDownIcon;

  switch (true) {
    case percentage <= 30:
      return {
        status: "low",
        label: "Abaixo da média",
        bgColor: "bg-green-900",
        badgeBg: "bg-green-500/20",
        percentage,
        icon,
      };
    case percentage <= 80:
      return {
        status: "normal",
        label: "Dentro da média",
        bgColor: "bg-yellow-900",
        badgeBg: "bg-yellow-500/20",
        percentage,
        icon,
      };
    case percentage <= 100:
      return {
        status: "high",
        label: "Acima da média",
        bgColor: "bg-red-900",
        badgeBg: "bg-red-500/20",
        percentage,
        icon,
      };
    default:
      return {
        status: "critical",
        label: "Muito acima da média",
        bgColor: "bg-purple-900",
        badgeBg: "bg-purple-700/20",
        percentage,
        icon,
      };
  }
}
