import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styles from "./DetePicker.module.scss";
import LangTheme from "./ChildComponents/LangTheme";
import Navigation from "./ChildComponents/Navigation";
import Calendar from "./ChildComponents/Calendar";
import { generateCalendar } from "./generateCalendar";
import Windows from "./ChildComponents/Windows";
import i18n from "../../config/i18n";
import Button from "../Button/Button";
import { ReactComponent as CheckSVG } from "../../images/check.svg";
import ModalWindow from "../ModalWindow/ModalWindow";
import useLocalStorage from "../../hooks/useLocalStorage";
import classNames from "classnames";
import { Day, IDatePickerState } from "./DatePicker.models";
import { handlerLang } from "./handleLang";
import { handlerNextMonth, handlerPrevMonth } from "./handleMonth";
import { handleWindow } from "./handleWindow";
import { handlerDate } from "./handlerDate";
import { deleteWindow } from "./deleteWindow";
import { handleReserve } from "./handleReserve";
import { handlerTheme } from "./handleTheme";

const initialState: IDatePickerState = {
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

const DatePicker = () => {
  const [calendar] = useLocalStorage<IDatePickerState | null>("calendar", null);
  const [state, setState] = useState<IDatePickerState>(calendar || initialState);

  const refreshСalendar = useCallback((): void => {
    const days: Day[] = generateCalendar(
      state.currentDate.currYear,
      state.currentDate.currMonth
    );
    if (!days.length) return;
    setState((pre) => ({ ...pre, days }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentDate]);

  useEffect(() => {
    refreshСalendar();
  }, [refreshСalendar]);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const {days,currentDate,selectedDates,today,selectedDate,keyForDeleteModal,lang,theme} = state;  

  const hasReserv = !!Object.keys(selectedDate.windows).find((w) => selectedDate.windows[w].booked);

  const arrDate: string[] = selectedDate.date?.split(".") || [""];
  return (
    <div className={classNames(styles.picker, "theme-block")}>
      {!!days.length && !!calendar && (
        <>
          {keyForDeleteModal && (
            <ModalWindow>
              <div className={classNames(styles.modal, "theme-block")}>
                <h5 className={classNames(styles.modalTitle, "theme-color")}>
                  {i18n(lang).calendar.questionDeletion}
                </h5>
                <Button
                  onClick={() =>
                    setState((pre) => {
                      const newState = { ...pre };
                      newState.keyForDeleteModal = null;
                      window.localStorage.setItem(
                        "calendar",
                        JSON.stringify(newState)
                      );
                      return newState;
                    })
                  }
                  className={styles.modalBtn}
                  variant="secondary"
                >
                  {i18n(lang).calendar.cancel}
                </Button>
                <Button
                  onClick={() => deleteWindow(state, setState)}
                  className={styles.modalBtn}
                  variant="primary"
                >
                  {i18n(lang).calendar.delete}
                </Button>
              </div>
            </ModalWindow>
          )}
          <LangTheme
            lang={lang}
            theme={theme}
            handlerTheme={() => handlerTheme(state, setState)}
            handlerLang={(lang) => handlerLang(lang, setState)}
          />
          <Navigation
            currentMonth={currentDate.currMonth}
            currentYear={currentDate.currYear}
            lang={lang}
            next={() => handlerNextMonth(state, setState)}
            prev={() => handlerPrevMonth(state, setState)}
          />
          <Calendar
            lang={lang}
            days={days}
            today={today}
            onChange={(date: string) => handlerDate(date, state, setState)}
            selectedDate={selectedDate}
            selectedDates={selectedDates}
          />
          <Windows
            selectedDate={selectedDate}
            handleWindow={(key: string, value: boolean) =>
              handleWindow(key, value, state, setState)
            }
          />
          <ul className={styles.pickerBookedList}>
            {hasReserv ? (
              Object.keys(selectedDate.windows).map((w) => selectedDate.windows[w].booked && (
                <li className={classNames(styles.pickerBookedListItem, "theme-color" )} key={w}>
                  {+arrDate[0]}
                  &nbsp;
                  {i18n(lang).calendar.monthsForDays[+arrDate[1] - 1].toLowerCase()}
                  &nbsp;
                  {+arrDate[2]} {selectedDate.windows[w].time}
                  &nbsp;
                  <span className={styles.delete} onClick={() => deleteWindow(state, setState, w)}>x</span>
                </li>
              ))
              ):(<div className="theme-color">{i18n(state.lang).calendar.bookText}</div> )}
          </ul>
          <Button
            disabled={!hasReserv}
            icon={!!hasReserv && <CheckSVG />}
            variant="primary"
            full
            onClick={() => handleReserve(state, setState)}
          >
            {i18n(state.lang).calendar.check}
          </Button>
        </>
      )}
    </div>
  );
};
export default DatePicker;
