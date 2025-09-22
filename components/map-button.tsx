import { MapIcon } from "lucide-react";
import Link from "next/link";

export interface MapButton {
  toLat: number;
  toLon: number;
  fromLat: number;
  fromLon: number;
  navigate?: boolean;
  zoom?: number;
}


export const MapButton = ({
  toLat,
  toLon,
  navigate = true,
  zoom = 17,
  fromLat,
  fromLon,
}: MapButton) => {
  const wazeUrl = `https://www.waze.com/pt-BR/live-map/directions?navigate=${navigate}&zoom=${zoom}&ll=${toLat}%2C${toLon}&from=ll.${fromLat}%2C${fromLon}`;
  // Quando levar para essa rota, ele vai executar a função que busca na rota o bairro e nome do lograduro a que se refere lat e lon
  // Caso não tenha o nome da rua, assuma a informação
  
  return (
    <div>
      <Link target="_blank" rel="noopener noreferrer" href={wazeUrl}>
        <MapIcon />
      </Link>
    </div>
  );
};
