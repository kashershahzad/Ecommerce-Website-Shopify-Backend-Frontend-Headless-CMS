'use client'
import { useState, useEffect } from "react";
import HeaderOne from "@/components/headers/HeaderOne";
import Footer from "@/components/footers/Footer";
import ScrollToTop from "@/components/others/ScrollToTop";
import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <HeaderOne />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster position="top-right" duration={2000} />
        </>
      )}
    </div>
  );
}