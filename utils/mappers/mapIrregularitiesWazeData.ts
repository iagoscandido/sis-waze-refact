// Classe utilitaria para mapear o json recebido do waze e assim reduzir o payload,
// alénm de implementar alguns atributos utilitários
import type {
  IrregularitiesWazeData,
  Irregularity,
} from "@/types/irregularities-waze-data";
import { calculateSpeedPercentage } from "@/utils/calcs";

interface MappedIrregularities {
  id: string;
  city: string;
  street: string;
  cause?: string;
  subCause?: string;
  historicSpeed: number;
  CurrentSpeed: number;
  currentTimeSeconds: number;
  delayTimeSeconds: number;
  reductionPercentage: number;
}

export type MappedIrregularitiesWazeData = {
  irregularities: MappedIrregularities[];
};

export function mapIrregularitiesWazeData(
  data: IrregularitiesWazeData
): MappedIrregularitiesWazeData {
  const irregularities = data.irregularities
    .map(mapIrregularities)
    .sort((a, b) => b.reductionPercentage - a.reductionPercentage);

  return {
    irregularities,
  };
}

const mapIrregularities = (
  irregularity: Irregularity
): MappedIrregularities => {
  const reduction = calculateSpeedPercentage(
    irregularity.speed,
    irregularity.regularSpeed
  );
  return {
    id: irregularity.id,

    city: irregularity.city,
    street: irregularity.street,

    cause: irregularity.causeAlert?.type,
    subCause: irregularity.causeAlert?.subType,

    historicSpeed: irregularity.regularSpeed,
    CurrentSpeed: irregularity.speed,

    delayTimeSeconds: irregularity.delaySeconds,
    currentTimeSeconds: irregularity.seconds,

    reductionPercentage: reduction,
  };
};
