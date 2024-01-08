import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import Image from "next/image";
import NavMain from "./nav-main";
import NavMobile from "./nav-mobile";

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-30 md:static">
      <nav
        className="border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
        aria-label="primary-navigation"
      >
        <MaxWidthWrapper>
          <div className="flex items-center justify-between px-6 py-3 md:gap-4 md:px-8 lg:gap-6">
            <Link
              className="z-30 w-14 outline-none rounded-md relative ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              href="/"
            >
              <Image
                src="/Logo.png"
                className="z-30 h-auto w-14 object-contain outline-none"
                alt="Modern Engineers (India) Logo"
                priority
                width={56}
                height={47}
                quality={100}
              />
            </Link>
            <NavMobile />
            <NavMain />
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
}
