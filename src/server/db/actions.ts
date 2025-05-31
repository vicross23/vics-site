"use server";

import prisma from "~/server/db";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
import { utDeleteFiles } from "~/server/uploadthing/actions";

export const saveImages = async (
  images: {
    title?: string;
    location: string;
    date: string;
    page: string;
    imageUrl: string;
  }[]
) => {
  const createdAt = dayjs().toISOString();
  const imagesWithTimestamps = images.map((image) => ({ ...image, createdAt }));

  await prisma.images.createMany({
    data: imagesWithTimestamps,
  });
};

export const deleteImage = async (imageId: string, imageUrl: string) => {
  try {
    await utDeleteFiles([imageUrl]);
    console.log("----- DELETED IMAGE FROM UPLOADTHING -----");
  } catch {
    return;
  }

  await prisma.images.delete({ where: { id: imageId } });
  console.log("----- DELETED IMAGE FROM MONGO -----");

  revalidatePath("/admin/manage");
};
