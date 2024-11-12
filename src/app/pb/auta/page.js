"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

import Dodawanie from "./Dodawanie";
import Auto from "./Auto";
import Menu from "./Menu";

export default function Page() {
  const pb = new PocketBase("http://172.16.15.155:8080");

  const [auta, setAuta] = useState(null);

  useEffect(() => {
    async function setupAutaWithUpdates() {
      setAuta(await getAuta());

      pb.collection("auta").subscribe("*", async (e) => {
        setAuta(await getAuta());
      });
    }

    async function getAuta() {
      const res = await pb.collection("auta").getFullList({
        sort: "-created",
      });
      // console.log(res);
      return res;
    }
    setupAutaWithUpdates();
  }, []);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(pb.authStore.model);
  }, []);
  async function logOut() {
    await pb.authStore.clear();
    console.log(pb.authStore);
    setUser(null);
  }

  async function logIn() {
    const authData = await pb
      .collection("users")
      .authWithPassword("test@test.com", "testtest");
    console.log(authData);

    setUser(pb.authStore.model);
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="flex justify-start items-start flex-row ">
          <Menu pb={pb} logIn={logIn} logOut={logOut} user={user} />
        </div>
        <div className="w-full h-screen flex justify-center items-center">
          {user !== null ? (
            <div className="flex flex-row">
              {auta?.map((auto) => (
                <Auto key={auto.id} auto={auto} pb={pb} />
              ))}
            </div>
          ) : (
            <div>nie zaogowano </div>
          )}

          <Dodawanie pb={pb} />
        </div>
      </div>
    </>
  );
}
