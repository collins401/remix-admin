import { Outlet, useLocation } from "@remix-run/react";
import { useMount } from "ahooks";
import { Layout } from "antd";
import { Suspense, useContext, useEffect, useState } from "react";
import HeaderBar from "./components/HeaderBar";
import SiderBar from "./components/SiderBar";

import NiceModal from "@ebay/nice-modal-react";
import { ErrorBoundary, Loading } from "~/components";
import { getAuthorization } from "~/lib/utils";

export default function BasicLayout() {
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const niceModalContext = useContext(NiceModal.NiceModalContext);

  useMount(() => {
    getAuthorization()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        location.href = "/login";
      });
  });

  useEffect(() => {
    Object.keys(niceModalContext).forEach((key) => {
      NiceModal.remove(key);
    });
  }, [pathname]);

  if (loading) return <Loading />;

  return (
    <Layout className="!min-h-[100vh]">
      <SiderBar collapsed={collapsed} onChange={setCollapsed} />
      <Layout>
        <HeaderBar />
        <Layout.Content className="m-4">
          <Suspense fallback={<Loading />}>
            <NiceModal.Provider>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </NiceModal.Provider>
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
