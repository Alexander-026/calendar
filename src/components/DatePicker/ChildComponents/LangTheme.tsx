import React from 'react';
import styles from '../DetePicker.module.scss'
import {ReactComponent as MoonSVG} from '../../../images/moon.svg';
import { TLanguages } from '../../../models/languages';
import classNames from 'classnames';
import { Theme } from '../DatePicker.models';

type LangThemeProps = {
  theme: Theme;
  lang: TLanguages;
  handlerTheme: () => void;
  handlerLang: (value:TLanguages) => void
}

const LangTheme:React.FC<LangThemeProps> = ({theme,lang,handlerLang,handlerTheme}) => {
  return (
    <div className={styles.langTheme}>
      <select value={lang} onChange={(e) => handlerLang(e.target.value as TLanguages)} className={styles.langs} name="lang" id="lang">
        <option className={styles.langsLang} value="ukr">ukr</option>
        <option className={styles.langsLang} value="ru">ru</option>
        <option className={styles.langsLang} value="en">en</option>
        <option className={styles.langsLang} value="de">de</option>
      </select>
      <MoonSVG onClick={handlerTheme} className={classNames(styles.theme, theme)} />
  </div>
  );
};

export default LangTheme;