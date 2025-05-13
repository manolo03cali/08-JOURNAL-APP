import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

export const appRoutes = [...publicRoutes, ...privateRoutes];
