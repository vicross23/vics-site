"use client";

import { useDropzone } from "@uploadthing/react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  generateClientDropzoneAccept,
  generatePermittedFileTypes,
} from "uploadthing/client";

import { FileImageIcon, Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";

import { pageSelectorOptions } from "~/app/admin/constants";
import { useUploadThing } from "~/app/utils";
import { Checkbox } from "~/components/ui/checkbox";
import { cn } from "~/lib/utils";
import { utDeleteFiles } from "~/server/uploadthing/actions";

const FormEntry = ({ entryIndex }: { entryIndex: number }) => {
  const { control, setValue } = useFormContext();
  const [selectedImage, setSelectedImage] = useState<File[] | undefined>();
  const [isDeleting, setIsDeleting] = useState(false);

  const onDrop = useCallback((selectedImage: File[]) => {
    setSelectedImage(selectedImage);
  }, []);

  const { startUpload, routeConfig, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (result) => {
        const uploadedImage = result[0];

        setValue(`entries.${entryIndex}.imageUrl`, uploadedImage.ufsUrl, {
          shouldValidate: true,
        });
      },
      onUploadError: () => {
        toast.error("Image upload failed!");
      },
    }
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 16e6,
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
    multiple: false,
  });

  const selectOptions = useMemo(() => {
    return pageSelectorOptions.map((option) => (
      <SelectItem
        key={`entry-${entryIndex}-select-option-${option.value}`}
        value={option.value}
      >
        {option.label}
      </SelectItem>
    ));
  }, []);

  const pageValue = useWatch({ name: `entries.${entryIndex}.page` });

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      startUpload(selectedImage);
    }
  }, [selectedImage, startUpload]);

  const onImageClear = async (fileUrl: string) => {
    setIsDeleting(true);
    await utDeleteFiles([fileUrl]);
    setValue(`entries.${entryIndex}.imageUrl`, undefined, {
      shouldValidate: true,
    });
    setSelectedImage(undefined);
    setIsDeleting(false);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <FormField
          control={control}
          name={`entries.${entryIndex}.imageUrl`}
          render={({ field }) => (
            <div>
              <div className="h-full flex flex-col">
                <div
                  {...getRootProps()}
                  className={cn(
                    "w-full h-full flex flex-col rounded-lg border border-dashed items-center text-sm",
                    !selectedImage && "py-4"
                  )}
                >
                  {(isUploading || isDeleting) && (
                    <div className="grow flex flex-col justify-center items-center py-4">
                      <Loader2Icon className="animate-spin size-10" />
                      {isUploading && <span>Image is uploading...</span>}
                      {isDeleting && <span>Image is deleting...</span>}
                    </div>
                  )}
                  {!selectedImage && !isUploading && (
                    <div className="grow flex flex-col justify-center gap-2">
                      <Input {...getInputProps()} />
                      <div className="border border-gray-300 rounded-full p-3 bg-transparent mx-auto">
                        <FileImageIcon className="size-6 text-gray-600" />
                      </div>
                      <div className="flex flex-col items-center">
                        <span>Drop your image here</span>
                        <span className="text-xs text-muted-foreground">
                          PNG or JPG (max. 16MB)
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="cursor-pointer"
                        type="button"
                      >
                        <UploadIcon />
                        Select Image
                      </Button>
                    </div>
                  )}
                  {selectedImage && field.value && !isDeleting && (
                    <AspectRatio ratio={1}>
                      <Image
                        alt="uploaded image"
                        src={field.value}
                        style={{ objectFit: "cover" }}
                        fill
                        className="rounded-lg"
                      />
                    </AspectRatio>
                  )}
                </div>
                <FormMessage className="inline md:hidden my-2" />
                {selectedImage && (
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      className="cursor-pointer rounded-full size-7"
                      type="button"
                      onClick={() => onImageClear(field.value)}
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                )}
              </div>
              <FormMessage className="hidden md:inline my-2" />
            </div>
          )}
        />

        <div className="flex flex-col gap-4">
          {/* TITLE */}
          <FormField
            control={control}
            name={`entries.${entryIndex}.title`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Title (Optional)" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* LOCATION */}
          <FormField
            control={control}
            name={`entries.${entryIndex}.location`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DATE */}
          <FormField
            control={control}
            name={`entries.${entryIndex}.date`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Month, Year" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PAGE */}
          <FormField
            control={control}
            name={`entries.${entryIndex}.page`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a page..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{selectOptions}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISSMALL CHECKBOX */}
          {pageValue === "home" && (
            <FormField
              control={control}
              name={`entries.${entryIndex}.isSmall`}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 !cursor-pointer">
                  <FormControl>
                    <Checkbox
                      className="cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">
                    Is image for small screens?
                  </FormLabel>
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
      <Separator />
    </Fragment>
  );
};

export default FormEntry;
