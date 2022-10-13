import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { ToastContext as IToastContext, ToastAttributes } from "../types";

const ToastContext = createContext({} as IToastContext);

export function ToastProvider({ children }: { children: ReactElement }) {
  const [toastAttributes, setToastAttributes] = useState<ToastAttributes>(null);

  useEffect(() => {
    let timeoutID: NodeJS.Timer | undefined;
    if (toastAttributes) {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        setToastAttributes(null);
      }, 3000);
    }
    return () => clearTimeout(timeoutID);
  }, [toastAttributes]);

  return (
    <ToastContext.Provider value={{ toastAttributes, setToastAttributes }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
