import { TLanguages } from "../../models/languages";
import { IDatePickerState } from "./DatePicker.models";

export const handlerLang = (lang: TLanguages, setState: React.Dispatch<React.SetStateAction<IDatePickerState>>) => {
  setState((pre) => {
    const newState = { ...pre };
    newState.lang = lang;
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState;
  });
};