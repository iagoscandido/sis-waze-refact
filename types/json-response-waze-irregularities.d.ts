export interface JsonResponseIrregularitiesWazeData {
  // Informações gerais: carimbo de data/hora do arquivo, área geográfica de onde os dados foram extraídos etc.
  startTime: string;
  endTime: string;
  startTimeMillis: number;
  endTimeMillis: number;

  // Alertas de trânsito: incidentes de trânsito enviados pelos usuários.
  alerts: JsonResponseAlert[];

  // Trânsito fora do normal (irregularidades): alertas e congestionamentos que afetam um número excepcionalmente grande de usuários.
  irregularities: JsonResponseIrregularity[];

  // Engarrafamentos: informações sobre a lentidão do trânsito geradas pelo serviço com base na localização e na velocidade dos usuários.
  jams: JsonResponseJam[];
}

export interface JsonResponseJam {
  uuid: string;
  city: string;
  type: string;
}

export interface JsonResponseAlert {
  uuid: string;
  type: string;
  subType?: string;
  location: JsonResponseLine;
}

export interface JsonResponseIrregularity {
  id: string;

  city: string;
  street: string;

  trend: -1 | 0 | 1; // -1 melhorando, 0 constante, 1 piorando
  line: JsonResponseLine[];

  driversCount: number; // Número de Wazers na irregularidade
  alertsCount: number; // Quantidade de alertas dos usuários do Waze em trechos da irregularidade

  length: number; // Extensão da irregularidade

  causeAlert?: JsonResponseAlert;

  jamLevel: 1 | 2 | 3 | 4;
  severity: 0 | 1 | 2 | 3 | 4 | 5;

  // Doc - Velocidade normal histórica do trecho,
  // Esta é a velocidade esperada para aquele trecho de rua, naquele horário específico, naquele dia da semana.
  // O Waze calcula isso com base em dados históricos de milhares de viagens. É a sua linha de base, o seu "padrão de ouro"
  // O Waze sabe que, em uma terça-feira às 8h da manhã, sem acidentes ou chuva, os carros nesse trecho de 1 km costumam andar a uma média de 60 km/h.
  // Este é o seu regularSpeed
  regularSpeed: number;
  // Doc - Velocidade do trânsito irregular
  // Esta é a velocidade média real dos carros que estão neste exato momento passando pelo trecho onde há o congestionamento.
  // É a fotografia da situação atual.
  speed: number;
  // Doc - Velocidade atual do trânsito
  // Este é o tempo, em segundos, que está se levando para percorrer a extensão (length) do congestionamento na velocidade atual (speed).
  // speed e seconds são duas faces da mesma moeda: um mede a velocidade, o outro mede o tempo para cobrir a distância.
  seconds: number;
  // Doc - Atraso em segundos em relação à velocidade normal
  // Esta é a propriedade mais importante para o usuário final.
  // Ela quantifica exatamente quantos segundos você está perdendo por causa da diferença entre a velocidade normal (regularSpeed) e a velocidade atual (speed).
  // É a diferença entre o tempo que você deveria levar e o tempo que você realmente está levando.
  delaySeconds: number;

  startNode?: string;
  endNode?: string;
}

interface JsonResponseLine {
  x: number;
  y: number;
}
