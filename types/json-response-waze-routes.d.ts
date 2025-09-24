export interface JsonResponseRoutesWazeData {
  usersOnjam: [];
  routes: [];
  irregularities: [];
  broadcasterId: string;
  areaName: string;
  bbox: JsonResponseBbox;
  name: string;
  isMetric: boolean;
  lengthOfJams: [];
  updateTime: number;
}

interface JsonResponseBbox {
  minY: number;
  minX: number;
  maxY: number;
  maxX: number;
}

export interface JsonResponseRoute {
  id: string;
  name: string;
  jamLevel: number;
  length: number;
  city: string;
  bbox: JsonResponseBbox;

  historicTime: number;
  time: number;

  alternateRoute?: JsonResponseAlternateRoute;
}

export interface JsonResponseAlternateRoute {
  // historicTime: number;
  line: [x: number, y: number][];
  name: string;
  // length: number;
  // jamLevel: number;
  // time: number;
}
