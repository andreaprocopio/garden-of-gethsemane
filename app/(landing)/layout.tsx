import React, { ReactNode } from "react";
import { FloatingNavbar } from "@/components/FloatingNavbar";
import { currentUser } from "@clerk/nextjs/server";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = async ({ children }: LandingLayoutProps) => {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      <FloatingNavbar isLoggedIn={!!user} isLanding={true} />
      <div>{children}</div>
    </div>
  );
};

export default LandingLayout;
