import MaxWidthWrapper from "@/components/max-width-wrapper";
import { playfairDisplay } from "../fonts";
import { Mail, MapPinned, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContactUsForm from "@/components/contact-us-form";
import { Metadata } from "next";
import { baseURL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUs() {
  const breadcrumbListJsonLd = {
    "@context": "https://schema.org/",
    "@type": "BreadCrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Modern Engineers (India)",
        item: `${baseURL}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us Page",
        item: `${baseURL}/contact-us`,
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListJsonLd),
        }}
      />
      <section className="text-center grid place-items-center h-72 lg:h-96 [mask-image:linear-gradient(to_bottom,transparent,10%,white,90%,transparent)]">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#ffffff",
            opacity: 0.1,
            backgroundImage:
              "linear-gradient(#000000 1.2000000000000002px, transparent 1.2000000000000002px), linear-gradient(to right, #000000 1.2000000000000002px, #ffffff 1.2000000000000002px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
        <h1
          className={`text-3xl tracking-wide md:text-5xl text-balance lg:text-6xl z-30 ${playfairDisplay.className}`}
        >
          Contact Us
        </h1>
      </section>
      <MaxWidthWrapper className="py-4 md:px-8 lg:px-16 2xl:px-0">
        <div className="grid lg:grid-cols-2">
          <ContactUsForm />
          <div className="grid gap-8 pt-8 lg:pl-4 xl:pl-8 2xl:pl-12">
            <div className="space-y-2">
              <h2 className="text-lg font-medium lg:text-xl">Call Us</h2>
              <p className="text-pretty text-muted-foreground lg:text-lg">
                Connect with us directly by phone for personalized assistance.
                We are standing by to address your queries and ensure your
                satisfaction
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="rounded-full py-2">
                  <PhoneCall size={20} />
                </Badge>
                <Badge variant="outline" className="py-2 text-sm">
                  +91 8280390000
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-medium lg:text-xl">Visit Us</h2>
              <p className="text-pretty text-muted-foreground lg:text-lg">
                Your presence matters! Step into our space and witness the
                commitment to quality that sets us apart. Plan a visit to
                experience our products and services up close.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="rounded-full py-2">
                  <MapPinned size={20} />
                </Badge>
                <Badge variant="outline" className="py-2 text-sm lg:text-base">
                  53, Industrial Point, Godaipur, Jalandhar
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-medium lg:text-xl">Email Us</h2>
              <p className="text-pretty text-muted-foreground lg:text-lg">
                Drop us an email for a convenient way to get in touch. Our inbox
                is always open, and we are ready to assist you with any
                questions or concerns.
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="rounded-full py-2">
                  <Mail size={20} />
                </Badge>
                <Badge variant="outline" className="py-2 text-sm lg:text-base">
                  gouravdlx@gmail.com
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3406.4351513531633!2d75.58087817542285!3d31.374562854331753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a508f83fda7fd%3A0xd2071d11d26687d1!2sMODERN%20ENGINEERS%20(INDIA)!5e0!3m2!1sen!2sin!4v1704456911590!5m2!1sen!2sin"
          className="my-20 h-80 w-full lg:my-28 xl:h-[500px]"
          style={{ border: 0 }}
          allow="fullscreen"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MaxWidthWrapper>
    </>
  );
}
