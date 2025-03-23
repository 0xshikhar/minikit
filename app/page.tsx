import { PayBlock } from "@/components/Pay";
// import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import { useSession } from "next-auth/react";
import { SignIn } from "@/components/sign-in";

export default function Home() {
  console.log("unique id: v.0.0.1");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <SignIn />
      {/* <VerifyBlock />
      <PayBlock /> */}
    </main>
  );
}
