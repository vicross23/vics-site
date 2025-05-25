import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 5,
      minFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("---- FILE UPLOAD ----");
    console.log("File uploaded to: ", file.ufsUrl);
    return { imageUrl: file.ufsUrl };
  }),
} satisfies FileRouter;

export type UploadRouter = typeof fileRouter;
