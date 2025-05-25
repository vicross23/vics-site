"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CirclePlusIcon, Loader2Icon } from "lucide-react";

import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import FormEntry from "~/app/admin/upload/components/form-entry";

import { saveImages } from "~/server/db/actions";

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const submitHandler = async (values: z.infer<typeof uploadFormSchema>) => {
    setIsSubmitting(true);
    try {
      await saveImages(values.entries);
      window.localStorage.setItem("show_success_toast", "true");
      window.location.reload();
    } catch {
      toast.error("Something went wrong! Values were not saved.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (window.localStorage.getItem("show_success_toast") === "true") {
      toast.success("Images saved successfully!");
      window.localStorage.removeItem("show_success_toast");
    }
  }, []);

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
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="animate-spin" />}
          Save & Upload
        </Button>
      </form>
    </Form>
  );
};

export default UploadForm;
