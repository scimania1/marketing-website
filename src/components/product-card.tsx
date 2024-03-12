import { ProductProjected } from "@/lib/data";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { playfairDisplay } from "@/app/fonts";
import { Badge } from "@/components/ui/badge";
import { Container, Diameter } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProductCard(props: ProductProjected) {
  const { _id, name, sizes, material, imageURL } = props;
  const linkedName = name
    .split("/")[0]
    .trim()
    .replaceAll(" ", "-")
    .replaceAll("&", "and");
  const mainName = name.split("/").at(0) || name;
  let displayMaterial = material;
  if (displayMaterial.includes(":")) {
    displayMaterial = displayMaterial.split(":")[1].trim().split(",")[0];
  }
  return (
    <Card className="flex flex-col rounded-md pb-1 outline-none ring-offset-background transition-all duration-150 ease-in-quad focus-within:scale-[1.01] focus-within:ring-2 focus-within:ring-muted-foreground focus-within:ring-offset-2 hover:scale-[1.01]">
      <picture className="grid place-content-center rounded-t-md bg-slate-100">
        <Image
          src={imageURL}
          alt={name}
          width={300}
          height={300}
          className="h-44 w-full bg-slate-100 object-contain"
        />
      </picture>
      <div className="flex-1 flex-grow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle
              className={`overflow-hidden overflow-ellipsis whitespace-nowrap py-1 tracking-wide ${playfairDisplay.className}`}
            >
              {mainName.trim()}
            </CardTitle>
          </div>
          <CardDescription className="">{name}</CardDescription>
        </CardHeader>
      </div>
      <div className="px-6">
        <Separator orientation="horizontal" />
      </div>
      {/* FIXME: Make the responsiveness better here */}
      <CardFooter className="flex items-center justify-between gap-1 py-3 lg:flex-col lg:items-stretch lg:justify-normal">
        <div className="flex items-center gap-2 lg:pb-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="gap-1 py-1" variant="secondary">
                  <Diameter size={20} />
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {sizes !== ""
                      ? sizes.slice(0, 7) + (sizes.length > 7 ? " ..." : "")
                      : "No Info"}
                  </span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {sizes !== "" ? sizes : "No Info"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className="hidden gap-1 py-1 lg:inline-flex"
                  variant="outline"
                >
                  <Container size={20} />
                  <span className="max-w-[7ch] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {displayMaterial.slice(0, 7) +
                      (displayMaterial.length > 7 ? " ..." : "")}
                  </span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>{displayMaterial}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Link
          href={`/products/${linkedName}/${_id}`}
          scroll={false}
          className="inline-flex items-center justify-center lg:flex-grow"
        >
          <Button className="block lg:flex-grow" variant="default">
            <span>View</span>
            <span className="hidden lg:inline">{` Product`}</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
