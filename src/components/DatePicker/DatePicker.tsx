import React, { useCallback, useEffect } from "react";
import styles from "./DetePicker.module.scss";
import LangTheme from "./ChildComponents/LangTheme";
import Navigation from "./ChildComponents/Navigation";
import Calendar from "./ChildComponents/Calendar";
import Windows from "./ChildComponents/Windows";
import i18n from "../../config/i18n";
import Button from "../Button/Button";
import { ReactComponent as CheckSVG } from "../../images/check.svg";
import ModalWindow from "../ModalWindow/ModalWindow";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../store/CalendarSlice/CalendarSlice";
import { IDatePickerState, SelectedDate } from "./DatePicker.models";
const hasReserv = (windows:SelectedDate['windows']):boolean => {
  return !!Object.keys(windows).find(
    (w) => windows[w].booked
  );
}

const DatePicker = () => {
  const state = useAppSelector((state) => state.calendarSlice);
  const { days, lang, keyForDeleteModal, selectedDate } =  state as IDatePickerState;
  window.localStorage.setItem("calendar", JSON.stringify(state));
  const { generateCalendar, deleteWindowHandler, reserveHandle } = calendarSlice.actions;
  const dispatch = useAppDispatch();
  const refreshDays = useCallback(() => {
    dispatch(generateCalendar());
  }, [dispatch, generateCalendar]);

  useEffect(() => {
    console.log('render')
    refreshDays();
  }, [refreshDays]);

  
  const arrDate: string[] = selectedDate.date?.split(".") || [""];
  
  return (
    <div className={classNames(styles.picker, "theme-block")}>
      {!!days.length && (
        <>
          {keyForDeleteModal && (
            <ModalWindow>
              <div className={classNames(styles.modal, "theme-block")}>
                <h5 className={classNames(styles.modalTitle, "theme-color")}>
                  {i18n(lang).calendar.questionDeletion}
                </h5>
                <Button
                  onClick={() => dispatch(deleteWindowHandler({}))}
                  className={styles.modalBtn}
                  variant="secondary"
                >
                  {i18n(lang).calendar.cancel}
                </Button>
                <Button
                  onClick={() => dispatch(deleteWindowHandler({ key: null }))}
                  className={styles.modalBtn}
                  variant="primary"
                >
                  {i18n(lang).calendar.delete}
                </Button>
              </div>
            </ModalWindow>
          )}
          <LangTheme />
          <Navigation />
          <Calendar />
          <Windows />
          <ul className={styles.pickerBookedList}>
            {hasReserv(selectedDate.windows) ? (
              Object.keys(selectedDate.windows).map(
                (w) =>
                  selectedDate.windows[w].booked && (
                    <li
                      className={classNames(
                        styles.pickerBookedListItem,
                        "theme-color"
                      )}
                      key={w}
                    >
                      {+arrDate[0]}
                      &nbsp;
                      {i18n(lang).calendar.monthsForDays[
                        +arrDate[1] - 1
                      ].toLowerCase()}
                      &nbsp;
                      {+arrDate[2]} {selectedDate.windows[w].time}
                      &nbsp;
                      <span
                        className={styles.delete}
                        onClick={() =>
                          dispatch(deleteWindowHandler({ key: w }))
                        }
                      >
                        x
                      </span>
                    </li>
                  )
              )
            ) : (
              <div className="theme-color">{i18n(lang).calendar.bookText}</div>
            )}
          </ul>
          <Button
            disabled={!hasReserv}
            icon={!!hasReserv && <CheckSVG />}
            variant="primary"
            full
            onClick={() => dispatch(reserveHandle())}
          >
            {i18n(lang).calendar.check}
          </Button>
        </>
      )}
    </div>
  );
};
export default DatePicker;
