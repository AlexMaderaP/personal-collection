import { Select, SelectItem } from "@nextui-org/select";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import toast from "react-hot-toast";

import { getCategories } from "@/utils/db/categories";

export default function SelectCategory({
  register,
  errorCategory,
  label,
}: {
  register: UseFormRegisterReturn;
  errorCategory: FieldError | undefined;
  label: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await getCategories();

        setCategories(categories);
      } catch (e) {
        toast.error(`${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Select
      {...register}
      isRequired
      aria-label={label}
      errorMessage={errorCategory?.message}
      isDisabled={loading}
      isInvalid={!!errorCategory}
      items={categories}
      label={label}
      selectionMode="single"
      variant="bordered"
    >
      {(category) => (
        <SelectItem key={category.id} value={category.id}>
          {category.name}
        </SelectItem>
      )}
    </Select>
  );
}
