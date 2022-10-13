export function VerifiedScreen({ phoneNumber }: { phoneNumber: string }) {
  return (
    <div className=" text-light-grey font-bold text-lrg">
      Successfully logged in as {phoneNumber}
    </div>
  );
}
