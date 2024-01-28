"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const ItemInput = () => {
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendItem = async (item) => {
    setLoading(true);
    try {
      const res = await fetch("https://v1.appbackend.io/v1/rows/AYTGODb6D7SM", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ name: item }]),
      });

      if (!res.ok) throw new Error(res.statusText);

      await res.json();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setItem("");
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col basis-1/2 lg:gap-8 gap-6 relative min-h-40">
      <div className="bg-white p-8 shadow-xl rounded-lg min-h-40 gap-5 flex flex-col items-center">
        {loading && <LoadingDiv />}
        <InputField item={item} setItem={setItem} />
        <SubmitButton sendItem={sendItem} item={item} loading={loading} />
      </div>
    </div>
  );
};

const LoadingDiv = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50 opacity-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

const InputField = ({ item, setItem }) => (
  <input
    type="text"
    onChange={(e) => setItem(e.target.value)}
    value={item}
    className="text-3xl w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-black"
    placeholder="Nama Mantan"
  />
);

const SubmitButton = ({ sendItem, item, loading }) => (
  <button
    onClick={() => sendItem(item)}
    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500"
  >
    <ButtonText loading={loading} />
    <ArrowIcon />
  </button>
);

const ButtonText = ({ loading }) => (
  <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
    {loading ? "Loading..." : "Tambahkan"}
  </div>
);

const ArrowIcon = () => (
  <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
    >
      <path
        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>
);
