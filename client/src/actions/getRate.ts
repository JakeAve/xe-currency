interface ConversionResponse {
  data: ExchangeRate;
  success: boolean;
}

const getRate = async (base: CurrencyCode, quote: CurrencyCode): Promise<ConversionResponse> => {
  try {
    const res = await fetch(`./api/convert?base=${base}&quote=${quote}`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const { rate, date } = await res.json();
    return { success: true, data: { rate, date: new Date(date) } };
  } catch {
    return { success: false, data: { rate: 0, date: new Date() } };
  }
};

export default getRate;
