'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import client from '@/lib/contentfulClient';
import { gql } from '@apollo/client';

interface Blog {
  sys: {
    id: string;
  };
  title: string;
  decscription: string;
  img: {
    url: string;
  };
  img2: {
    url: string;
  };
}

interface BlogTitle {
  title: string;
}

const GET_BLOG_DATA = gql`
  query Getblogs {
    blogsCollection(limit: 20) {
      items {
        sys {
          id
        }
        title
        decscription
        img {
          url
        }
        img2 {
          url
        }
      }
    }
  }
`;

const GET_TITLE = gql`
  query getblogtitle {
    blogtitleCollection {
      items {
        title
      }
    }
  }
`;

const LatestBlogPosts = ({ twoColunmHeader }: { twoColunmHeader: boolean }) => {
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [title, settitle] = useState<BlogTitle | null>(null);

  useEffect(() => {
    const fetchtitle = async () => {
      try {
        const { data } = await client.query({
          query: GET_TITLE,
        });
        if (data.blogtitleCollection.items.length > 0) {
          settitle(data.blogtitleCollection.items[0]); // Use the first item
        } else {
          console.error("No blog title found.");
        }
      } catch (error) {
        console.error('Error fetching title data:', error);
      }
    };

    fetchtitle();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: GET_BLOG_DATA,
        });
        setBlogData(data.blogsCollection.items);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, []);

  if (!blogData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-16 bg-gray-300 dark:bg-gray-950">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {twoColunmHeader ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500">
              {title ? title.title : "Loading..."}
            </h2>
            {/* <Button variant={"outline"} className="hidden md:block" size={"sm"}>
              <Link href={"/blog"}>Read More</Link>
            </Button> */}
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12 border-l-4 border-l-rose-500 w-fit mx-auto p-2">
            Latest Blog Posts
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.slice(0, 3).map((post) => (
            <div
              key={post.sys.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative w-full h-[15rem] mt-2">
                <Image
                  src={post.img.url}
                  fill
                  alt={post.title}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">
                  {post.decscription.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href={`/blog/${post.title}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogPosts;