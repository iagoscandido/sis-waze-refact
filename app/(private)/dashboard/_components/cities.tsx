"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCities } from "@/server/getUnusualAction";

const Cities = () => {
  const { data: cities, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  if (isLoading) return <p>Carregando...</p>;
  if (!cities) return <p>Nenhuma cidade encontrada no momento.</p>;
  return (
    <Select defaultValue="Rio de Janeiro" disabled>
      <SelectTrigger>
        <SelectValue placeholder="Cidade" />
      </SelectTrigger>
      <SelectContent defaultValue={"Rio de Janeiro"}>
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Cities;
