import { IDatePickerState } from "./DatePicker.models";

export const handleReserve = (
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
) => {
  const { selectedDate, selectedDates } = state;
  const filteredDates = selectedDates.filter(
    (d) => d.date !== selectedDate.date
  );
  filteredDates.push(selectedDate);
  if (!filteredDates.length) return;
  setState((pre) => {
    const newState = { ...pre };
    newState.selectedDate = {
      date: "",
      windows: {
        w1: { booked: false, time: "10:00" },
        w2: { booked: false, time: "12:00" },
        w3: { booked: false, time: "16:00" },
        w4: { booked: false, time: "18:00" },
      },
    };
    newState.selectedDates = filteredDates;
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState;
  });
};
