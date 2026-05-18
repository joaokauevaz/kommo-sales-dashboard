import { createFileRoute } from "@tanstack/react-router";
import Integracoes from "@/pages/Integracoes";

export const Route = createFileRoute("/integracoes")({
  component: Integracoes,
});
