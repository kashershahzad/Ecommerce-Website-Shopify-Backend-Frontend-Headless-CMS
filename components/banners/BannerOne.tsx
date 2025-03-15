'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import client from '@/lib/contentfulClient';
import { gql } from '@apollo/client';

interface HeadphoneBanner {
  title: string;
  button: string;
  buttonlink: string;
  img: {
    url: string;
  };
}

const GET_HEADPHONE_BANNER = gql`
  query GetHeadphoneBanner {
    headphonebannerCollection(limit: 1) {
      items {
        title
        button
        buttonlink
        img {
          url
        }
      }
    }
  }
`;

const BannerOne: React.FC = () => {
  const [bannerData, setBannerData] = useState<HeadphoneBanner | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_HEADPHONE_BANNER,
        });
        setBannerData(data.headphonebannerCollection.items[0]);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, []);

  if (!bannerData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative w-full bg-gradient-to-r from-purple-500 to-pink-500 py-4">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="flex flex-col justify-center items-center text-center lg:text-left lg:w-1/2">
          <h2 className="text-3xl lg:text-5xl text-center font-bold text-white mt-4 leading-tight">
            {bannerData.title}
          </h2>
          <Link href={bannerData.buttonlink} className="flex items-center justify-center gap-2 mt-8 px-10 py-4 hover:ring-2 hover:ring-white hover:ring-opacity-50 text-lg font-semibold rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out">
            <ArrowRight className="mr-2" size={24} /> {bannerData.button}
          </Link>
        </div>
        <div className="relative lg:w-1/2  lg:mt-0">
          <div className="rounded-xl overflow-hidden relative w-[20rem] lg:w-[30rem] h-[15rem] lg:h-[25rem] ">
            <Image src={bannerData.img.url} className="object-contain" fill alt="Electronics Banner"/>
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