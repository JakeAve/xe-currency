import { useState } from 'react';

export type UseDialogControls = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
};

const useDialogControls = (): UseDialogControls => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!open);
  return { open, setOpen, toggleOpen };
};

export default useDialogControls;
