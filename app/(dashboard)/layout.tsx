import React, { ReactNode } from "react";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <AuroraBackground>
      <div className="min-h-screen z-10">
        <FloatingNavbar isLoggedIn={true} isLanding={false} />
        <div className="p-6 md:p-14 grow flex">{children}</div>
      </div>
    </AuroraBackground>
  );
};

export default DashboardLayout;
