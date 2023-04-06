import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
import { TLanguages } from '../../../models/languages';
export const langHandler:CaseReducer<IDatePickerState, PayloadAction<TLanguages>> = (state, action) => {
  state.lang = action.payload
}