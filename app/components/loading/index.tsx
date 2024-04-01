import { useEffect } from "react";
import { Spin } from "antd";
import nprogress from "nprogress";

interface LoadingProps {
  className?: string;
}
function Loading(props: LoadingProps) {
  const { className = "" } = props;
  useEffect(() => {
    nprogress.start();
    return () => {
      nprogress.done();
    };
  });
  return (
    <div className={`text-center pt-8 ${className}`}>
      <Spin />
    </div>
  );
}

export default Loading;
