"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavigationItem from "~/components/navigation/navigation-item";

const NavigationBar = () => {
  const pathname = usePathname();

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
        <NavigationItem
          text="recent"
          href="/recent"
          isActive={pathname === "/recent"}
        />
        <NavigationItem
          text="travel"
          href="/travel"
          isActive={pathname === "/travel"}
        />
        <NavigationItem
          text="lifestyle"
          href="/lifestyle"
          isActive={pathname === "/lifestyle"}
        />
        <NavigationItem
          text="about me"
          href="/about"
          isActive={pathname === "/about"}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
