import { useLanguageContext } from '../../providers/LanguageProvider';
import { UseDialogControls } from './hooks/useDialogControls';
import './styles.scss';

interface Props {
  dialogControls: UseDialogControls;
  className?: string;
  children?: React.ReactNode;
}

const Dialog = (props: Props): JSX.Element => {
  const { dialogControls, className, children } = props;

  const { open, setOpen } = dialogControls;

  const { strings: translatedStrings } = useLanguageContext();

  return (
    <>
      <div className="backdrop" data-open={open} onClick={() => setOpen(false)}></div>
      <dialog open={open} className="dialog-component">
        <button className="dialog-close-btn" aria-label={translatedStrings.close} onClick={() => setOpen(false)}>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="window-close"
            className="svg-inline--fa fa-window-close fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
            ></path>
          </svg>
        </button>
        <div className={`dialog-content ${className}`}>{children}</div>
      </dialog>
    </>
  );
};

export default Dialog;
