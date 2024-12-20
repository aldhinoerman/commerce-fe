import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray flex justify-center px-4 mt-auto relative">
      <div className="max-w-[1080px] w-full text-center py-8">
        <Link href={"/"} className="uppercase text-3xl font-bold">
          <h1>Shop.co</h1>
        </Link>
        <p className="mt-4 font-light">
          Shop.co © 2000-2023, All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
