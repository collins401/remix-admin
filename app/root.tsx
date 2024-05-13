import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { setup } from "goober";
import React, { createContext, useContext } from "react";
import ThemeProvider from "./ThemeProvider";
import { Loading } from "./components";
import BasicLayout from "./layout";
import styles from "./style.css?url";

import { ADMIN_LAYOUT_RED_LIST, COLOR_PRIMARY } from "~/lib/config";

const theme = { primary: COLOR_PRIMARY };
const ThemeContext = createContext(theme);
const useTheme = () => useContext(ThemeContext);

setup(React.createElement, undefined, useTheme);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <title>Rymix管理系统</title>
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
export const clientLoader = async () => {
  const darkMode = (await localStorage.getItem("darkMode")) || "light";
  return {
    darkMode,
  };
};
export default function App() {
  const { darkMode } = useLoaderData<typeof clientLoader>();
  document.documentElement.classList.add(darkMode);
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
  }
  return (
    <div className="border-[1px] rounded-md p-6 bg-[#fff2f0] border-[#ffccc7] m-8">
      <div className="text-base text-color/60 my-2">ReferenceError: {error?.message}</div>
      <div className="text-base text-color/60 my-2">页面出错了</div>
    </div>
  );
}

export function HydrateFallback() {
  return <Loading />;
}
