import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/extract-text", "routes/api.extract-text.tsx"),
] satisfies RouteConfig;
