import React from "react";
import { IDatePickerState } from "./DatePicker.models";
import { generateCalendar } from "./generateCalendar";
export const handlerNextMonth = (
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
): void => {
  const {
    currentDate: { currMonth, currYear },
  } = state;
  setState((pre) => {
    const newState = { ...pre };
    const trueFalse = currMonth + 1 === 12
    const cMonth = trueFalse ? 0 : pre.currentDate.currMonth + 1;
    const cYear = trueFalse ? currYear + 1 : currYear
    newState.currentDate = {
      currMonth: cMonth,
      currYear: cYear
    }
    newState.days = generateCalendar(cYear, cMonth);
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState
  })
};
export const handlerPrevMonth = (
  state: IDatePickerState,
  setState: React.Dispatch<React.SetStateAction<IDatePickerState>>
): void => {
  const {
    currentDate: { currMonth, currYear },
  } = state;
  setState((pre) => {
    const newState = { ...pre };
    const trueFalse = currMonth - 1 === -1
    const cMonth = trueFalse ? 11 :  pre.currentDate.currMonth - 1
    const cYear =  trueFalse ? currYear - 1 : currYear
    newState.currentDate = {
      currMonth: cMonth,
      currYear: cYear
    }
    newState.days = generateCalendar(cYear, cMonth);
    window.localStorage.setItem("calendar", JSON.stringify(newState));
    return newState
  })
};
