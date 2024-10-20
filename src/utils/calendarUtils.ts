export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
] as string[];

export const weekDaysShort = [
  "Вс",
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
] as string[];

export const weekDays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
] as string[];

interface IDate {
  day: number;
  month: string;
  year: number;
  dayOfWeek: string;
  dayOfWeekShort: string;
}
export function formatDate(date: Date): IDate {
  return {
    day: date.getDate(),
    month: monthNames[date.getMonth()],
    year: date.getFullYear(),
    dayOfWeek: weekDays[date.getDay()],
    dayOfWeekShort: weekDaysShort[date.getDay()],
  };
}
