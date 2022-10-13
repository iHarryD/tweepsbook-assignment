import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useToast } from "../../contexts/Toast.context";
import { baseAxiosInstance } from "../../services/baseInstance";
import { OTPStates, ToastTypes, VerificationStates } from "../../types";
import { VerifiedScreen } from "../verified_screen/VerifiedScreen";
import axios from "axios";

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
  const { setToastAttributes } = useToast();
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStates>(VerificationStates.UNVERIFIED);
  const [otpStatus, setOTPStatus] = useState<OTPStates>(OTPStates.SENDING);

  useEffect(() => {
    sendOTP();
    return () => clearInterval(cooldownIntervalID.current);
  }, []);

  useEffect(() => {
    if (cooldownPeriod === 0) clearInterval(cooldownIntervalID.current);
  }, [cooldownPeriod]);

  async function sendOTP() {
    try {
      setOTPStatus(OTPStates.SENDING);
      await baseAxiosInstance().post("/login", {
        data: { phone: "+91" + phoneNumber },
      });
      setOTPStatus(OTPStates.SENT);
      setToastAttributes({
        text: "OTP sent to your phone number.",
        type: ToastTypes.NORMAL,
      });
      cooldownIntervalID.current = setInterval(() => {
        setCooldownPeriod((prev) => prev - 1);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setOTPStatus(OTPStates.FAILED_TO_SEND);
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "Something went wrong.";
      setToastAttributes({
        text: errorMessage,
        type: ToastTypes.ERROR,
      });
    }
  }

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
    resetInputs();
    sendOTP();
  }

  async function verifyOTP() {
    try {
      setVerificationStatus(VerificationStates.VERIFING);
      await baseAxiosInstance().post("/login/verify", {
        data: { otp, phone: "+91" + phoneNumber },
      });
      setToastAttributes({ text: "OTP verified.", type: ToastTypes.SUCCESS });
      setTimeout(
        () => setVerificationStatus(VerificationStates.VERIFIED),
        3000
      );
    } catch (err: any) {
      console.error(err);
      setVerificationStatus(VerificationStates.UNVERIFIED);
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message
        : "Something went wrong.";
      setToastAttributes({
        text: errorMessage,
        type: ToastTypes.ERROR,
      });
    }
  }

  if (verificationStatus === VerificationStates.VERIFIED)
    return <VerifiedScreen phoneNumber={phoneNumber} />;

  return (
    <div>
      <div>
        <div className="mb-3 font-semibold opacity-70 text-end">
          Your phone number is {phoneNumber}
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
        <div className="my-3 flex justify-between">
          {(() => {
            if (otpStatus === OTPStates.SENDING) {
              return <span>Sending OTP...</span>;
            } else if (otpStatus === OTPStates.FAILED_TO_SEND) {
              return <span>Could not send OTP</span>;
            }
            return (
              <button
                disabled={!!cooldownPeriod}
                className="underline"
                onClick={() => resendOTP()}
              >
                {!cooldownPeriod
                  ? "Resend OTP"
                  : `Resend in ${cooldownPeriod}s`}
              </button>
            );
          })()}
          <button className="underline" onClick={() => resetInputs()}>
            Reset
          </button>
        </div>
      </div>
      <button
        disabled={
          otp.length !== 6 || verificationStatus === VerificationStates.VERIFING
        }
        className="btn-primary w-full my-3 box-border"
        onClick={() => verifyOTP()}
      >
        {verificationStatus === VerificationStates.VERIFING
          ? "Verifing..."
          : "Confirm OTP"}
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
