import { Features } from "./Features";
import { LandingHero } from "./LandingHero";

export default function Home() {
  return (
    <div className="w-full">
      <LandingHero />
      <div className="px-12 flex justify-center">
        <Features />
      </div>
    </div>
  );
}
