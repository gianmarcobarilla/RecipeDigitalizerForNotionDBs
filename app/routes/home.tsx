import type { Route } from "./+types/home";
import { HomePage } from "../components/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recipe Digitalizer for Notion DBs" },
    { name: "description", content: "Welcome!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
