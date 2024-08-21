"use client";

import { useEffect } from "react";

import { WinkApi } from "@/api/WinkApi";

export const WinkApiApplication = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    WinkApi.init();
  }, []);

  return <>{children}</>;
};
