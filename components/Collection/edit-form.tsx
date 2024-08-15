"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Textarea } from "@nextui-org/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useState } from "react";

import ImageUpload from "./image-upload";
import EditCustomFieldForm from "./CustomField/edit-custom-field-form";
import NewCustomFieldForm from "./CustomField/new-custom-field-form";

import { CollectionWithFieldsCategory } from "@/types/collection";
import {
  editCollectionFormSchema,
  EditCollectionInputs,
} from "@/types/schemas";
import { useRouter } from "@/navigation";
import { updateCollection } from "@/utils/actions/collection";

type EditFormProps = {
  collection: CollectionWithFieldsCategory;
};

export default function EditForm({ collection }: EditFormProps) {
  const t = useTranslations("collection.new");
  const [isAddingField, setIsAddingField] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditCollectionInputs>({
    resolver: zodResolver(editCollectionFormSchema),
    defaultValues: {
      id: collection.id,
      name: collection.name,
      description: collection.descripion,
      categoryId: collection.categoryId,
      imageUrl: collection.imageUrl || "",
    },
  });

  const router = useRouter();

  const editCollectionHandler: SubmitHandler<EditCollectionInputs> = async (
    data,
  ) => {
    const result = await updateCollection(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Collection, updated succesfully");
    router.push(`/collection/${result.id}`);
  };

  return (
    <div className="flex flex-wrap gap-6">
      <form
        className="flex flex-col gap-3"
        onSubmit={handleSubmit(editCollectionHandler)}
      >
        <input {...register("id")} type="hidden" value={collection.id} />
        <input
          {...register("categoryId")}
          type="hidden"
          value={collection.categoryId}
        />
        <Input
          {...register("name")}
          isRequired
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          label={t("name")}
          variant="bordered"
        />
        <Textarea
          {...register("description")}
          isRequired
          errorMessage={errors.description?.message}
          isInvalid={!!errors.description}
          label={t("description")}
          variant="bordered"
        />
        <ImageUpload
          imageUrlProp={collection.imageUrl || ""}
          setValue={(str: string) => setValue("imageUrl", str)}
        />
        <div className=" flex justify-end mt-auto">
          <Button color="success" disabled={isSubmitting} type="submit">
            {t("save")}
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-3 min-w-72">
        {collection.customFields.map((customField) => (
          <EditCustomFieldForm key={customField.id} customField={customField} />
        ))}
        {isAddingField ? (
          <NewCustomFieldForm
            collectionId={collection.id}
            setAddingFalse={() => setIsAddingField(false)}
          />
        ) : (
          <Button
            fullWidth
            color="primary"
            onClick={() => setIsAddingField(true)}
          >
            {t("addCustomField")}
          </Button>
        )}
      </div>
    </div>
  );
}
