"use client";
import { Button } from "@nextui-org/button";
import React from "react";

function DeleteButton({ id, message }: { id: string; message: string }) {
  function handleDelete(id: string) {
    console.log("to delete ", id);
  }

  return (
    <Button className="mr-4" color="danger" onClick={() => handleDelete(id)}>
      {message}
    </Button>
  );
}

export default DeleteButton;
