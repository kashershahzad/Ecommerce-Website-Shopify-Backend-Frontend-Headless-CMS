import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';
import Logo from "../logo/Logo";
import useShopifyCollections from "@/hooks/useShopifyCollections";
import client from '@/lib/contentfulClient';
import { gql } from "@apollo/client";

interface FooterData {
  title: string;
  decscription: string;
  img: {
    url: string;
  };
}

const GET_FOOTER_DATA = gql`
  query getfooterData {
    footerDataCollection {
      items {
        title
        decscription
        img {
          url
        }
      }
    }
  }
`;

const fetchFooterData = async (): Promise<FooterData[]> => {
  try {
    const { data } = await client.query<{ footerDataCollection: { items: FooterData[] } }>({
      query: GET_FOOTER_DATA,
    });
    return data.footerDataCollection.items;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return [];
  }
};

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { collections, loading: collectionsLoading, error: collectionsError } = useShopifyCollections();

  useEffect(() => {
    setLoading(true);
    fetchFooterData()
      .then((data) => {
        setFooterData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in useEffect:", error);
        setLoading(false);
      });
  }, []);

  if (loading || collectionsLoading) {
    return <div>Loading...</div>;
  }

  const firstFooterData = footerData[0];

  return (
    <footer className="bg-gray-700 text-white py-8 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex md:flex-row flex-wrap gap-4 md:gap-2 justify-between">
        <div className="flex flex-col space-y-4 mb-8 md:mb-0">
          <Logo title={firstFooterData?.title} imageUrl={firstFooterData?.img?.url} />
          <p>{firstFooterData?.decscription}</p>
          <div className="flex space-x-4">
            <Link href="https://www.linkedin.com/in/kasher-shahzad-223579288/">
              <FaLinkedin size={30} />
            </Link>
            <Link href="https://www.instagram.com/kasher_shahzad/">
              <FaInstagram size={30} />
            </Link>
            <Link href="https://github.com/kashershahzad">
              <FaGithub size={30} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold">Categories</h3>
          <ul className="space-y-2">
            {collections.map((collection) => {
              if (collection.handle === "feature-products") {
                return null;
              }

              const collectionTitle = collection.handle === "mob" ? "Smartphones" : collection.title;

              return (
                <li key={collection.id}>
                  <Link href={`/shop?category=${collection.handle}`}>
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
              <Link href="/">Documentation</Link>
            </li>
            <li>
              <Link href="https://github.com/kashershahzad/Ecommerce-Website-Shopify-Backend-Frontend-Headless-CMS">Github</Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-white" />
      <div className="text-center mt-8">
        <p>
          &copy; 2025 Developed by{" "}
          <Link href="https://www.kashershahzad.live/">
            <span className="font-bold">Kasher Shahzad</span>
          </Link>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;