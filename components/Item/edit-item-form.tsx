"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import toast from "react-hot-toast";

import TagsInput from "./tags-input";
import CustomFieldInput from "./custom-field-input";

import { editItemFormSchema, EditItemInputs } from "@/types/schemas";
import { ItemForEditableForm } from "@/types/items";
import { CustomFieldsForForm } from "@/types/collection";
import { useRouter } from "@/navigation";
("react-hot-toast");
import { updateItem } from "@/utils/actions/item";

type EditItemFormProps = {
  item: ItemForEditableForm;
  customFields: CustomFieldsForForm[];
};

export default function EditItemForm({
  item,
  customFields,
}: EditItemFormProps) {
  const t = useTranslations("item.new");

  const defaultCustomFieldValues = item.customFieldValues.map((field) => ({
    id: field.id,
    customFieldId: field.customFieldId,
    value: field.value || "",
  }));

  const defaultTags = item.tags.map((tag) => ({ id: tag.id }));

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EditItemInputs>({
    resolver: zodResolver(editItemFormSchema),
    defaultValues: {
      id: item.id,
      collectionId: item.collectionId,
      name: item.name,
      tags: defaultTags,
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

  const createNewItemHandler: SubmitHandler<EditItemInputs> = async (data) => {
    const result = await updateItem(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Item, updated succesfully");
    router.push(`/collection/${item.collectionId}`);
  };

  return (
    <form
      className="flex flex-wrap gap-6"
      onSubmit={handleSubmit(createNewItemHandler)}
    >
      <div className="flex flex-col gap-3 basis-1/3">
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
            {t("edit")}
          </Button>
        </div>
      </div>
    </form>
  );
}
