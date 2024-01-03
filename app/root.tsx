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



export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-orange-400">
        <nav className="mx-auto   items-center  flex mt-4" >
          <ul className="mx-auto rounded-md flex space-x-5 p-3 bg-slate-800 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notes">posts</Link>
            </li>
            <li>
              <Link to="/create-form">create</Link>
            </li>

            <li>
              <Link to="/">Manage</Link>
            </li>
          </ul>
        </nav>
        <Toaster />

        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>


          <div className=" rounded-md mx-auto bg-[#f4f4f4] mt-2 p-3 ">
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
