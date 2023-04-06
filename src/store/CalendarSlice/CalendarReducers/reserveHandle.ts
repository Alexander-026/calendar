

import {CaseReducer } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
import { initialState } from '../CalendarSlice';


export const reserveHandle:CaseReducer<IDatePickerState> = (state, action) => {
  const { selectedDate, selectedDates } = state;
  const filteredDates = selectedDates.filter(
    (d) => d.date !== selectedDate.date
  );
  filteredDates.push(selectedDate);
  if (!filteredDates.length) return;

  state.selectedDate = initialState.selectedDate
  state.selectedDates = filteredDates
}