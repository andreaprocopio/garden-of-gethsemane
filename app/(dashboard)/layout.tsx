import React, { ReactNode } from "react";
import { FloatingNavbar } from "@/components/FloatingNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <FloatingNavbar isLoggedIn={true} isLanding={false} />
      <div className="p-6 md:p-14 grow flex">{children}</div>
    </div>
  );
};

export default DashboardLayout;
