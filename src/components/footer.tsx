import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <div className="border py-6 md:py-8 lg:py-12 xl:py-16 border-t-secondary bg-background/75">
      <MaxWidthWrapper className="grid">
        <div className="grid gap-4 place-items-center">
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
      <h2 className="text-center pt-4 text-md lg:text-xl">
        Copyright &copy; 2024 Modern Engineers (India)
      </h2>
      <h2 className="text-center pt-1 text-md lg:text-xl">
        All Rights Reserved
      </h2>
    </div>
  );
}
