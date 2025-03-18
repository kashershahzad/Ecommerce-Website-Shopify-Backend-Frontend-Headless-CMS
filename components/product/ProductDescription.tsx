"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDescription = ({ description }: { description: string }) => {
  const sentences = description.split(".").filter((sentence) => sentence.trim() !== "");
  const renderDescription = () => {
    return (
      <>
      <Tabs defaultValue="aboutitem" className="w-full p-4 -mt-2 ">
        <TabsList className="bg-transparent">
          <TabsTrigger value="aboutitem">About This Item</TabsTrigger>
        </TabsList>
        </Tabs>
        <ul className="list-disc list-inside space-y-2">
          {sentences.map((sentence, index) => (
            <li key={index} className="text-gray-700">
              {sentence.trim()}.
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      {renderDescription()}
    </div>
  );
};

export default ProductDescription;
