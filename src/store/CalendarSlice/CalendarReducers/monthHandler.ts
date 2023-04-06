import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
import { generateCalendar } from './cenerateCalendar';
export const monthHandler:CaseReducer<IDatePickerState, PayloadAction<'NEXT' | 'PREV'>> = (state, action) => {
  const {currMonth,currYear} = state.currentDate
  switch (action.payload) {
    case 'NEXT':
      const trueFalseNext = currMonth + 1 === 12
      const cMonthNext =trueFalseNext ? 0 : currMonth + 1;
      const cYearNext = trueFalseNext ? currYear + 1 : currYear 
      state.currentDate.currMonth = cMonthNext
      state.currentDate.currYear = cYearNext
      break;
    case 'PREV':
      const trueFalsePrev = currMonth - 1 === -1
      const cMonthPrev = trueFalsePrev ? 11 :  currMonth - 1
      const cYearPrev =  trueFalsePrev ? currYear - 1 : currYear
      state.currentDate.currMonth = cMonthPrev
      state.currentDate.currYear = cYearPrev
      break;
    default:
      break;
  }
  generateCalendar(state,{type:''})
}