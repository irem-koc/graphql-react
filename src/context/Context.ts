import { createContext } from "react";
import { ContextType } from "../type/ContextType";

export const Context = createContext<ContextType | null>(null);
