import React, {useLayoutEffect} from "react";
import styles from "../DetePicker.module.scss";
import { ReactComponent as MoonSVG } from "../../../images/moon.svg";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../store/CalendarSlice/CalendarSlice";
import { TLanguages } from "../../../models/languages";

const LangTheme = () => {
  const {lang,theme} = useAppSelector((state) => state.calendarSlice)
  const { langHandler,themeHandler} = calendarSlice.actions
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className={styles.langTheme}>
      <select
        value={lang}
        onChange={(e) => dispatch(langHandler(e.target.value as TLanguages))}
        className={styles.langs}
        name="lang"
        id="lang"
      >
        <option className={styles.langsLang} value="ukr">
          ukr
        </option>
        <option className={styles.langsLang} value="ru">
          ru
        </option>
        <option className={styles.langsLang} value="en">
          en
        </option>
        <option className={styles.langsLang} value="de">
          de
        </option>
      </select>
      <MoonSVG
        onClick={() => dispatch(themeHandler())}
        className={classNames(styles.theme, theme)}
      />
    </div>
  );
};

export default LangTheme;
