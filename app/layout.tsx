import type { Metadata } from "next";


import "./globals.css";
import localFont from "next/font/local";
import NavBar from "@/components/nav-bar/nav";

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

// const indicatorHeight = 50;
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
        <div className="flex w-screen h-screen overflow-hidden">
          <div className="flex flex-col md:flex-row  w-full ">
            <div className=" flex flex-col w-full md:max-w-60">
              <NavBar />
            </div>
            <div className="w-full h-full overflow-x-scroll overflow-y-scroll mt-12">
              {children}
            </div>
          </div>
        </div>
      </body>
      {/* <!-- Google tag (gtag.js) --> */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-K9C5J9E3P1"></script>
      <script>
       { window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-K9C5J9E3P1');}
      </script> */}
    </html>
  );
}
