import { ToastTypes } from "../../types";

export function Toast({
  text,
  type = ToastTypes.NORMAL,
}: {
  text: string;
  type?: ToastTypes;
}) {
  return (
    <div
      className={`fixed bottom-5 right-5 py-3 px-4 rounded-md w-[min(80vw, 15rem)] font-semibold text-black border-current min-w-fit opacity-70 ${
        type === ToastTypes.NORMAL
          ? "bg-accent"
          : type === ToastTypes.SUCCESS
          ? "bg-success-green"
          : "bg-error-red"
      }`}
    >
      <span>{text}</span>
    </div>
  );
}
