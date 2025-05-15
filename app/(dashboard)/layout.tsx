import React, { ReactNode } from "react";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <HeroHighlight className="relative">
      <div className="min-h-screen z-10">
        <FloatingNavbar isLoggedIn={true} isLanding={false} />
        <div className="p-6 md:p-14 grow flex">{children}</div>
      </div>
    </HeroHighlight>
  );
};

export default DashboardLayout;
