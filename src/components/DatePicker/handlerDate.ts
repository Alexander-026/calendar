import { IDatePickerState } from "./DatePicker.models";

export const handlerDate = (
  date: string,
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
) => {
  const { selectedDates } = state;
  const selected = selectedDates.find((d) => d.date === date);
  if (selected) {
    setState((pre) => {
      const newState = { ...pre };
      newState.selectedDate = selected;
      window.localStorage.setItem("calendar", JSON.stringify(newState));
      return newState;
    });
  } else {
    setState((pre) => {
      const newState = { ...pre };
      newState.selectedDate = {
        date,
        windows: {
          w1: { booked: false, time: "10:00" },
          w2: { booked: false, time: "12:00" },
          w3: { booked: false, time: "16:00" },
          w4: { booked: false, time: "18:00" },
        },
      };
      window.localStorage.setItem("calendar", JSON.stringify(newState));
      return newState;
    });
  }
};
