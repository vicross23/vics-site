import Link from "next/link";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { PiPaperPlaneTiltBold } from "react-icons/pi";

import { Mrs_Sheppards } from "next/font/google";

const mrsSheppards = Mrs_Sheppards({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <div className="flex flex-col w-full px-6 py-5 gap-4 mb-5 border-t border-gray-300">
      <p className={`${mrsSheppards.className} text-3xl tracking-wide`}>
        Shoot with me!
      </p>
      <div className="flex flex-row gap-2 items-center">
        <PiPaperPlaneTiltBold size={24} />
        <Link
          href="mailto:victoriarossphoto@gmail.com"
          className="text-lg hover:underline"
        >
          victoriarossphoto@gmail.com
        </Link>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <SiInstagram />
        <Link
          href="https://www.instagram.com/vic.took.this/"
          className="text-lg hover:underline"
        >
          @vic.took.this
        </Link>
      </div>
    </div>
  );
}
