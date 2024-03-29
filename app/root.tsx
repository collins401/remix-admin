import React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import ThemeProvider from "./ThemeProvider";
import BasicLayout from "./layout";
import { setup } from "goober";
import { LinksFunction } from "@remix-run/node";
import styles from "./style.css?url";
import { ADMIN_LAYOUT_RED_LIST } from "~/lib/config";
setup(React.createElement);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <ThemeProvider>
      {ADMIN_LAYOUT_RED_LIST.some((path) => pathname.startsWith(path)) ? (
        <Outlet />
      ) : (
        <BasicLayout />
      )}
    </ThemeProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center pt-10">
        <h2 className="text-xl font-medium">{error.status}</h2>
        <p className="text-base text-color/60 my-2">{error.statusText}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="border-[1px] rounded-md p-6 bg-[#fff2f0] border-[#ffccc7] m-8">
        <div className="text-base text-color/60 my-2">ReferenceError: {error?.message}</div>
        <div className="text-base text-color/60 my-2">页面出错了</div>
      </div>
    );
  }
  return "Unknown Error";
}

export function HydrateFallback() {
  return null;
}