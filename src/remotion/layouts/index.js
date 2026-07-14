import HeroLayout from "./HeroLayout";
import SplitLayout from "./SplitLayout";
import QuoteLayout from "./QuoteLayout";
import CTALayout from "./CTALayout";

const layouts = {
  hero: HeroLayout,
  split: SplitLayout,
  quote: QuoteLayout,
  cta: CTALayout,
};

export function getLayout(name = "hero") {
  return layouts[name] || HeroLayout;
}