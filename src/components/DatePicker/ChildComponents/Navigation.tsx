import React from "react";
import styles from "../DetePicker.module.scss";
import { ReactComponent as PrevSVG } from "../../../images/prev.svg";
import { ReactComponent as NextSVG } from "../../../images/next.svg";
import i18n from "../../../config/i18n";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { calendarSlice } from "../../../store/CalendarSlice/CalendarSlice";


const Navigation = () => {
  const {currentDate:{currMonth,currYear},  lang} = useAppSelector((state) => state.calendarSlice)
  const {monthHandler} = calendarSlice.actions
  const dispatch = useAppDispatch();
  return (
    <div className={styles.navigation}>
      <span className={classNames(styles.navigationCurrentDate, 'theme-color')}>{i18n(lang).calendar.months[currMonth]} {currYear}</span>
      <div className={styles.navigationBtns}>
        <button  
        onClick={() => dispatch(monthHandler('PREV'))} 
        className={styles.btn}
        >
          <PrevSVG />
        </button>
        <button 
        onClick={() => dispatch(monthHandler('NEXT'))} 
        className={styles.btn}>
          <NextSVG />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
