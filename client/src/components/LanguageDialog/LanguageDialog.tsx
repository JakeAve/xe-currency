import './styles.scss';
import { useLanguageContext } from '../../providers/LanguageProvider';
import Dialog from '../Dialog/Dialog';
import { FormEvent, useState } from 'react';
import { UseDialogControls } from '../Dialog/hooks/useDialogControls';

interface Props {
  dialogControls: UseDialogControls;
}

const LanguageDialog = (props: Props): JSX.Element => {
  const { dialogControls } = props;
  const { strings: translatedStrings, availableLangs, code, setSelectedLang } = useLanguageContext();
  const [val, setVal] = useState(code);

  const options = availableLangs
    .sort(({ code: codeA }, { code: codeB }) => codeA.localeCompare(codeB))
    .map(({ code, name }, index) => (
      <option value={code} key={index}>
        {name}
      </option>
    ));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newLang = formData.get('lang') as string;
    setSelectedLang(newLang);

    dialogControls.setOpen(false);
  };

  return (
    <Dialog dialogControls={dialogControls}>
      <form className="lang-dialog" onSubmit={onSubmit}>
        <label>{translatedStrings.langSelect}</label>
        <select name="lang" className="lang-select" value={val} onChange={(e) => setVal(e.target.value)}>
          {options}
        </select>
        <button className="dank-btn">{translatedStrings.submitLangChange}</button>
      </form>
    </Dialog>
  );
};

export default LanguageDialog;
