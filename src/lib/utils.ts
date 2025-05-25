import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
