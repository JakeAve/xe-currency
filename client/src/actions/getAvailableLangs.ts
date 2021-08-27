import { AvailableLang } from '../providers/LanguageProvider';
import defaultLang from '../lang';

interface AvailableLangsResponse {
  success: boolean;
  data: { availableLangs: AvailableLang[] };
}

export const getAvailableLangs = async (): Promise<AvailableLangsResponse> => {
  try {
    const res = await fetch(`./api/lang/available-langs`);
    if (!res.ok) throw new Error(`Api call failed: ${res.url}`);
    const availableLangs = await res.json();
    return { success: true, data: { availableLangs } };
  } catch {
    return { success: false, data: { availableLangs: [{ name: defaultLang.name, code: defaultLang.code }] } };
  }
};
