import { Checkbox } from "@nextui-org/checkbox";
import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { CustomFieldsForForm } from "@/types/collection";

type CustomFieldInputProps = {
  customFields: CustomFieldsForForm[];
  customFieldId: number | undefined;
  registerValue: UseFormRegisterReturn<`customFieldValues.${number}.value`>;
  error: FieldError | undefined;
};

export default function CustomFieldInput({
  customFields,
  registerValue,
  customFieldId,
  error,
}: CustomFieldInputProps) {
  const customField = customFields.find((cf) => cf.id == customFieldId);

  if (!customField) return <></>;

  return renderInput(customField, registerValue, error);
}

function renderInput(
  customField: CustomFieldsForForm,
  registerValue: UseFormRegisterReturn<`customFieldValues.${number}.value`>,
  error: FieldError | undefined,
) {
  const { isRequired, name, type } = customField;

  switch (type) {
    case "STRING":
    case "DATE":
      return (
        <Input
          {...registerValue}
          isInvalid={!!error}
          isRequired={isRequired}
          label={name}
          variant="bordered"
        />
      );
    case "INTEGER":
      return (
        <Input
          {...registerValue}
          isInvalid={!!error}
          isRequired={isRequired}
          label={name}
          type="number"
          variant="bordered"
        />
      );
    case "BOOLEAN":
      return (
        <Checkbox
          {...registerValue}
          isInvalid={!!error}
          isRequired={isRequired}
        >
          {name}
        </Checkbox>
      );
    case "TEXT":
      return (
        <Textarea
          {...registerValue}
          isInvalid={!!error}
          isRequired={isRequired}
          label={name}
          variant="bordered"
        />
      );
  }
}
