import { TLanguages } from "../../models/languages";

export type WKeys = "w1" | "w2" | "w3" | "w4";

interface keyString {
  [key: string]: any;
}

export interface IWindow {
  booked: boolean;
  time: string;
}

export interface IWindows extends keyString {
  w1: IWindow;
  w2: IWindow;
  w3: IWindow;
  w4: IWindow;
}

export type SelectedDate = {
  date: string | null;
  windows: IWindows;
};
export type Day = {
  day: number;
  fullDate: string;
  inActive: boolean;
};

export type Theme = "light" | "dark";

export interface IDatePickerState {
  lang: TLanguages;
  theme: Theme;
  currentDate: {
    currYear: number;
    currMonth: number;
  };
  days: Day[];
  today: string;
  selectedDate: SelectedDate;
  selectedDates: SelectedDate[];
  keyForDeleteModal: string | null;
  
}