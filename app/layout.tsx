import type { Metadata } from "next";
import "./globals.css";

import logo from "@/public/images/logo.png";
import localFont from "next/font/local";
import Image from "next/image";
import NavBar from "@/components/nav-bar/nav";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const ethnocentric = localFont({
  src: [
    {
      path: "../public/fonts/ethnocentric/ethnocentric.otf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/ethnocentric/ethnocentricit.otf",
      weight: "normal",
      style: "italic",
    },
  ],
  variable: "--font-ethnocentric",
});
export const metadata: Metadata = {
  title: "Vocab Wars",
  description: "A wordle contest platform.",

};

const indicatorHeight = 50;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
        <title>Vocab Wars</title>
        <link rel="icon" href="./logo-icon.png" />
        </Head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${ethnocentric.variable} antialiased`}
      >
        <div className="flex w-screen h-full ">
          <div className="flex  w-full ">
            <div className="hidden md:flex flex-col max-w-60  h-screen">
              <div className="flex flex-col  p-2  h-[87.5px] outline outline-1 outline-[#262626] ">
                <div className="relative w-full h-full ">
                  <Image
                    src={logo}
                    alt="logo"
                    fill
                    objectFit="contain"
                    
                  />
                </div>
              </div>
              <NavBar />
            </div>

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
