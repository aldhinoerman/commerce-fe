import React from "react";

interface SectionWrapperProps extends React.PropsWithChildren {
  id: string;
  padding?: boolean;
}

function SectionWrapper({ id, padding = true, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`flex justify-center px-4 ${
        padding ? "my-12 max-w-[1080px] w-full" : ""
      }`}
    >
      {children}
    </section>
  );
}

export default SectionWrapper;
