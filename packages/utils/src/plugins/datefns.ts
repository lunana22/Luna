import { format } from "date-fns";

export const dayNames = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
export const dayNamesEng = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export enum DateFnsFormat {
  /** 17:21 */
  HHmm = "HH:mm",
  /** 05.28 17:21 */
  MMDDHHHmm = "MM/dd HH:mm",
  /** 20.05.28 17:21 */
  YYMMDDHHmm = "yy.MM.dd HH:mm",
  /** 2021.05.28 5:21 오후 */
  YYYYMMDDhmma = "yyyy.MM.dd h:mm a",
  /** 2021.05.28 17:21 */
  YYYYMMDDHmm = "yyyy.MM.dd H:mm",
  /** 2021.05.28 07:21 */
  YYYYMMDDHHmm = "yyyy.MM.dd HH:mm",
  /** 2021.05.28 */
  YYYYMMDD = "yyyy.MM.dd",
  /** 21.05.28 */
  YYMMDD = "yy.MM.dd",
  /** 오후 */
  a = "a",
  /** 5:21 */
  hmm = "h:mm",
  /** 8월 */
  MM = "MM월",
  /** 오후 1:12 */
  aHHmm = "a HH:mm",
  /** 24.04.23 (목) | 오후 1:12 */
  YYMMDDHHEmma = "yy.MM.dd (E) | a h:mm",
  /** 2024.04.23 (목) */
  YYYYMMDDE_ENG = "MM.dd.yyyy (E)",
  YYYYMMDD_ENG = "MM.dd.yyyy",
  ahhmm = "a hh:mm",
}

export function utcToDateFormat(
  utc: string | Date | undefined,
  fnsFormat: DateFnsFormat,
) {
  if (!utc) return "";

  return format(new Date(utc), fnsFormat);
}

export const getDayName = (date: Date) => dayNames[date.getDay()];
export const getDayNameEng = (date: Date) => dayNamesEng[date.getDay()];
