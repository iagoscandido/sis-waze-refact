import { MapIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export interface MapButtonProps {
  toLat: number;
  toLon: number;
  fromLat: number;
  fromLon: number;
  navigate?: boolean;
  zoom?: number;
  type?: "icon" | "simple";
  children?: React.ReactNode;
}

export const MapButtonProps = ({
  toLat,
  toLon,
  navigate = true,
  zoom = 17,
  fromLat,
  fromLon,
  type = "icon",
  children,
}: MapButtonProps) => {
  const wazeUrl = `https://www.waze.com/pt-BR/live-map/directions?navigate=${navigate}&zoom=${zoom}&ll=${toLat}%2C${toLon}&from=ll.${fromLat}%2C${fromLon}`;

  return (
    <div>
      <Link target="_blank" rel="noopener noreferrer" href={wazeUrl}>
        {type === "icon" && <MapIcon />}
        {type === "simple" && <Button variant={"outline"}>{children}</Button>}
      </Link>
    </div>
  );
};
