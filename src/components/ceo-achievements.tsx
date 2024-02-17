import { playfairDisplay } from "@/app/fonts";
import NumberCount from "./number-count";

export default function CeoAchievements({
  title,
  amount,
  symbol,
}: {
  title: string;
  amount: number;
  symbol?: string;
}) {
  return (
    <>
      <div className="self-center">
        <h2
          className={`${playfairDisplay.className} text-muted-foreground font-medium text-2xl lg:text-3xl`}
        >
          {title}
        </h2>
        <h3
          className={`${playfairDisplay.className} font-medium text-2xl lg:text-3xl`}
        >
          <NumberCount start={1} end={amount} duration={1} />
          {` ${symbol || ""}`}
        </h3>
      </div>
    </>
  );
}
