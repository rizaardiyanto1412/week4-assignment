import { ItemInput } from "../components/ItemInput";
import { ItemCard } from "@/components/ItemCard";
import Image from "next/image";
import logo from "../assets/logo.png";
import { DeleteItems } from "../components/DeleteItems";

const getInventory = async () => {
  const res = await fetch("https://v1.appbackend.io/v1/rows/AYTGODb6D7SM", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function Home() {
  const { data } = await getInventory();
  const ids = data.map((item) => item._id);

  return (
    <main className="lg:flex">
      <div className="bg-white lg:w-[50vw] flex flex-col justify-center items-center h-[100vh] px-24">
        <Image src={logo} width={200} height={200} alt="logo" />
        <ItemInput />
      </div>
      <div className="lg:w-[50vw] bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-5 p-20">
          {data.map(({ _id, name }) => (
            <ItemCard key={_id} id={_id} name={name} />
          ))}
        </div>
        <DeleteItems ids={ids} />
      </div>
    </main>
  );
}
