import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useTranslations } from "next-intl";
import React from "react";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { NewCollectionInputs } from "@/types/schemas";

type CustomFieldSectionProps = {
  fields: FieldArrayWithId<NewCollectionInputs>[];
  register: UseFormRegister<NewCollectionInputs>;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<NewCollectionInputs>;
};

export default function CustomFieldSection({
  fields,
  errors,
  register,
  remove,
}: CustomFieldSectionProps) {
  const t = useTranslations("collection.new");

  return (
    <>
      {fields.map((_, index) => (
        <div key={index} className="flex flex-col gap-3 min-w-min">
          <Input
            {...register(`customFields.${index}.name`)}
            isRequired
            errorMessage={errors.customFields?.[index]?.name?.message}
            isInvalid={!!errors.customFields?.[index]?.name}
            label={t("name")}
            variant="bordered"
          />
          <Checkbox {...register(`customFields.${index}.isRequired`)}>
            {t("required")}
          </Checkbox>
          <Select
            {...register(`customFields.${index}.type`)}
            isRequired
            aria-label={t("type")}
            isInvalid={!!errors.customFields?.[index]?.type}
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

          <Button
            className="self-end"
            color="danger"
            title="Remove Custom Field"
            onClick={() => remove(index)}
          >
            {t("delete")}
          </Button>
        </div>
      ))}
    </>
  );
}
