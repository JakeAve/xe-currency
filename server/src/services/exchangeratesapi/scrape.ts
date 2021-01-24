import request from '../../utilities/request';
import dateString from '../../utilities/dateString';
import fs from 'fs';

const scrape = async () => {
  const url = `https://api.exchangeratesapi.io/latest`;
  const json = await request(url, { method: 'GET' });
  const euroObj = JSON.parse(json);
  const currencies = Object.keys(euroObj.rates);
  const otherObjs = await Promise.all(
    currencies.map(async (c) => {
      const response = await request(url + '?base=' + c, { method: 'GET' });
      return JSON.parse(response);
    }),
  );
  const data = [euroObj, ...otherObjs];
  const { rates, base, date } = euroObj;
  const symbols = [...Object.keys(rates), base];
  const conversions = { date, rates: { 'EUR:EUR': 1 } };
  for (const s1 of symbols) {
    const { rates: s1Rates } = data.find(({ base }) => base === s1);
    for (const [s2, num] of Object.entries(s1Rates)) {
      const key = `${s1}:${s2}`;
      conversions.rates[key] = num;
    }
  }
  const fileName = dateString(date);
  fs.writeFileSync(`./src/data/convert/${fileName}.json`, JSON.stringify(conversions));
  fs.writeFileSync(`./src/data/currencies/${fileName}.json`, JSON.stringify([...currencies, 'EUR']));
};

scrape();
