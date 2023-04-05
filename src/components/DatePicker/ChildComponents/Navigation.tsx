import React from "react";
import styles from "../DetePicker.module.scss";
import { ReactComponent as PrevSVG } from "../../../images/prev.svg";
import { ReactComponent as NextSVG } from "../../../images/next.svg";
import i18n from "../../../config/i18n";
import classNames from "classnames";
import { TLanguages } from "../../../models/languages";


type NavigationProps = {
  prev: () => void;
  next: () => void;
  currentMonth: number;
  currentYear: number;
  lang: TLanguages
}


const Navigation:React.FC<NavigationProps> = ({currentMonth,currentYear,lang,next,prev}) => {
  return (
    <div className={styles.navigation}>
      <span className={classNames(styles.navigationCurrentDate, 'theme-color')}>{i18n(lang).calendar.months[currentMonth]} {currentYear}</span>
      <div className={styles.navigationBtns}>
        <button onClick={prev} className={styles.btn}>
          <PrevSVG />
        </button>
        <button onClick={next} className={styles.btn}>
          <NextSVG />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
