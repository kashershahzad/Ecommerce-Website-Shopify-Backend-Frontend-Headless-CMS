'use client'
import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { gql } from "@apollo/client";
import client from '@/lib/contentfulClient';

interface AdvantageItem {
  sys: {
    id: string;
  };
  icon: string;
  title: string;
  decscription: string;
}

interface AdvantageTitle {
  title: string;
}

type LucideIcon = React.ComponentType<{
  size?: number | string;
  color?: string;
  className?: string;
  // Add other props if needed
}>;

const GET_ADVANTAGE_TITLE = gql`
  query GetadvantageSectionTitle {
    advantageSectionTitleCollection {
      items {
        title
      }
    }
  }
`;

const GET_ADVANTAGE_DATA = gql`
  query Getadvantagesectiondata {
    advantagesectiondataCollection {
      items {
        sys {
          id
        }
        icon
        title
        decscription
      }
    }
  }
`;

const BenefitsSection = ({ textCenter }: { textCenter: boolean }) => {
  const [advantageTitle, setAdvantageTitle] = useState<AdvantageTitle | null>(null);
  const [advantageItems, setAdvantageItems] = useState<AdvantageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch title data
        const titleResult = await client.query({
          query: GET_ADVANTAGE_TITLE
        });
        
        const titleData = titleResult.data.advantageSectionTitleCollection.items[0];
        setAdvantageTitle(titleData);
        
        // Fetch advantage items
        const itemsResult = await client.query({
          query: GET_ADVANTAGE_DATA
        });
        
        const itemsData = itemsResult.data.advantagesectiondataCollection.items;
        setAdvantageItems(itemsData);
      } catch (error) {
        console.error("Error fetching data from Contentful:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Dynamic icon rendering function
  const renderIcon = (iconName: string) => {
    // Check if the icon exists in Lucide Icons
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as LucideIcon;
    
    if (IconComponent) {
      return <IconComponent size={48} className="text-blue-500" />;
    }
    
    // Fallback to a default icon if the specified one doesn't exist
    return <LucideIcons.HelpCircle size={48} className="text-blue-500" />;
  };

  if (loading) {
    return <div className="py-16 text-center">Loading advantages...</div>;
  }

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {!textCenter ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500">
              {advantageTitle?.title || "Discover Our Advantages"}
            </h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-start md:text-center text-gray-900 dark:text-white mb-12 border-l-4 border-l-rose-500 w-fit mx-auto p-2">
            {advantageTitle?.title || "Discover Our Advantages"}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {advantageItems.map((item) => (
            <div 
              key={item.sys.id} 
              className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md"
            >
              {renderIcon(item.icon)}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {item.decscription}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;