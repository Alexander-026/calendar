import {CaseReducer } from '@reduxjs/toolkit';
import { Day, IDatePickerState } from '../../../components/DatePicker/DatePicker.models';
import moment from 'moment';

export const generateCalendar:CaseReducer<IDatePickerState> = (state) => {
  const {currMonth,currYear} = state.currentDate
  const days: Day[] = [];
  const sumAllDays = 42;
  let firsDayOfMoth = new Date(currYear, currMonth, 0).getDay(); // getting firs day of month
  let lastDateOfMonth = new Date(currYear, currMonth+1, 0).getDate(); // getting last date of month
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  for (let i = firsDayOfMoth; i > 0; i--) {
    days.push({
      day: lastDateOfLastMonth - i + 1,
      fullDate: moment(
        new Date(currYear, currMonth - 1, lastDateOfLastMonth - i + 1)
      ).format("DD.MM.YYYY"),
      inActive: true,
    });
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    days.push({
      day: i,
      fullDate: moment(new Date(currYear, currMonth, i)).format("DD.MM.YYYY"),
      inActive: false,
    });
  }
  const daysOfNextMonth =  sumAllDays - days.length
  for (let i = 1; i <= daysOfNextMonth; i++) {
    days.push({
      day: i,
      fullDate: moment(
        new Date(currYear, currMonth + 1, i)
      ).format("DD.MM.YYYY"),
      inActive: true,
    });
  }
  state.days = days
}