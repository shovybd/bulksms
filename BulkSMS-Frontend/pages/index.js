import { useRouter } from "next/router";
import React from "react";

const Index = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/login");
  }

  return <div></div>;
};

export default Index;
