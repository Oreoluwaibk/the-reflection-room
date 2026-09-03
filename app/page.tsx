import { Hero } from "@/components/Hero";
import { PageGuideSection } from "@/components/PageGuideSection";
import { WelcomeSection } from "@/components/WelcomeSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <PageGuideSection />
    </>
  );
}
