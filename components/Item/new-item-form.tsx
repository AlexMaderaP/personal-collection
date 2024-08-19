"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import TagsInput from "./tags-input";

import { CustomFieldsForForm } from "@/types/collection";
import { newItemFormSchema, NewItemInputs } from "@/types/schemas";

type NewItemFormProps = {
  customFields: CustomFieldsForForm[];
  collectionId: string;
};

export default function NewItemForm({
  customFields,
  collectionId,
}: NewItemFormProps) {
  const t = useTranslations("item.new");
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewItemInputs>({
    resolver: zodResolver(newItemFormSchema),
  });

  const { append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const tagsInItem = getValues("tags");

  const createNewItemHandler: SubmitHandler<NewItemInputs> = async (data) => {
    console.log(data);
    // const result = await createNewCollection(data);

    // if (!result) {
    //   toast.error("Sorry, try again");

    //   return;
    // }
    // toast.success("Collection, created succesfully");
    // router.push(`/collection/${result.id}`);
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
        <TagsInput append={append} remove={remove} tagsInItem={tagsInItem} />
      </div>
      <div className="flex flex-col gap-3 min-w-72">
        {/* <CustomFieldSection
          errors={errors}
          fields={fields}
          register={register}
          remove={remove}
        /> */}
        {/* <Button
          fullWidth
          color="primary"
          onClick={() =>
            append({ name: "", isRequired: false, type: "STRING" })
          }
        >
          {t("addCustomField")}
        </Button> */}
        <div className=" flex justify-end mt-auto">
          <Button color="success" disabled={isSubmitting} type="submit">
            {t("create")}
          </Button>
        </div>
      </div>
    </form>
  );
}
