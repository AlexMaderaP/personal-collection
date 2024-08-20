import { Tag } from "@prisma/client";
import { useEffect, useState } from "react";

import { getTags } from "@/utils/db/tags";

export function useTagList() {
  const [tags, setTags] = useState<Tag[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTags = async () => {
    try {
      setIsLoading(true);
      const tags = await getTags();

      setTags(tags);
    } catch (error) {
      console.error("There was an:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchTags = () => {
    loadTags();
  };

  useEffect(() => {
    loadTags();
  }, []);

  return {
    tags,
    isLoading,
    refetchTags,
  };
}
