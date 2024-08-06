import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "@/navigation";

type DeleteUserButtonProps = {
  id: string;
  deleteMessage: string;
};

export default function DeleteUserButton({
  id,
  deleteMessage,
}: DeleteUserButtonProps) {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("User Deleted Successfully");
      } else {
        toast.error("Sorry, try again");
      }
      if (data.requiresSignOut) await signOut();
      router.refresh();
    } catch (err) {
      toast.error("Sorry, an error ocurred");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button color="danger" isDisabled={loading} onClick={handleDelete}>
      {deleteMessage}
    </Button>
  );
}
