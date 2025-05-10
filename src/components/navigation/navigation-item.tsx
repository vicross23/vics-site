import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function NavigationItem({
  text,
  href,
  isActive,
  colour,
}: {
  text: string;
  href: string;
  isActive: boolean;
  colour: string;
}) {
  let colourClasses = "";

  switch (colour) {
    case "primary":
      colourClasses = "text-primary";
      break;
    case "secondary":
      colourClasses = "text-secondary";
      break;
    case "accent":
      colourClasses = "text-accent";
      break;
    default:
      colourClasses = "bg-blue-500 hover:bg-blue-500/90 text-white";
      break;
  }

  return (
    <Link
      className={cn(
        "px-4 py-2 cursor-pointer hover:underline decoration-solid underline-offset-2",
        isActive && "text-secondary",
        colourClasses
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
