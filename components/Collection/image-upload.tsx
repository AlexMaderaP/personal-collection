"use client";
import { useState } from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";
import { UseFormSetValue } from "react-hook-form";

import { XIcon } from "../icons";

import { UploadDropzone } from "@/utils/uploadthing";
import { NewCollectionInputs } from "@/types/schemas";

type FileUploadProps = {
  setValue: UseFormSetValue<NewCollectionInputs>;
};

export default function ImageUpload({ setValue }: FileUploadProps) {
  const [imageUrl, setImageUrl] = useState("");

  if (imageUrl) {
    return (
      <div className="relative">
        <Image
          alt="uploaded-image"
          as={NextImage}
          height={200}
          src={imageUrl}
          width={300}
        />
        <button
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm z-30"
          onClick={() => {
            setValue("imageUrl", "");
            setImageUrl("");
          }}
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <UploadDropzone
        config={{ mode: "auto" }}
        endpoint="collectionImage"
        onClientUploadComplete={(res) => {
          const url = res?.[0].url;

          setValue("imageUrl", url);
          setImageUrl(url);
        }}
      />
    </>
  );
}
