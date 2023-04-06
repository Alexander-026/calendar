import { IDatePickerState } from "./DatePicker.models";

export const handlerTheme = (
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
):void => {
  setState((pre) => {
    const newState = { ...pre };
    newState.theme = state.theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState;
  })
};
