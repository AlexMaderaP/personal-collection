import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createCustomField } from "@/utils/actions/customFields";
import {
  NewCustomFieldInputs,
  newCustomFieldFormSchema,
} from "@/types/schemas";
import { useRouter } from "@/navigation";

type NewCustomFieldFormProps = {
  collectionId: number;
  setAddingFalse: () => void;
};

export default function NewCustomFieldForm({
  collectionId,
  setAddingFalse,
}: NewCustomFieldFormProps) {
  const t = useTranslations("collection.new");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewCustomFieldInputs>({
    resolver: zodResolver(newCustomFieldFormSchema),
  });

  const router = useRouter();

  const newCustomFieldHandler: SubmitHandler<NewCustomFieldInputs> = async (
    data,
  ) => {
    const result = await createCustomField(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Custom field updated succesfully");
    setAddingFalse();
    router.refresh();
  };

  return (
    <form
      className="flex flex-col gap-3 min-w-min"
      onSubmit={handleSubmit(newCustomFieldHandler)}
    >
      <input type="hidden" {...register("collectionId")} value={collectionId} />
      <Input
        {...register("name")}
        isRequired
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
        label={t("name")}
        variant="bordered"
      />
      <Checkbox {...register("isRequired")}>{t("required")}</Checkbox>
      <Select
        {...register("type")}
        isRequired
        aria-label={t("type")}
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
      <div className="self-end">
        <Button
          className="mr-4"
          color="danger"
          isDisabled={isSubmitting}
          title="Delete Custom Field"
          onClick={() => setAddingFalse()}
        >
          {t("delete")}
        </Button>

        <Button
          color="primary"
          isDisabled={isSubmitting}
          title="Save Custom Field"
          type="submit"
        >
          {t("save")}
        </Button>
      </div>
    </form>
  );
}
