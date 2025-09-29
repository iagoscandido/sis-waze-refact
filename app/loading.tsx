import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      Carregando...{" "}
      <Loader2Icon size={16} className="animate-spin"></Loader2Icon>
    </div>
  );
}
