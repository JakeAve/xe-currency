type Unit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';
type Units = {
  [key: string]: number;
};
const units: Units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
};
interface makeRelDateOptions {
  d2?: Date;
  locale?: string;
}

const makeRelDate = (d1: Date, { d2 = new Date(), locale = 'en-US' }: makeRelDateOptions = {}): string => {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const elapsed = d1.valueOf() - d2.valueOf();
  for (const u in units)
    if (Math.abs(elapsed) > units[u] || u === 'second') return rtf.format(Math.round(elapsed / units[u]), u as Unit);
  return '';
};

export default makeRelDate;
