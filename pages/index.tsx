import { useRef, useState } from "react";
import { OTPScreen, PhoneForm, Toast } from "../components";
import { useToast } from "../contexts/Toast.context";

export default function Home() {
  const [screen, setScreen] = useState<1 | 2>(1);
  const phoneNumberRef = useRef<string>("");
  const { toastAttributes } = useToast();
  return (
    <>
      {toastAttributes && (
        <Toast text={toastAttributes.text} type={toastAttributes.type} />
      )}
      <main className="flex justify-center items-center h-main">
        {screen === 1 ? (
          <PhoneForm
            toNextScreenFunc={() => setScreen(2)}
            phoneNumberRef={phoneNumberRef}
          />
        ) : (
          <OTPScreen
            toPreviousScreenFunc={() => setScreen(1)}
            phoneNumber={phoneNumberRef.current}
          />
        )}
      </main>
    </>
  );
}
