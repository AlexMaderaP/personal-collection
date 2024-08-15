import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { CustomField } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import DeleteCustomField from "./delete-custom-field-button";

import { editCustomField } from "@/utils/actions/customFields";
import {
  EditCustomFieldInputs,
  editCustomFieldFormSchema,
} from "@/types/schemas";

type EditCustomFieldFormProps = {
  customField: CustomField;
};

export default function EditCustomFieldForm({
  customField,
}: EditCustomFieldFormProps) {
  const t = useTranslations("collection.new");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditCustomFieldInputs>({
    resolver: zodResolver(editCustomFieldFormSchema),
    defaultValues: {
      id: customField.id,
      name: customField.name,
      isRequired: customField.isRequired,
      type: customField.type,
    },
  });

  const isLoading = isSubmitting || isDeleting;

  const editCustomFieldHandler: SubmitHandler<EditCustomFieldInputs> = async (
    data,
  ) => {
    const result = await editCustomField(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Custom Field updated succesfully");
    setIsEditing(false);
  };

  return (
    <form
      className="flex flex-col gap-3 min-w-min"
      onSubmit={handleSubmit(editCustomFieldHandler)}
    >
      <Input
        {...register(`name`)}
        isRequired
        errorMessage={errors.name?.message}
        isDisabled={!isEditing}
        isInvalid={!!errors.name}
        label={t("name")}
        variant="bordered"
      />
      <Checkbox {...register("isRequired")} isDisabled={!isEditing}>
        {t("required")}
      </Checkbox>
      <Select
        {...register("type")}
        isRequired
        aria-label={t("type")}
        isDisabled={!isEditing}
        isInvalid={!!errors.type}
        label={t("type")}
        selectionMode="single"
        variant="bordered"
      >
        <SelectItem key="STRING">String</SelectItem>
        <SelectItem key="INTEGER">Integer</SelectItem>
        <SelectItem key="TEXT">Text</SelectItem>
        <SelectItem key="BOOLEAN">Boolean</SelectItem>
        <SelectItem key="DATE">Date</SelectItem>
      </Select>
      {isEditing ? (
        <div className="self-end">
          <DeleteCustomField
            collectionId={customField.collectionId}
            deleteMessage={t("delete")}
            id={customField.id}
            isLoading={isLoading}
            setIsLoading={setIsDeleting}
          />

          <Button
            color="primary"
            isDisabled={isLoading}
            title="Save Custom Field"
            type="submit"
          >
            {t("save")}
          </Button>
        </div>
      ) : (
        <Button
          className="self-end"
          color="primary"
          title="Save Custom Field"
          type="submit"
          onClick={() => setIsEditing(true)}
        >
          {t("edit")}
        </Button>
      )}
    </form>
  );
}
