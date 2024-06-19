import dayjs, { Dayjs } from "dayjs";

export function getFirstDayOfMonth(): Dayjs {
  return dayjs().startOf("month");
}

export function getLastDayOfMonth(): Dayjs {
  return dayjs().endOf("month");
}
