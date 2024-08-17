"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

import { newItemFormSchema, newItemInputs } from "@/types/schemas";
import { CustomFieldsForForm } from "@/types/collection";

type NewItemFormProps = {
  customFields: CustomFieldsForForm[];
  collectionId: string;
};

export default function NewItemForm({
  customFields,
  collectionId,
}: NewItemFormProps) {
  const t = useTranslations("collection.new");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<newItemInputs>({
    resolver: zodResolver(newItemFormSchema),
  });

  return <div>NewItemForm</div>;
}
