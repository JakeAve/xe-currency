import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { getAvailableLangs } from '../actions/getAvailableLangs';
import { getLang } from '../actions/getLang';
import useQuery from '../hooks/useQuery';
import defaultLang from '../lang/default-lang.gen.json';
import { TranslatedStrings } from '../lang/default-lang.gen';
const defaultSelectedLang = { name: defaultLang.name, code: defaultLang.code };

export interface AvailableLang {
  code: string;
  name: string;
}

export interface LanguageInterface {
  code: string;
  name: string;
  currencies: Currency[];
  strings: TranslatedStrings;
}

interface LanguageContext {
  setSelectedLang: Dispatch<SetStateAction<string>> | (() => void);
  strings: TranslatedStrings;
  availableLangs: AvailableLang[];
  currencies: Currency[];
  code: string;
  name: string;
  codeToCurrency: (code: CurrencyCode) => Currency;
}

const languageContext = createContext<LanguageContext>({
  setSelectedLang: () => {
    /* noop */
  },
  codeToCurrency(code) {
    throw new Error('codeToCurrency not implemented');
  },
  ...(defaultLang as LanguageInterface),
  availableLangs: [defaultSelectedLang],
});

interface Props {
  children?: JSX.Element;
}

export const LanguageProvider = (props: Props): JSX.Element => {
  const { children } = props;
  const { getParam, setParam } = useQuery();
  const [selectedLang, setSelectedLang] = useState<string>(getParam('lang') || defaultSelectedLang.code);
  const [availableLangs, setAvailableLangs] = useState<AvailableLang[]>([defaultSelectedLang]);
  const [lang, _setLang] = useState<LanguageInterface>(defaultLang as LanguageInterface);
  const setLang = (lang: LanguageInterface): void => {
    _setLang(lang);
    document.documentElement.setAttribute('lang', lang.code);
  };
  const codeToCurrency = (code: CurrencyCode): Currency => {
    const curr = lang.currencies.find((currency) => currency.code === code);
    if (!curr) return { code, symbol: '', name: code };
    return curr;
  };

  useEffect(() => {
    getAvailableLangs()
      .then((response) => setAvailableLangs(response.data.availableLangs))
      .catch((response) => setAvailableLangs(response.data.availableLangs));
  }, []);

  useEffect(() => {
    getLang(selectedLang)
      .then((response) => {
        setLang(response.data.lang);
        setParam('lang', response.data.lang.code);
      })
      .catch((response) => {
        setLang(response.data.lang);
        setParam('lang', response.data.lang.code);
      });
  }, [selectedLang]);

  return (
    <languageContext.Provider value={{ setSelectedLang, availableLangs, codeToCurrency, ...lang }}>
      {children}
    </languageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContext => useContext(languageContext);
