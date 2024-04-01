import { useLoaderData } from "@remix-run/react";

export const clientLoader = async () => {
  const a = await fetch("/system/api");
  console.log(a);
  return a;
};
export default function Dict() {
  const data = useLoaderData<typeof clientLoader>();
  console.log(data);
  return (
    <div className="">
      <div>
        <h1 className="text-4xl">dict</h1>
      </div>
    </div>
  );
}
