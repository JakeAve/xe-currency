const getRate = async (base: CurrencyCode, quote: CurrencyCode): Promise<ExchangeRate> => {
  try {
    const res = await fetch(`./api/convert?base=${base}&quote=${quote}`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const { rate, date } = await res.json();
    return { rate, date: new Date(date) };
  } catch {
    return { rate: 1, date: new Date() };
  }
};

export default getRate;
