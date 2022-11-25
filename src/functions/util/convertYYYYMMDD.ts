export const convertYYYYMMDD = (year: string, month: string, date: string) => {
  const m = ("00" + month).slice(-2);
  const d = ("00" + date).slice(-2);
  return year + "/" + m + "/" + d;
};
