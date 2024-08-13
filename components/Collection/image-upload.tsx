"use client";
import { useState } from "react";
import NextImage from "next/image";
import { Image } from "@nextui-org/image";

import { XIcon } from "../icons";

import { UploadDropzone } from "@/utils/uploadthing";

type FileUploadProps = {
  setValue: (str: string) => void;
  imageUrlProp?: string | "";
};

export default function ImageUpload({
  setValue,
  imageUrlProp,
}: FileUploadProps) {
  const [imageUrl, setImageUrl] = useState(imageUrlProp);

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
            setValue("");
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

          setValue(url);
          setImageUrl(url);
        }}
      />
    </>
  );
}
