"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "~/components/ui/form";
import FormEntry from "~/app/admin/upload/components/form-entry";
import { Button } from "~/components/ui/button";
import { CirclePlusIcon } from "lucide-react";

const UploadForm = () => {
  const uploadFormSchema = z.object({
    entries: z.array(
      z.object({
        title: z.string().optional(),
        location: z
          .string({ message: "Location is required" })
          .refine((value) => value !== "", {
            message: "Location cannot be empty",
          }),
        date: z
          .string({ message: "Image is required" })
          .refine((value) => value !== "", {
            message: "Date cannot be empty",
          }),
        page: z
          .string({ message: "Page is required" })
          .refine((value) => value !== "", {
            message: "Page cannot be empty",
          }),
        imageUrl: z
          .string({ message: "Image is required" })
          .refine((value) => value !== "", {
            message: "Must supply an image",
          }),
      })
    ),
  });

  const submitHandler = (values: z.infer<typeof uploadFormSchema>) => {
    console.log(values);
  };

  const emptyEntry = {
    title: "",
    location: "",
    date: "",
    page: "",
    imageUrl: "",
  };

  const uploadForm = useForm<z.infer<typeof uploadFormSchema>>({
    resolver: zodResolver(uploadFormSchema),
    reValidateMode: "onChange",
    defaultValues: {
      entries: [emptyEntry],
    },
  });

  const { fields, append } = useFieldArray({
    control: uploadForm.control,
    name: "entries",
  });

  return (
    <Form {...uploadForm}>
      <form
        onSubmit={uploadForm.handleSubmit(submitHandler)}
        className="flex flex-col gap-8"
      >
        {fields.map((field, index) => (
          <FormEntry key={field.id} entryIndex={index} />
        ))}

        {fields.length !== 5 && (
          <div
            className="cursor-pointer border p-4 rounded-md border-dashed border-muted-foreground inline-flex gap-2 text-muted-foreground justify-center items-center"
            onClick={() => append(emptyEntry)}
          >
            <CirclePlusIcon className="size-5" />
            Add new field
          </div>
        )}
        <Button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 cursor-pointer"
        >
          Save & Upload
        </Button>
      </form>
    </Form>
  );
};

export default UploadForm;
