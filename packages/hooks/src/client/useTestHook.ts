import { useState } from "react";

export const useTestHook = () => {
  const [test, setTest] = useState("test");
  return { test, setTest };
};
