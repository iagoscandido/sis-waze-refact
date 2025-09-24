"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCities } from "@/hooks/useCities";

const Cities = () => {
  const { data: cities, isLoading } = useCities();

  if (isLoading) return <p>Carregando...</p>;
  if (!cities) return <p>Nenhuma cidade encontrada no momento.</p>;

  return (
    <Select defaultValue="Rio de Janeiro" indicatorPosition="right">
      <SelectTrigger>
        <SelectValue placeholder="Cidade" />
      </SelectTrigger>
      <SelectContent defaultValue={"Rio de Janeiro"}>
        {cities.map((city) => (
          <SelectItem key={city} value={city} disabled>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Cities;
