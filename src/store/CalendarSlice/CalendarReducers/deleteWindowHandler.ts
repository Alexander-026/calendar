import {CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';

export const deleteWindowHandler:CaseReducer<IDatePickerState, PayloadAction<{key?:string | null}>> = (state, action) => {
  const { keyForDeleteModal } = state;
  const {key} = action.payload
  if(keyForDeleteModal && key === null) {
    state.selectedDate.windows[keyForDeleteModal].booked = false
    state.keyForDeleteModal = key
  }
  if(!keyForDeleteModal && key) {
    state.keyForDeleteModal = key
  }
  if(keyForDeleteModal && key === undefined) {
    state.keyForDeleteModal = null
  }
}