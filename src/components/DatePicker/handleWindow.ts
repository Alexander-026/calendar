import { IDatePickerState } from "./DatePicker.models";

export const handleWindow = (
  key: string,
  value: boolean,
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
):void => {
  const { windows } = state.selectedDate;
  windows[key].booked = value;
  setState((pre) => {
    const newState = { ...pre };
    newState.selectedDate = {
      ...newState.selectedDate,
      windows,
    };
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState;
  });
};
