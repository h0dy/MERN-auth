import React from "react";
import FloatingShape from "./FloatingShape";

const BackgroundMotion = () => {
  return (
    <>
      <FloatingShape
        color="bg-purple-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-indigo-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={3}
      />
      <FloatingShape
        color="bg-violet-500"
        size="w-28 h-28 "
        top="40%"
        left="-10%"
        delay={6}
      />
    </>
  );
};

export default BackgroundMotion;
