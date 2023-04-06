import {CaseReducer,PayloadAction } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
import { initialState } from '../CalendarSlice';


export const dateHandler:CaseReducer<IDatePickerState, PayloadAction<string>> = (state, action) => {
  const {selectedDates} = state
  const date = action.payload
  const selected = selectedDates.find((d) => d.date === date);
  state.selectedDate = selected ? selected : {date, windows: initialState.selectedDate.windows}
}