
import { Inter } from "next/font/google";
import '/app/globals.css';
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body 
        className={cn(
          "min-h-screen w-full bg-white text-black flex ",
          inter.className, 
          {
            'debug-screens' : process.env.NODE_ENV === "development"
          }
        )}
      >
        {/* Sidebar */}
        {/* <p className="border">Sidebar</p> */}
        <SideNavbar />
        {/* main page */}
        <div className="p-8 w-full">{children}</div>
      </body>
  );
}
