import { ukr } from './ukrainian/ukrainian';
import { ru } from './russian/russian';
import {en} from "./english/english";
import {de} from "./german/german";
import { Ii18n } from "./app";
import { TLanguages } from '../../models/languages';

const i18n = (lang:TLanguages):Ii18n => ({ ukr:ukr, ru:ru, en:en, de:de }[`${lang}`] as Ii18n);

export default i18n;
