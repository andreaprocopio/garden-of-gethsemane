import React, { ReactNode } from "react";
import { FloatingNavbar } from "@/components/FloatingNavbar";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="min-h-screen">
      <FloatingNavbar isLoggedIn={true} isLanding={true} />
      <div className="p-6 md:p-14 grow flex">{children}</div>
    </div>
  );
};

export default LandingLayout;
