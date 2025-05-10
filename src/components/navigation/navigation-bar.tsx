"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavigationItem from "~/components/navigation/navigation-item";

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
        <Link href="/">
          <Image
            src="/wordmark_dark.svg"
            alt="Victoria Ross"
            height={40}
            width={160}
          />
        </Link>
      </div>
      <div>
        {navigationItems.map((item) => (
          <NavigationItem
            key={`navigation-item-${item.text}`}
            text={item.text}
            href={item.href}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
