import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { Toaster } from 'react-hot-toast';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";



export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

import stylesheet from "~/tailwind.css";
import Navigation from "./components/Navigation";



export default function App() {


  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

    
      </head>
      <body style={{ background: "#355c7d"}}>
        <Navigation />
        <Toaster />

        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>


          <div className=" rounded-md mx-auto w-[550px] bg-[#f4f4f4] mt-2 p-3 ">
            <Outlet />
          </div>
          {/* <Note /> */}

        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
