"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import navigationLinks from "@/config/links";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { ArrowRight } from "lucide-react";

function HamburgerIcon() {
  return (
    <div className="hamburger-icon flex h-full w-full flex-col items-center justify-center"></div>
  );
}

export default function NavMobile() {
  const pathname = usePathname();
  const isActiveLink = (url: string) => {
    return url === pathname;
  };

  // handle the scrolling when hamburger menu is open
  return (
    <div className="md:hidden">
      {/* FIXME: Change the Icon */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hamburger-btn group relative h-8 w-8 rounded-lg p-1 sm:h-10 sm:w-10"
            aria-label="Button to open the Navigation Links Menu"
          >
            <HamburgerIcon />
          </Button>
        </SheetTrigger>
        {/*the main drawer is going to be here*/}
        <SheetContent>
          <div
            className="flex flex-col gap-2 bg-background py-8"
            aria-label="Mobile Navigation Links container"
          >
            {navigationLinks.map((navigationLink, idx) => (
              <React.Fragment key={idx}>
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "flex w-full justify-between items-center gap-4 rounded-md px-4 py-3 text-muted-foreground",
                      isActiveLink(navigationLink.url) &&
                        "bg-muted text-foreground",
                    )}
                    href={navigationLink.url}
                  >
                    <span>{navigationLink.name}</span>
                    <ArrowRight size={20} />
                  </Link>
                </SheetClose>
                {idx !== navigationLinks.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
