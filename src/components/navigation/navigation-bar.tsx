"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Mrs_Sheppards } from "next/font/google";

import NavigationItem from "~/components/navigation/navigation-item";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { MenuIcon } from "lucide-react";

const mrsSheppards = Mrs_Sheppards({
  weight: "400",
  subsets: ["latin"],
});

const NavigationBar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { text: "people", href: "/people" },
    { text: "places", href: "/places" },
    { text: "things", href: "/things" },
    { text: "about me", href: "/about" },
  ];

  return (
    <div className="sticky top-0 z-10 left-0 w-screen h-15 px-4 gap-4 flex items-center justify-between bg-background">
      <div className="">
        <Link
          href="/"
          className={`${mrsSheppards.className} text-4xl tracking-wide`}
        >
          Victoria Ross
        </Link>
      </div>
      <div className="hidden min-[575px]:flex">
        {navigationItems.map((item) => (
          <NavigationItem
            key={`navigation-item-${item.text}`}
            text={item.text}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </div>
      <Sheet>
        <SheetTrigger className="block min-[575px]:hidden">
          <MenuIcon size={24} />
        </SheetTrigger>
        <SheetContent side="right" className="pt-10">
          <SheetTitle />
          {navigationItems.map((item) => (
            <NavigationItem
              key={`navigation-item-${item.text}`}
              text={item.text}
              href={item.href}
              isActive={pathname === item.href}
            />
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationBar;
