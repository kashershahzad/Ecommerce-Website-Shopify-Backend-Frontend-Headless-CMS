import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, LucideRocket } from "lucide-react";

const BannerOne = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col justify-center items-center text-center lg:text-left lg:w-1/2">
          <p className="text-white font-semibold text-lg lg:text-xl">
            <LucideRocket className="inline-block mr-2" size={24} /> Special Offer
          </p>
          <h2 className="text-3xl lg:text-5xl text-center font-bold text-white mt-4 leading-tight">
            Discover the Latest Gadgets
            <br className="hidden lg:block" /> with Exciting Deals!
          </h2>
          <p className="text-white text-lg mt-4">
            Explore a wide range of electronics at unbeatable prices.
          </p>
          <Button className="mt-8 py-4 px-8 bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out">
            <ArrowRight className="mr-2" size={24} /> Shop Now
          </Button>
        </div>
        <div className="relative lg:w-1/2 mt-12 lg:mt-0">
          <div className="rounded-xl overflow-hidden">
            <Image src="/images/banner/headphone.png" alt="Electronics Banner" width={600} height={400} />
          </div>
          <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center animate-blob1">
            <div className="w-24 h-24 bg-white rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerOne;
