"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = {
  label: string;
  value: string;
};

const Sort = () => {
  const sortOptions: SortOption[] = [
    { label: "Maior Percentual", value: "maior" },
    { label: "Menor Percentual", value: "menor" },
  ];
  return (
    <Select indicatorPosition="right">
      <SelectTrigger>
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent defaultValue={"Maior Percentual"}>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
