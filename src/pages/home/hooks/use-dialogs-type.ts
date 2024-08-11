import { useState } from 'react';

export const useDialogsType = () => {
  const [dialogsType, setDialogsType] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const toggleDialog = (type: string) => {
    setDialogsType((prev) => ({ ...prev, [type]: !prev[type as keyof typeof dialogsType] }));
  };

  return {
    dialogsType,
    toggleDialog,
  };
};
