import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/navigation";

type ToogleUserStatusButtonProps = {
  id: string;
  status: string;
  statusMessage: string;
};

export default function ToogleUserStatusButton({
  id,
  status,
  statusMessage,
}: ToogleUserStatusButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleStatusChange(action: "ban" | "unban") {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success(
          action === "ban"
            ? "User Blocked Successfully"
            : "User Unblocked Successfully",
        );
      } else {
        toast.error("Sorry, try again");
      }
      router.refresh();
    } catch (err) {
      toast.error("Sorry, an error ocurred");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      isDisabled={loading}
      onClick={() => handleStatusChange(status === "Blocked" ? "unban" : "ban")}
    >
      {statusMessage}
    </Button>
  );
}
