"use client";
import React, { Suspense } from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import SearchBox from "./SearchBox";
import Cart from "../carts/Cart";
import { ThemeToggle } from "../theme/ThemeToggle";
import AccountPopover from "../account/AccountPopover";
import { Search } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobileSearchModal } from "@/store/mobileSearchStore";
import Loader from "../others/Loader";
import DropdownMenuComponent from "../others/DropdownMenu";
import CatagoriesDropdown from '../others/CatagoriesDropdown';
import client from '@/lib/contentfulClient';
import { gql } from "@apollo/client";

// Define the type for your header data
interface HeaderData {
  title: string;
  item1: string; 
  item2: string;
  item3: string;
  titleImg: {
    url: string;
  };
}

const HeaderOne = () => {
  const pathname = usePathname();
  const { openModal } = useMobileSearchModal();
  
  // Define the GraphQL query correctly
  const GET_HEADER_DATA = gql`
    query getHeaderData {
      headerCollection {
        items {
          title
          item1
          item2
          item3
          titleImg {
            url
          }
        }
      }
    }
  `;
  
  // Fix the fetchHeaderData function with proper types
  const fetchHeaderData = async (): Promise<HeaderData[]> => {
    try {
      const { data } = await client.query<{ headerCollection: { items: HeaderData[] } }>({
        query: GET_HEADER_DATA,
      });
      return data.headerCollection.items;
    } catch (error) {
      console.error("Error fetching header data:", error);
      return [];
    }
  };

  // Initialize state with empty array
  const [headerData, setHeaderData] = React.useState<HeaderData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);
    fetchHeaderData()
      .then((data) => {
        setHeaderData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error in useEffect:", error);
        setLoading(false);
      });
  }, []);

  // Get the first item from headerData, or use a default if not available
  const headerItem = headerData.length > 0 ? headerData[0] : null;

  // Dynamic links based on headerData
  const links = headerItem ? [
    {
      label: headerItem.item1,
      link: "/",
      isActive: pathname === "/",
    },
    {
      label: headerItem.item2,
      link: "/shop",
      isActive: pathname.startsWith("/shop"),
    }
  ] : [
    {
      label: "Home",
      link: "/",
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      link: "/shop",
      isActive: pathname.startsWith("/shop"),
    }
  ];

  return (
    <header className="sticky bg-white dark:bg-slate-950 top-0 z-50 w-full">
      <div className="max-w-screen-xl mx-auto p-4 md:py-4 md:px-8 flex items-center justify-between gap-2">
        {headerItem ? (
          <Logo title={headerItem.title} imageUrl={headerItem.titleImg.url} />
        ) : (
          <Logo />
        )}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-lg">
          {links.map((link) => (
            <Link
              key={link.link}
              className={cn(
                "font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              )}
              href={link.link}
            >
              {link.label}
            </Link>
          ))}
          {headerItem ? (
            <CatagoriesDropdown title={headerItem.item3} />
          ) : (
            <CatagoriesDropdown />
          )}
        </ul>
        <div className="flex items-center gap-6">
          {/* mobile search option */}
          <div className="lg:hidden text-center">
            <Search size={25} onClick={openModal} />
          </div>
          {/* desktop search */}
          <div className="hidden lg:block">
            <Suspense fallback={<p>Loading...</p>}>
              {/* <SearchBox /> */}
            </Suspense>
          </div>
          <div className="flex items-center gap-6 lg:gap-2 lg:-mt-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            {/* <AccountPopover /> */}
            <Cart />
            <MobileHeader />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default HeaderOne;