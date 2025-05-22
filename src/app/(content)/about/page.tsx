import { Mrs_Sheppards } from "next/font/google";
import { cn } from "~/lib/utils";

const mrsSheppards = Mrs_Sheppards({
  weight: "400",
  subsets: ["latin"],
});

export default function About() {
  return (
    <div className="grow flex flex-col justify-center items-center gap-16 w-full bg-[#F1FF85] p-10 text-center text-[#0037CF]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <p>Image goes here</p>
        </div>
        <div className="col-span-2 text-center md:text-left flex flex-col gap-5">
          <h1 className={cn("text-5xl font-bold", mrsSheppards.className)}>
            Nice to meet you!
          </h1>
          <p>
            My name is Victoria and I&apos;m a photographer based in Vancouver,
            Canada.
          </p>
          <p>
            My work aims to capture the fleeting beauty of the everyday.
            I&apos;m drawn to the energy of youth, the atmosphere of nightlife,
            and the in-between spaces we pass through and exist in.{" "}
          </p>
          <p>
            My influences are artist like Ryan McGinley, Wolfgang Tillmans, and
            Jordan Curtis Hughes - photographers who blur the line between
            documentation and art, and who embrace the imperfection of human
            connection and experiences.{" "}
          </p>
          <p>
            I have a documentary approach to shooting, creating images that are
            intimate, observational, and candid.{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
