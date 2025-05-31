"use server";

import prisma from "~/server/db";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";

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
  revalidateTag("allImages");
};
