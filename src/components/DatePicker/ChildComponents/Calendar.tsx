import React from 'react';
import i18n from '../../../config/i18n';
import styles from '../DetePicker.module.scss';
import classNames from 'classnames';
import { TLanguages } from '../../../models/languages';
import { Day, SelectedDate } from '../DatePicker.models';

type CalendarProps = {
  days: Day[];
  today:string;
  selectedDate:SelectedDate;
  selectedDates: SelectedDate[]
  lang: TLanguages;
  onChange: (date:string) => void;
}
const checkBooks = (date:string, selectedDates:SelectedDate[]):boolean => {
    const winds = selectedDates.find((d) => d.date === date)?.windows
    return !!Object.keys(winds || {}).find((w) => winds?.[w].booked)
}

const Calendar:React.FC<CalendarProps> = ({days,today,lang,  selectedDate,selectedDates, onChange}) => {
  
  return (
    <div className={styles.calendar}>
      <ul className={styles.calendarWeeks}>
        {i18n(lang).calendar.daysOfWeeks.map((w) => (
          <li className={classNames(styles.calendarWeeksDay, 'theme-color')} key={w}>{w.slice(0,2)}</li>
        ))}
      </ul>
      <ul className={styles.calendarDays}>
            {days.map((d, i) => {
              return (
                <li
                className={classNames(styles.calendarDaysDay, {
                  today: d.fullDate === today,
                  selected: d.fullDate === selectedDate.date,
                  dot: checkBooks(d.fullDate,selectedDates)
                })}
                  key={i + 1}
                  onClick={() => onChange(d.fullDate)}
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