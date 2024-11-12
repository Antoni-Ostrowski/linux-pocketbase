"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

import ItemCard from "./ItemCard";

import Form from "./Form";

export default function Pb() {
  const pb = new PocketBase("http://172.16.15.155:8080");

  const [gry, setGry] = useState(null);

  useEffect(() => {
    async function setupgryWithUpdates() {
      setGry(await getGry());

      pb.collection("gry").subscribe("*", async (e) => {
        setGry(await getGry());
      });
    }

    async function getGry() {
      const res = await pb.collection("gry").getFullList({
        sort: "-created",
      });
      console.log(res);
      return res;
    }
    setupgryWithUpdates();
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-[80vh] flex flex-row justify-start items-start gap-20 flex-wrap">
          {gry?.length !== 0 &&
            gry?.map((gra) => <ItemCard key={gra.id} gra={gra} pb={pb} />)}
        </div>

        <Form pb={pb} />
      </div>
    </>
  );
}
