import { useState } from "react";

export const useUserMenuHook = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string>("DEFAULT");

  return { open, setOpen, menu, setMenu };
};
