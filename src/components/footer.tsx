import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { nunitoSans, playfairDisplay } from "@/app/fonts";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="mt-4 border border-t-secondary bg-background/75">
      <MaxWidthWrapper className="grid py-4">
        <div className="grid gap-4 place-items-center">
          <span
            className={`tracking-wider text-muted-foreground ${playfairDisplay.className}`}
          >
            {" "}
            Modern Engineers (India){" "}
          </span>
          <div className="flex items-center justify-center gap-10">
            <Image
              src="/GouravDLXLogo.png"
              alt="Gourav DLX Logo"
              width={80}
              height={80}
              className="w-20"
            />
            <Image
              src="/Logo.png"
              alt="Modern Engineers (India) Logo"
              width={80}
              height={80}
              className="w-14"
            />
          </div>
        </div>
        <div className="flex px-12 pt-6">
          <Separator orientation="vertical" className="hidden" />
          <Separator orientation="horizontal" className="md:hidden" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
