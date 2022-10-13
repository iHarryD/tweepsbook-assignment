import { Dispatch, SetStateAction } from "react";

export enum ToastTypes {
  ERROR = "ERROR",
  NORMAL = "NORMAL",
  SUCCESS = "success",
}

export type ToastAttributes = { text: string; type: ToastTypes } | null;

export type ToastContext = {
  toastAttributes: ToastAttributes;
  setToastAttributes: Dispatch<SetStateAction<ToastAttributes>>;
};
