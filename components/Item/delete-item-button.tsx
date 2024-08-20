"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/navigation";

export default function DeleteItemButton({
  id,
  message,
  collectionId,
  isIcon = false,
}: {
  id: number;
  message: string | JSX.Element;
  collectionId: number;
  isIcon?: boolean;
  refresh?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Item Deleted Successfully");
      } else {
        toast.error("Sorry, try again");
      }
      router.push(`/collection/${collectionId}`);
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
