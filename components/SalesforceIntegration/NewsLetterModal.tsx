"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import createNewAccount from "@/utils/actions/account";
import { NewsLetterInputs, NewsLetterSchema } from "@/types/schemas";

type NewsletterModalProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export default function NewsletterModal({
  firstName,
  lastName,
  email,
  phone,
}: NewsletterModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const t = useTranslations("collection.newsletter");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsLetterSchema>({
    resolver: zodResolver(NewsLetterInputs),
    defaultValues: {
      firstName,
      lastName,
      email,
      phone,
    },
  });

  const createAccount: SubmitHandler<NewsLetterSchema> = async (data) => {
    const result = await createNewAccount(data);

    if (!result) {
      toast.error("Sorry, try again");

      return;
    }
    toast.success("Collection, created successfully");
    onClose();
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        {t("getNews")}
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("getNewsMessage")}
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-wrap gap-6"
                  onSubmit={handleSubmit(createAccount)}
                >
                  <Input
                    {...register("firstName")}
                    isRequired
                    errorMessage={errors.firstName?.message}
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.firstName}
                    label={t("firstName")}
                    variant="bordered"
                  />
                  <Input
                    {...register("lastName")}
                    isRequired
                    errorMessage={errors.lastName?.message}
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.lastName}
                    label={t("lastName")}
                    variant="bordered"
                  />
                  <Input
                    {...register("email")}
                    isRequired
                    errorMessage={errors.email?.message}
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.email}
                    label={t("email")}
                    variant="bordered"
                  />
                  <Input
                    {...register("phone")}
                    isRequired
                    errorMessage={errors.phone?.message}
                    isDisabled={isSubmitting}
                    isInvalid={!!errors.phone}
                    label={t("phone")}
                    variant="bordered"
                  />
                  <div className="ml-auto">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      {t("close")}
                    </Button>
                    <Button
                      className="ml-4"
                      color="success"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {t("subscribe")}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
