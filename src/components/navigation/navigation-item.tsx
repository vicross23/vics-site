import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";

export default function NavigationItem({
  text,
  href,
  isActive,
}: {
  text: string;
  href: string;
  isActive: boolean;
}) {
  return (
    <Link
      className={cn(
        "px-4 py-2 cursor-pointer hover:underline decoration-solid underline-offset-2",
        isActive && "text-secondary bg-blue-600 hover:bg-blue-500"
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
