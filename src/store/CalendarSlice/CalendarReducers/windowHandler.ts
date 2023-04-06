import {CaseReducer,PayloadAction } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';


export const windowsHandler:CaseReducer<IDatePickerState, PayloadAction<{key:string, value:boolean}>> = (state, action) => {
 const {windows} = state.selectedDate
 const {key,value} = action.payload
 windows[key].booked = value;
 state.selectedDate.windows = windows
}