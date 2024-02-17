import Image from "next/image";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z"></path>
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-6 h-6", className)}
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const categories = [
  "agricultural implement parts",
  "CNC turned parts",
  "fasteners",
  "john deere weight bolts",
  "sheet metal parts",
];

interface FooterLinkBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

function FooterLinkBlock(props: FooterLinkBlockProps) {
  return (
    <div
      className={cn("text-sm md:text-base lg:text-lg", props.className)}
      {...props}
    >
      {props.children}
    </div>
  );
}

interface FooterLinkBlockTitleProps
  extends React.ComponentPropsWithoutRef<"h2"> {
  children: React.ReactNode;
}

function FooterLinkBlockTitle(props: FooterLinkBlockTitleProps) {
  return (
    <h2
      className={cn(
        "text-base py-1 font-medium md:text-lg lg:text-xl",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </h2>
  );
}

interface FooterLinkBlockContentProps
  extends React.ComponentPropsWithoutRef<"ul"> {
  children: React.ReactNode;
}

function FooterLinkBlockContent(props: FooterLinkBlockContentProps) {
  return (
    <ul
      className={cn(
        "list-none space-y-1 text-muted-foreground",
        props.children,
      )}
      {...props}
    >
      {props.children}
    </ul>
  );
}

interface FooterLinkBlockItemProps
  extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

function FooterLinkBlockItem(props: FooterLinkBlockItemProps) {
  return (
    <li
      className={cn(
        "hover:text-foreground transition-colors duration-500",
        props.className,
      )}
      {...props}
    >
      {props.children}
    </li>
  );
}

export default function Footer() {
  return (
    <div className="border pt-8 pb-6 md:pt-10 lg:pt-14 xl:pt-20 px-6 md:px-8 border-t-secondary bg-background/75">
      <MaxWidthWrapper className="grid grid-cols-2 lg:grid-cols-3">
        <div className="flex gap-4 pb-4 items-center col-span-2 lg:flex-col lg:col-span-1 lg:items-start">
          <figure>
            <Image
              src="/Logo.png"
              alt="Modern Engineers (India) MEI Logo"
              height={120}
              width={120}
              className="w-12 object-fit lg:w-20"
            />
          </figure>
          <figure>
            <Image
              src="/GouravDLXLogo.png"
              alt="Modern Engineers (India) GouravDLX Logo"
              height={120}
              width={120}
              className="w-14 object-fit lg:w-20"
            />
          </figure>
          <div className="flex justify-center gap-2 items-center py-2 ml-auto lg:hidden">
            <Link
              href="https://wa.me/%2B918280390000"
              target="_blank"
              className="group"
            >
              <WhatsappIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link
              href="mailto:modernengineersindia@gmail.com"
              target="_blank"
              className="group"
            >
              <MailIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="tel:+918280390000" target="_blank" className="group">
              <PhoneIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
            </Link>
          </div>
        </div>
        <FooterLinkBlock>
          <FooterLinkBlockTitle>Resources</FooterLinkBlockTitle>
          <FooterLinkBlockContent>
            <FooterLinkBlockItem>
              <Link href="/">Home</Link>
            </FooterLinkBlockItem>
            <FooterLinkBlockItem>
              <Link href="/about">About Us</Link>
            </FooterLinkBlockItem>
            <FooterLinkBlockItem>
              <Link href="/products">Our Products</Link>
            </FooterLinkBlockItem>
            <FooterLinkBlockItem>
              <Link href="/contact-us">Contact Us</Link>
            </FooterLinkBlockItem>
          </FooterLinkBlockContent>
        </FooterLinkBlock>
        <FooterLinkBlock>
          <FooterLinkBlockTitle>Popular Categories</FooterLinkBlockTitle>
          <FooterLinkBlockContent>
            {categories.map((category) => (
              <FooterLinkBlockItem key={category}>
                <Link
                  href={`/products?categories=${category.replaceAll(" ", "+")}`}
                >
                  {category
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")
                    .trim()}
                </Link>
              </FooterLinkBlockItem>
            ))}
          </FooterLinkBlockContent>
        </FooterLinkBlock>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="flex gap-2 items-center pt-8">
          <div className="hidden lg:flex gap-2 border border-border self-start rounded-xl overflow-hidden">
            <h2 className="text-base bg-muted py-2 text-muted-foreground border-r border-border px-2">
              Contact Us
            </h2>
            <div className="flex justify-center gap-3 items-center px-4 py-2 pr-4 sm:px-2">
              <Link
                href="https://wa.me/%2B918280390000"
                target="_blank"
                className="group"
              >
                <WhatsappIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
              </Link>
              <Link
                href="mailto:modernengineersindia@gmail.com"
                target="_blank"
                className="group"
              >
                <MailIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
              </Link>
              <Link href="tel:+918280390000" target="_blank" className="group">
                <PhoneIcon className="size-5 fill-muted-foreground group-hover:fill-primary transition-colors ease-out duration-500" />
              </Link>
            </div>
          </div>
          <h3 className="text-sm lg:text-base text-muted-foreground flex-grow lg:flex-grow-0 lg:ml-auto text-center">
            &copy; {`${new Date().getFullYear()}`} Modern Engineers (India)
          </h3>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="pt-4">
          <Separator orientation="horizontal" />
          <div className="pt-4 text-xs flex flex-col text-muted-foreground gap-1 text-center tracking-tight sm:flex-row sm:justify-between md:text-sm lg:text-base">
            <div>
              <h3 className="inline">GSTIN: </h3>
              <span className="uppercase">03AAIPU1157E1ZX</span>
            </div>
            <div>
              <h3 className="inline">UDYAM NUMBER: </h3>
              <span className="uppercase">UDYAM-PB-10-0051537</span>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
