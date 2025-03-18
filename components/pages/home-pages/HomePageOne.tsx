import React, { Suspense } from "react";
import HeroBannerOne from "@/components/hero/HeroBannerOne";
import ProductsCollectionOne from "@/components/products/ProductsCollectionOne";
import NewsLetterTwo from "@/components/newsLetter/NewsLetterTwo";
import LatestBlogPosts from "@/components/blog/LatestBlogPosts";
import CategoriesCollection from "@/components/category/CategoriesCollection";
import TestimonialsSection from "@/components/others/Testimonials";
import BannerOne from "@/components/banners/BannerOne";
import BenefitsSection from "@/components/others/BenefitSection";
import Loader from "@/components/others/Loader";
import FrequentlyAskendQuestions from "@/components/others/FrequentlyAskendQuestions";

const HomePageOne = () => {
  return (
    <section className="overflow-hidden">
      <HeroBannerOne />
      <Suspense fallback={<Loader />}>
        <CategoriesCollection />
      </Suspense>
      <ProductsCollectionOne />
      <BenefitsSection textCenter={false} />
      <BannerOne />
      {/* <TestimonialsSection textCenter={false} /> */}
      <FrequentlyAskendQuestions />
      <LatestBlogPosts twoColunmHeader={true} />

      {/* <NewsLetterTwo /> */}
    </section>
  );
};

export default HomePageOne;
