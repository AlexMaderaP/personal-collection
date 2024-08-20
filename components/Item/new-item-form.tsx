"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";

import TagsInput from "./tags-input";
import CustomFieldInput from "./custom-field-input";

import { CustomFieldsForForm } from "@/types/collection";
import { newItemFormSchema, NewItemInputs } from "@/types/schemas";
import { createNewItem } from "@/utils/actions/item";
import { useRouter } from "@/navigation";

type NewItemFormProps = {
  customFields: CustomFieldsForForm[];
  collectionId: string;
};

export default function NewItemForm({
  customFields,
  collectionId,
}: NewItemFormProps) {
  const t = useTranslations("item.new");

  const defaultCustomFieldValues = customFields.map((field) => ({
    customFieldId: field.id,
    value: "",
  }));

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewItemInputs>({
    resolver: zodResolver(newItemFormSchema),
    defaultValues: {
      customFieldValues: defaultCustomFieldValues,
    },
  });

  const router = useRouter();
  const tagArray = useFieldArray({
    control,
    name: "tags",
  });

  const { fields } = useFieldArray({
    control,
    name: "customFieldValues",
  });

  const tagsInItem = getValues("tags");
  const customFieldValues = getValues("customFieldValues");

  const createNewItemHandler: SubmitHandler<NewItemInputs> = async (data) => {
    const result = await createNewItem(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Item, created succesfully");
    router.push(`/collection/${collectionId}`);
  };

  return (
    <form
      className="flex flex-wrap gap-6"
      onSubmit={handleSubmit(createNewItemHandler)}
    >
      <div className="flex flex-col gap-3 basis-1/3">
        <input
          {...register("collectionId")}
          type="hidden"
          value={collectionId}
        />
        <Input
          {...register("name")}
          isRequired
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label={t("name")}
          variant="bordered"
        />
        <TagsInput
          errors={errors}
          tagArray={tagArray}
          tagsInItem={tagsInItem}
        />
      </div>
      <div className="flex flex-col gap-3 min-w-72">
        {fields.map((field, index) => (
          <CustomFieldInput
            key={field.id}
            customFieldId={
              customFieldValues && customFieldValues[index].customFieldId
            }
            customFields={customFields}
            error={errors.customFieldValues?.[index]?.value}
            registerValue={register(`customFieldValues.${index}.value`)}
          />
        ))}

        <div className=" flex justify-end mt-auto">
          <Button color="success" disabled={isSubmitting} type="submit">
            {t("create")}
          </Button>
        </div>
      </div>
    </form>
  );
}
