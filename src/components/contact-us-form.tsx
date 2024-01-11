import { MoveRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
// import { submitContactUsForm } from "@/app/actions";

export default function ContactUsForm() {
  return (
    <form
      // action={submitContactUsForm}
      className="border-b border-border py-6 lg:border-b-0 lg:border-r lg:pr-4 xl:pr-8 2xl:pr-12"
    >
      <h2 className="text-lg font-medium lg:text-xl lg:font-semibold">
        Send A Message
      </h2>
      <p className="py-1 text-muted-foreground lg:text-lg">
        Connect with us for inquiries, assistance, or to share your thoughts.
        Our dedicated team is ready to respond promptly. Send us a message, and
        let us start a meaningful conversation!
      </p>
      <div className="mt-4 grid gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="lg:text-base">First Name</Label>
            <Input className="" type="text" name="firstName" />
          </div>
          <div className="space-y-1">
            <Label className="lg:text-base">Last Name</Label>
            <Input type="text" name="lastName" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="lg:text-base">Email</Label>
            <Input type="email" name="email" inputMode="email" />
          </div>
          <div className="space-y-1">
            <Label className="lg:text-base">Phone Number</Label>
            <Input type="tel" name="phoneNumber" inputMode="numeric" />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="lg:text-base">Message</Label>
          <Textarea
            className="h-20 lg:h-40"
            placeholder="Type a Message..."
            name="message"
          />
        </div>
        <Button className="mt-2 gap-2 md:justify-self-end" type="submit">
          <span>Send Message</span>
          <MoveRight size={16} />
        </Button>
      </div>
    </form>
  );
}
