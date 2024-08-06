import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

import { useRouter } from "@/navigation";

type UserToggleProps = {
  id: string;
  role: string;
  userMessage: string;
  adminMessage: string;
};

export default function ToggleUserRoleButton({
  id,
  role,
  userMessage,
  adminMessage,
}: UserToggleProps) {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const role = formData.get("role") as string;

    try {
      const response = await fetch("/api/admin/toggleRole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("User Role Updated Successfully");
      } else {
        toast.error("Sorry, try again");
      }
      if (data.requiresSignOut) {
        await signOut();
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
    <form onSubmit={handleSubmit}>
      <input name="id" type="hidden" value={id} />
      <input
        name="role"
        type="hidden"
        value={role === "admin" ? "user" : "admin"}
      />
      <Button isDisabled={loading} type="submit">
        {role === "admin" ? userMessage : adminMessage}
      </Button>
    </form>
  );
}
