import { reserveHandle } from './CalendarReducers/reserveHandle';
import { generateCalendar } from './CalendarReducers/cenerateCalendar';
import { windowsHandler } from './CalendarReducers/windowHandler';
import { dateHandler } from './CalendarReducers/dateHandler';
import { monthHandler } from './CalendarReducers/monthHandler';
import { langHandler } from './CalendarReducers/langHandler';
import { themeHandler } from './CalendarReducers/themeHandler';
import { deleteWindowHandler } from './CalendarReducers/deleteWindowHandler';
import { createSlice } from "@reduxjs/toolkit";
import { IDatePickerState } from "../../components/DatePicker/DatePicker.models";


const item = window.localStorage.getItem('calendar');
const localState = item ? JSON.parse(item) : null;


export const initialState: IDatePickerState =    {
  lang: "ru",
  theme: "light",
  currentDate: {
    currYear: new Date().getFullYear(),
    currMonth: new Date().getMonth(),
  },
  selectedDate: {
    date: "",
    windows: {
      w1: { booked: false, time: "10:00" },
      w2: { booked: false, time: "12:00" },
      w3: { booked: false, time: "16:00" },
      w4: { booked: false, time: "18:00" },
    },
  },
  days: [],
  today: new Date().toLocaleString().split(",")[0],
  selectedDates: [],
  keyForDeleteModal: null,
};



export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: localState || initialState,
  reducers: {
    generateCalendar,
    langHandler,
    themeHandler,
    monthHandler,
    dateHandler,
    windowsHandler,
    deleteWindowHandler,
    reserveHandle
  },
  extraReducers: (builder) => {
    builder.addCase(calendarSlice.actions.monthHandler,(state) => {
        console.log('svvsvv')
    })
  }
})

export default calendarSlice.reducer;
