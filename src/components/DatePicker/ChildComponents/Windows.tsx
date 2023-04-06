import React from "react";
import styles from "../DetePicker.module.scss";
import Button from "../../Button/Button";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../store/CalendarSlice/CalendarSlice";

const Windows = () => {
  const {selectedDate,} = useAppSelector((state) => state.calendarSlice)
  const {windows} = selectedDate
  const {windowsHandler} = calendarSlice.actions
  const dispatch = useAppDispatch();
  return (
    <div className={styles.windows}>
      {Object.keys(windows).map((t) => (
        <Button
          className={classNames(styles.windowsBtn, {booked:windows[t].booked})}
          onClick={() => !windows[t].booked && dispatch(windowsHandler({key:t,value:true}))}
          variant="secondary"
          key={windows[t].time}
          active={windows[t].booked}
          disabled={!selectedDate.date}
        >
          {windows[t].time}
        </Button>
      ))}
    </div>
  );
};

export default Windows;
