import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto max-w-screen-2xl px-2.5 sm:px-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
