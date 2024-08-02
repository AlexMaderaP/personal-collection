import { SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

import { Link } from "@/navigation";

function InitSession({ signInMessage }: { signInMessage: string }) {
  return (
    <>
      <SignedOut>
        <Link className="flex justify-start items-center gap-1" href="/sign-in">
          <p className="font-bold text-default-900">{signInMessage}</p>
        </Link>
      </SignedOut>
      <UserButton />
    </>
  );
}

export default InitSession;
