import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useTranslations } from "next-intl";
import { UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";
import { Chip } from "@nextui-org/chip";
import toast from "react-hot-toast";

import { useTagList } from "./useTagList";

import { NewItemInputs } from "@/types/schemas";
import { createNewTag } from "@/utils/db/items";

type TagsInputProps = {
  append: UseFieldArrayAppend<NewItemInputs, "tags">;
  remove: UseFieldArrayRemove;
  tagsInItem: {
    id: number;
  }[];
};

function TagsInput({ append, remove, tagsInItem }: TagsInputProps) {
  const [_, setIsOpen] = useState(false);
  const { tags, isLoading, refetchTags } = useTagList();
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const t = useTranslations("item.tags");

  function handleSelectionChange(key: React.Key) {
    if (key !== "") {
      if (!tagsInItem || !tagsInItem.some((tag) => tag.id == key)) {
        append({ id: key as number });
      }
    }
  }

  async function handleEnter(
    e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent
  ) {
    if (e.key === "Enter") {
      if (!tags.some((tag) => tag.name === newTagName)) {
        try {
          setIsCreatingTag(true);
          const newTag = await createNewTag(newTagName);

          if (!newTag) {
            toast("Error when creating new tag");
          }
          append({ id: newTag.id });
          refetchTags();
          setNewTagName("");
        } catch (error) {
          console.log(error);
        } finally {
          setIsCreatingTag(false);
        }
      }
    }
  }

  function onInputChange(value: string) {
    setNewTagName(value);
  }

  function handleRemoveTag(id: number) {
    const index = tagsInItem.findIndex((tag) => tag.id == id);

    if (index !== -1) {
      remove(index);
    }
  }

  function getTagName(id: number) {
    const tag = tags.find((tag) => tag.id == id);

    return tag?.name;
  }

  return (
    <>
      <Autocomplete
        allowsCustomValue
        className="max-w-xs"
        defaultItems={tags}
        inputValue={newTagName}
        isLoading={isLoading || isCreatingTag}
        label={t("label")}
        placeholder={t("placeholder")}
        variant="bordered"
        onInputChange={onInputChange}
        onKeyDown={(e) => handleEnter(e)}
        onOpenChange={setIsOpen}
        onSelectionChange={(key) => handleSelectionChange(key || "")}
      >
        {(tags) => (
          <AutocompleteItem key={tags.id} className="capitalize">
            {tags.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <div className="flex flex-wrap gap-2">
        {tagsInItem &&
          tagsInItem.map((tag) => {
            return (
              <Chip
                key={tag.id}
                color="primary"
                onClose={() => handleRemoveTag(tag.id)}
              >
                {getTagName(tag.id)}
              </Chip>
            );
          })}
      </div>
    </>
  );
}

export default TagsInput;
