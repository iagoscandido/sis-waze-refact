"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "percentage";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  const sortOptions: SortOption[] = [
    { label: "Percentual", value: "percentage" },
    { label: "A-Z", value: "alphabetic" },
    { label: "Extensão", value: "length" },
  ];
  return (
    <Select
      value={currentSort}
      onValueChange={handleChange}
      defaultValue="percentage"
      indicatorPosition="right"
    >
      <SelectTrigger>
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent defaultValue={"percentage"}>
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
