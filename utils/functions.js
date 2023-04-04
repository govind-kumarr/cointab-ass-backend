export const add1Day = (date) => new Date(date.setDate(date.getDate() + 1));

export const compareDates = (now, to) => now > to;
