"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { createNewCollection } from "./_action";

import { title } from "@/components/primitives";
import SelectCategory from "@/components/Collection/select-category";
import ImageUpload from "@/components/Collection/image-upload";
import CustomFieldSection from "@/components/Collection/custom-field-section";
import { useRouter } from "@/navigation";
import { newCollectionFormSchema, NewCollectionInputs } from "@/types/schemas";

export default function NewCollection() {
  const { userId } = useAuth();
  const t = useTranslations("collection.new");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewCollectionInputs>({
    resolver: zodResolver(newCollectionFormSchema),
  });
  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields",
  });

  const createNewCollectionHandler: SubmitHandler<NewCollectionInputs> = async (
    data,
  ) => {
    const result = await createNewCollection(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Collection, created succesfully");
    router.push(`/collection/${result.id}`);
  };

  return (
    <>
      <h1 className={title()}>{t("title")} </h1>
      <div className="m-4 w-full">
        <form
          className="flex flex-wrap gap-6"
          onSubmit={handleSubmit(createNewCollectionHandler)}
        >
          <div className="flex flex-col gap-3">
            <input
              {...register("userId")}
              type="hidden"
              value={userId as string}
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
            <SelectCategory
              errorCategory={errors.categoryId}
              label={t("category")}
              register={register("categoryId")}
            />
            <ImageUpload setValue={(str) => setValue("imageUrl", str)} />
          </div>
          <div className="flex flex-col gap-3 min-w-72">
            <CustomFieldSection
              errors={errors}
              fields={fields}
              register={register}
              remove={remove}
            />
            <Button
              fullWidth
              color="primary"
              onClick={() =>
                append({ name: "", isRequired: false, type: "STRING" })
              }
            >
              {t("addCustomField")}
            </Button>
            <div className=" flex justify-end mt-auto">
              <Button color="success" disabled={isSubmitting} type="submit">
                {t("create")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
