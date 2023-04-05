import React from "react";
import styles from "../DetePicker.module.scss";
import Button from "../../Button/Button";
import classNames from "classnames";
import { IWindows, SelectedDate } from "../DatePicker.models";

type WindowsProps = {
  selectedDate: SelectedDate;
  handleWindow: (key: string, value: boolean) => void;
};

const Windows: React.FC<WindowsProps> = ({ handleWindow, selectedDate }) => {
  const windows: IWindows = selectedDate.windows;
  return (
    <div className={styles.windows}>
      {Object.keys(windows).map((t) => (
        <Button
          className={classNames(styles.windowsBtn, {booked:windows[t].booked})}
          onClick={() => !windows[t].booked && handleWindow(t, true)}
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
