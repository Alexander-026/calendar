import { CaseReducer } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
export const themeHandler:CaseReducer<IDatePickerState> = (state) => {
  state.theme = state.theme === 'light' ? 'dark' : 'light'
}