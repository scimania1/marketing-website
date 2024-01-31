"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export default function ProductDescriptionCollapsible({
  details,
  detailName,
}: {
  details: string[];
  detailName: string;
}) {
  const [open, setOpen] = useState(false);
  console.log({ details, detailName });
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="py-3 space-y-3">
        <div className="flex justify-between">
          <h3 className="uppercase text-lg font-bold lg:text-xl">
            {detailName}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {details.at(0) === "" ? (
            <Badge
              className="text-md text-muted-foreground py-1 px-3 lg:px-5 lg:text-lg"
              variant="secondary"
            >
              N/A
            </Badge>
          ) : null}
          {details[0] !== "" &&
            details.slice(0, 3).map((detail, idx) => (
              <Badge
                key={detail + idx}
                className="text-md text-muted-foreground py-1 px-3 lg:px-5 lg:text-lg"
                variant="secondary"
              >
                {detail}
              </Badge>
            ))}
          {details.length > 3 && (
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown size={20} />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          )}
        </div>
        <CollapsibleContent className="flex flex-wrap gap-2">
          {details.slice(3).map((detail, idx) => (
            <Badge
              key={detail + idx}
              className="text-md text-muted-foreground py-1 px-3 lg:text-lg"
              variant="secondary"
            >
              {detail}
            </Badge>
          ))}
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
