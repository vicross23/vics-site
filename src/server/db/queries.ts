import prisma from "~/server/db";

export const getImages = async () => {
  const images = await prisma.images.findMany();
  return images;
};
