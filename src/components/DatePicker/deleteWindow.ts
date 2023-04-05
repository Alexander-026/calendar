import { IDatePickerState } from "./DatePicker.models";

export const deleteWindow = ( state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>, key?: string) => {
  const { windows } = state.selectedDate;
  if (state.keyForDeleteModal) {
    windows[state.keyForDeleteModal].booked = false;
    setState((pre) => {
      const newState = { ...pre };
      newState.selectedDate = {
        ...newState.selectedDate,
        windows,
      };
      newState.keyForDeleteModal = null;
      window.localStorage.setItem("calendar", JSON.stringify(newState));
      return newState;
    });
  }
  if (!state.keyForDeleteModal && key) {
    setState((pre) => {
      const newState = { ...pre };
      newState.keyForDeleteModal = key;
      window.localStorage.setItem("calendar", JSON.stringify(newState));
      return newState;
    });
  }
};