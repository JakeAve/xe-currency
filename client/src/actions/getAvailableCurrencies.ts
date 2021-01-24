import currencies from '../lang/currencies/en_US.json';

const getAvailableCurrencies = async (): Promise<Currency[]> => {
  try {
    const res = await fetch(`./api/currencies`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const { currencies: codes }: { currencies: Array<CurrencyCode> } = await res.json();
    const availables = (currencies as Currency[]).filter(({ code }: Currency) => codes.includes(code));
    return availables;
  } catch {
    return [];
  }
};

export default getAvailableCurrencies;
