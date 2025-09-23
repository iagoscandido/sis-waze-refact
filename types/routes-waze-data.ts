// usersOnJams	[+] usersOnJams[5]
// routes	[+] routes[27]
// irregularities	[+] irregularities[8]
// broadcasterId
// areaName
// Managed Area
// bbox	[+] bbox {}
// name
// Managed Area
// isMetric
// true
// lengthOfJams	[+] lengthOfJams[5]
// updateTime
// 1758549300110

interface Bbox {
  minY: number;
  minX: number;
  maxY: number;
  maxX: number;
}
export interface RoutesWazeData {
  usersOnjam: [];
  routes: [];
  irregularities: [];
  broadcasterId: string;
  areaName: string;
  bbox: Bbox;
  name: string;
  isMetric: boolean;
  lengthOfJams: [];
  updateTime: number;
}

export interface Route {
  id: string;
  name: string;
  jamLevel: number;
  length: number;

  bbox: Bbox;

  historicTime: number;
  time: number;
}
