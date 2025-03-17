'use client'
import { useState, useEffect } from "react";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import Image from "next/image";
import React from "react";
import client from '@/lib/contentfulClient';
import { gql } from '@apollo/client';
import PopularPosts from "@/components/blog/PopularPosts";

interface BlogContent {
  type: string;
  text?: string;
  src?: string;
  alt?: string;
}

interface Blog {
  sys: {
    id: string;
  };
  title: string;
  decscription: string;
  img: {
    url: string;
  };
  img2?: {
    url: string;
  };
}

// Update the query to fetch blog by title
const GET_BLOG_BY_TITLE = gql`
  query GetBlogByTitle($title: String!) {
    blogsCollection(where: { title: $title }, limit: 1) {
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

const BlogTitlePage = ({ params }: { params: { title: string } }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Get the blog title from the URL parameter
        const blogTitle = decodeURIComponent(params.title);
        
        const { data } = await client.query({
          query: GET_BLOG_BY_TITLE,
          variables: { title: blogTitle }
        });
        
        // Check if we got any results
        if (data.blogsCollection?.items && data.blogsCollection.items.length > 0) {
          setBlog(data.blogsCollection.items[0]);
        } else {
          console.error('Blog not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.title]);

  const formatDescription = (description: string, img2Url?: string) => {
    let formattedDescription = description;

    // Insert img2 before .1 if img2Url is provided
    if (img2Url) {
      formattedDescription = formattedDescription.replace('.1', `<img src="${img2Url}" alt="img2" /><br/>1`);
    }

    // Ensure numbers are followed by a newline
    formattedDescription = formattedDescription.replace(/(\d+\.)/g, '<br/><br/>$1');

    return formattedDescription;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  if (!blog) {
    return <div className="flex justify-center items-center min-h-[50vh]">Blog post not found</div>;
  }

  return (
    <section>
      <div className="max-w-screen-xl mx-auto p-4 md:p-12">
        <div className="py-2">
          <BreadcrumbComponent
            links={["/blog"]}
            pageText={blog.title}
          />
        </div>
        {/* blog details */}
        <div className="gap-4 w-full">
          <div className="space-y-4 lg:col-span-2">
            {/* Blog Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold capitalize">
                {blog.title}
              </h2>
            </div>
            <div className="relative w-full h-[30rem]">
              <Image src={blog.img.url} alt={blog.title} fill className="rounded-md object-contain" />
            </div>
            <div className="space-y-6 px-24">
              <div dangerouslySetInnerHTML={{ __html: formatDescription(blog.decscription, blog.img2?.url) }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogTitlePage;