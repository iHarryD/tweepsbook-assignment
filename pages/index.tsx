import { useRef, useState } from "react";
import { OTPScreen, PhoneForm } from "../components";

export default function Home() {
  const [screen, setScreen] = useState<1 | 2>(1);
  const phoneNumberRef = useRef<string>("");
  return (
    <div className="flex justify-center items-center">
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
    </div>
  );
}
