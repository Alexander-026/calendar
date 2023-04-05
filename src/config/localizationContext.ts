import {createContext} from "react";

export const LocalizationContext = createContext<any>(localStorage.getItem('lang'))