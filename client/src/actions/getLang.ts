import { LanguageInterface } from '../providers/LanguageProvider';
import defaultLang from '../lang';

interface GetLangResponse {
  success: boolean;
  data: { lang: LanguageInterface };
}

export const getLang = async (code: string): Promise<GetLangResponse> => {
  try {
    const res = await fetch(`./api/lang/${code}`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const lang = await res.json();
    return { success: true, data: { lang } };
  } catch {
    console.log('defaulting the lang');
    console.log(defaultLang);
    return { success: false, data: { lang: defaultLang as LanguageInterface } };
  }
};
