"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/navigation";

export default function DeleteButton({
  id,
  message,
}: {
  id: number;
  message: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("User Deleted Successfully");
      } else {
        toast.error("Sorry, try again");
      }
      router.push("/user/dashboard");
    } catch (error) {
      toast.error("Sorry, an error ocurred");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button color="danger" isDisabled={loading} onClick={handleDelete}>
      {message}
    </Button>
  );
}
