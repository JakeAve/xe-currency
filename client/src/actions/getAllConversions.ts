const mapAllConversions = (rates: any, date: Date) => {
  return Object.entries(rates)
    .map(([currenciesSeparatedWithColon, rate]) => {
      const currencies = currenciesSeparatedWithColon.split(':');
      const baseCurrency = currencies[0];
      const quoteCurrency = currencies[1];
      const exchangeRate = {
        rate: rate as number,
        date,
      };
      const conversion = {
        base: 1,
        baseCurrency,
        quoteCurrency,
        exchangeRate,
      };
      return conversion as ConverterState;
    })
    .sort((a, b) => a.baseCurrency.localeCompare(b.baseCurrency));
};

const getAllConversions = async (): Promise<ConverterState[]> => {
  try {
    const res = await fetch(`./api/convert/all`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const { rates, date } = await res.json();
    const allConversions = mapAllConversions(rates, new Date(date));
    return allConversions;
  } catch {
    return [];
  }
};

export default getAllConversions;
