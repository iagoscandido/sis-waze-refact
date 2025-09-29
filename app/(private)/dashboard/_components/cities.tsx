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
  const { data: cities } = useCities();

  return (
    <Select defaultValue="Rio de Janeiro" indicatorPosition="right">
      <SelectTrigger>
        <SelectValue placeholder="Cidade" />
      </SelectTrigger>
      <SelectContent defaultValue={"Rio de Janeiro"}>
        {cities?.map((city) => (
          <SelectItem key={city} value={city} disabled>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Cities;
