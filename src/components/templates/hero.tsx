import React from "react";
import { SectionWrapper } from "../atoms";
import Image from "next/image";

function Hero() {
  return (
    <div className="bg-peach w-full">
      <SectionWrapper id="hero" padding={false}>
        <div className="max-w-[1080px] w-full">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center gap-8 py-24">
              <h1 className="uppercase text-5xl font-bold">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="font-light">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <div className="w-48">
                <button className="btn btn-active rounded-3xl w-full text-white bg-black hover:text-black">
                  Shop Now
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-8">
                {...[
                  { total: 200, label: "International Brand" },
                  { total: 2000, label: "High Quality Products" },
                  { total: 200, label: "International Brand" },
                ].map((obj, idx) => (
                  <div key={idx} className="pr-8 border-r border-r-zinc-400">
                    <h3>{obj.total}+</h3>
                    <p className="font-light">{obj.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src={"/images/hero-image.webp"}
                alt="hero-picture"
                width={500}
                height={450}
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

export default Hero;
