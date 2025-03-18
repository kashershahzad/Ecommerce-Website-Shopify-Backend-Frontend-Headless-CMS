'use client'
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { gql } from "@apollo/client";
import client from '@/lib/contentfulClient';

interface FAQ {
    sys: {
        id: string;
    };
    question: string;
    answere: string;
}

interface FaqTitle {
    title: string;
}

interface FaqQueryResponse {
    faqCollection: {
        items: FAQ[];
    };
}

interface FaqTitleQueryResponse {
    faqTitleCollection: {
        items: FaqTitle[];
    };
}

const FAQ_TITLE_QUERY = gql`
  query GetfaqTitle {
    faqTitleCollection {
      items {
        title
      }
    }
  }`;

const FAQ_QUERY = gql`
  query GetFaqs {
    faqCollection {
      items {
        sys {
          id
        }
        question
        answere
      }
    }
  }
`;

const FrequentlyAskedQuestions: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [faqTitle, setFaqTitle] = useState<string>("FAQs"); 
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                console.log("Fetching FAQs from Contentful...");
                const faqResponse = await client.query<FaqQueryResponse>({
                    query: FAQ_QUERY
                });

                console.log("Contentful FAQ response:", faqResponse.data);

                if (faqResponse.data && faqResponse.data.faqCollection && faqResponse.data.faqCollection.items) {
                    setFaqs(faqResponse.data.faqCollection.items);
                } else {
                    setError("No FAQ data found");
                }

                console.log("Fetching FAQ Title from Contentful...");
                const titleResponse = await client.query<FaqTitleQueryResponse>({
                    query: FAQ_TITLE_QUERY
                });

                console.log("Contentful Title response:", titleResponse.data);

                if (titleResponse.data && 
                    titleResponse.data.faqTitleCollection && 
                    titleResponse.data.faqTitleCollection.items && 
                    titleResponse.data.faqTitleCollection.items.length > 0) {
                    setFaqTitle(titleResponse.data.faqTitleCollection.items[0].title);
                }
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data. Check console for details.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleAccordion = (index: number): void => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // if (loading) {
    //     return (
    //         <div className="w-full bg-white dark:bg-gray-900 py-16">
    //             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    //                 <p className="text-gray-600 dark:text-gray-400">Loading FAQs...</p>
    //             </div>
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="w-full bg-white dark:bg-gray-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-red-500">{error}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Please make sure you have published FAQ entries in Contentful.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-gray-900 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
                    <p className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500">
                        {faqTitle}
                    </p>
                </div>

                {faqs.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">No FAQs available at the moment.</p>
                ) : (
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={faq.sys.id}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="flex items-center justify-between w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                                        {faq.question}
                                    </span>
                                    <span className="text-rose-500">
                                        {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                    </span>
                                </button>

                                {activeIndex === index && (
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                                        <p className="text-gray-700 dark:text-gray-300">{faq.answere}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestions;