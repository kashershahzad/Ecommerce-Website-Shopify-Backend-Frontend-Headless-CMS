import { useState } from "react";
import { Separator } from "../ui/separator";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin , FaInstagram } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link'
import Logo from "../logo/Logo";
import useShopifyCollections from "@/hooks/useShopifyCollections";


const Footer = () => {
  const { collections, loading, error } = useShopifyCollections();
  console.log("footer:", collections);
  return (
    <footer className=" bg-gray-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex md:flex-row  flex-wrap gap-4 md:gap-2 justify-between">
        <div className="flex flex-col space-y-4 mb-8 md:mb-0">
          <Logo />
          <p>Your one-stop shop for all things electronics.</p>
          <div className="flex space-x-4">
            <Link
              href="https://www.linkedin.com/in/kasher-shahzad-223579288/"
              className=""
            >
              <FaLinkedin size={30} />
            </Link>
            <Link
              href="https://www.instagram.com/kasher_shahzad/"
              className=""
            >
              <FaInstagram size={30} />
            </Link>
            <Link
              href="https://github.com/kashershahzad"
              className=""
            >
              <FaGithub size={30} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Categories</h3>
          <ul className="space-y-2">

            {collections.map((collection) => {
              // Skip rendering if the collection handle is "feature-products"
              if (collection.handle === "feature-products") {
                return null;
              }

              // Log the handle for each collection
              console.log("Collection Handle:", collection.handle);

              // Check if the collection handle is "mob" and change the title to "Smartphones"
              const collectionTitle = collection.handle === "mob" ? "Smartphones" : collection.title;

              return (
                <li key={collection.id}>
                <Link
                  href={`/shop?category=${collection.handle}`}
                  className=""
                >
                  {collectionTitle}
                </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">About Website</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className=""
              >
                Docometation
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/kashershahzad/Ecommerce-Website-Shopify-Backend-Frontend-Headless-CMS"
                className=""
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-white" />
      <div className="text-center mt-8">

        <p> &copy; 2025 Developed by <Link href="https://www.kashershahzad.live/"><span className="font-bold">Kasher Shahzad</span></Link>. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
