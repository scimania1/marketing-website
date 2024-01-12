"use client";

import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

function ModalInner() {}

export default function Modal({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading } = useSWR(
    `http://localhost:3000/api/products/${id}`,
    async (url) => await fetch(url).then((res) => res.json()),
  );
  console.log(data);

  function onDismiss() {
    router.back();
  }
  return (
    <Sheet defaultOpen={true}>
      <SheetContent
        side="bottom"
        forceMount
        onEscapeKeyDown={onDismiss}
        onPointerDownOutside={onDismiss}
      >
        <ScrollArea className="h-[80vh]" type="auto">
          {isLoading && <h1>Loading Product Data...</h1>}
          {children}
          {data !== undefined ? (
            <Image
              src={data.imageURL}
              height={800}
              width={800}
              alt={data.name}
            />
          ) : null}
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={onDismiss}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
