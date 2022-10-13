import { ChangeEvent, useEffect, useRef, useState } from "react";

const initialCooldownPeriod = 30;

export function OTPScreen({
  toPreviousScreenFunc,
  phoneNumber,
}: {
  toPreviousScreenFunc: () => void;
  phoneNumber: string;
}) {
  const [otp, setOTP] = useState<string>("");
  const [cooldownPeriod, setCooldownPeriod] = useState<number>(
    initialCooldownPeriod
  );
  const allInputsRefs = useRef<HTMLInputElement[]>([]);
  const cooldownIntervalID = useRef<NodeJS.Timer | undefined>(undefined);

  useEffect(() => {
    allInputsRefs.current[0]?.focus();
    cooldownIntervalID.current = setInterval(() => {
      setCooldownPeriod((prev) => {
        if (prev === 1) {
          clearInterval(cooldownIntervalID.current);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownIntervalID.current);
  }, []);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>, index: number) {
    const currentInput = allInputsRefs.current.map((input) => input.value);
    setOTP(currentInput.join(""));
    if (index === allInputsRefs.current.length - 1) return;
    if (
      e.target.value.length &&
      allInputsRefs.current[index + 1].value.length === 0
    ) {
      allInputsRefs.current[index + 1].focus();
    }
  }

  function resetInputs() {
    allInputsRefs.current.forEach((input) => (input.value = ""));
    setOTP("");
  }

  function resendOTP() {
    clearInterval(cooldownIntervalID.current);
    setCooldownPeriod(initialCooldownPeriod);
    cooldownIntervalID.current = setInterval(() => {
      setCooldownPeriod((prev) => {
        if (prev === 1) {
          clearInterval(cooldownIntervalID.current);
        }
        return prev - 1;
      });
    }, 1000);
  }

  function verifyOTP() {}

  return (
    <div>
      <div>
        <div className="mb-3 font-semibold opacity-70 text-end">
          Sent to {phoneNumber}
        </div>
        <div className=" flex gap-4">
          {Array.from(Array(6)).map((value, index) => (
            <input
              key={index}
              ref={(ref) => ref && (allInputsRefs.current[index] = ref)}
              className={`aspect-square py-2 px-2 border-2 rounded-md border-solid w-otp-input h-otp-input font-bold text-lrg text-center focus:scale-105  transition ease-in-out duration-100 ${
                allInputsRefs.current?.[index]?.value.length
                  ? "border-success-green"
                  : "border-light-grey"
              }`}
              maxLength={1}
              onChange={(e) => onChangeHandler(e, index)}
            />
          ))}
        </div>
        <div className="my-3 flex justify-between font-medium">
          <button
            disabled={!!cooldownPeriod}
            className={`underline ${cooldownPeriod ? "opacity-60" : ""}`}
            onClick={() => resendOTP()}
          >
            {!cooldownPeriod ? "Resend OTP" : `Resend in ${cooldownPeriod}s`}
          </button>
          <button className="underline" onClick={() => resetInputs()}>
            Reset
          </button>
        </div>
      </div>
      <button
        disabled={otp.length !== 6}
        className={`btn-primary w-full my-3 box-border  ${
          otp.length < 6 ? "bg-light-grey text-[#fff]" : ""
        }`}
      >
        Confirm OTP
      </button>
      <button
        className="btn-secondary w-full box-border"
        onClick={() => toPreviousScreenFunc()}
      >
        Change Phone Number
      </button>
    </div>
  );
}
