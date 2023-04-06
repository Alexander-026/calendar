import React from 'react';
import i18n from '../../../config/i18n';
import styles from '../DetePicker.module.scss';
import classNames from 'classnames';
import { Day, SelectedDate } from '../DatePicker.models';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { calendarSlice } from '../../../store/CalendarSlice/CalendarSlice';

const checkBooks = (date:string, selectedDates:SelectedDate[]):boolean => {
  const winds = selectedDates.find((d) => d.date === date)?.windows
  return !!Object.keys(winds || {}).find((w) => winds?.[w].booked)
}
const Calendar = () => {
  const {days,today,lang,  selectedDate,selectedDates} = useAppSelector((state) => state.calendarSlice)
  const {dateHandler } = calendarSlice.actions
  const dispatch = useAppDispatch();
  return (
    <div className={styles.calendar}>
      <ul className={styles.calendarWeeks}>
        {i18n(lang).calendar.daysOfWeeks.map((w) => (
          <li className={classNames(styles.calendarWeeksDay, 'theme-color')} key={w}>{w.slice(0,2)}</li>
        ))}
      </ul>
      <ul className={styles.calendarDays}>
        {days.map((d:Day) => {
          return (
            <li
            className={classNames(styles.calendarDaysDay, {
              today: d.fullDate === today,
              selected: d.fullDate === selectedDate.date,
              dot: checkBooks(d.fullDate,selectedDates)
            })}
              key={d.fullDate}
              onClick={() => dispatch(dateHandler(d.fullDate))}
            >
              {d.day}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Calendar;