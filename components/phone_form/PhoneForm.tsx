import { MutableRefObject, useState } from "react";

export function PhoneForm({
  toNextScreenFunc,
  phoneNumberRef,
}: {
  toNextScreenFunc: () => void;
  phoneNumberRef: MutableRefObject<string>;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <input
        value={phoneNumber}
        className="py-input-y px-input-x border border-solid border-accent rounded-btn-input tracking-wide text-center text-[1.2rem] placeholder:text-mid"
        placeholder="Enter your phone number"
        maxLength={10}
        onChange={(e) => {
          if (
            "0123456789".includes(
              e.target.value.charAt(e.target.value.length - 1)
            )
          ) {
            setPhoneNumber(e.target.value);
          }
        }}
      />
      <button
        disabled={phoneNumber.length !== 10}
        className="btn-primary w-full box-border"
        onClick={() => {
          if (phoneNumber.length !== 10) return;
          phoneNumberRef.current = phoneNumber;
          toNextScreenFunc();
        }}
      >
        Send OTP
      </button>
    </div>
  );
}
