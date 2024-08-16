"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/navigation";

export default function DeleteCollectionButton({
  id,
  message,
  isIcon = false,
}: {
  id: number;
  message: string | JSX.Element;
  isIcon?: boolean;
  refresh?: boolean;
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
        toast.success("Collection Deleted Successfully");
      } else {
        toast.error("Sorry, try again");
      }
      router.push("/user/dashboard");
      router.refresh();
    } catch (error) {
      toast.error("Sorry, an error ocurred");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      color="danger"
      isDisabled={loading}
      isIconOnly={isIcon}
      variant={isIcon ? "light" : "solid"}
      onClick={handleDelete}
    >
      {message}
    </Button>
  );
}
