import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

import { useRouter } from "@/navigation";

type DeleteCustomFieldProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  deleteMessage: string;
  id: number;
  collectionId: number;
};

function DeleteCustomField({
  isLoading,
  setIsLoading,
  deleteMessage,
  id,
  collectionId,
}: DeleteCustomFieldProps) {
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/collections/${collectionId}/customFields/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        toast.success("Custom Field deleted successfully");
      } else {
        toast.error("Sorry, try again");
      }
      router.refresh();
    } catch (error) {
      toast.error("Sorry, an error ocurred");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      className="mr-4"
      color="danger"
      isDisabled={isLoading}
      title="Delete Custom Field"
      onClick={handleDelete}
    >
      {deleteMessage}
    </Button>
  );
}

export default DeleteCustomField;
