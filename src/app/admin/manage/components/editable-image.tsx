"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, XIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { deleteImage } from "~/server/db/actions";

export default function EditableImage({
  image,
}: {
  image: {
    title: string | null;
    date: string;
    location: string;
    page: string;
    imageUrl: string;
    id: string;
    createdAt: string;
  };
}) {
  const deleteImageMutation = useMutation({
    mutationFn: async () => {
      await deleteImage(image.id, image.imageUrl);
      toast.success("Image deleted successfully!");
    },
  });

  return (
    <div className="relative">
      <AspectRatio ratio={1}>
        <Image
          alt="Manage image"
          src={image.imageUrl}
          style={{ objectFit: "cover" }}
          fill
          className="rounded-sm"
        />
      </AspectRatio>
      <div className="absolute -top-3 -right-3">
        <Button
          size="icon"
          className="rounded-full bg-destructive size-7 cursor-pointer"
          onClick={() => deleteImageMutation.mutateAsync()}
          disabled={deleteImageMutation.isPending}
        >
          {deleteImageMutation.isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <XIcon />
          )}
        </Button>
      </div>
    </div>
  );
}
