"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import Menu2 from "./Menu2";
import Link from "next/link";

export const pb = new PocketBase("http://172.16.15.155:8080");

export default function Navbar() {
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    setUser2(pb.authStore.model);
  }, []);
  useEffect(() => {
    setUser2(pb.authStore.model);
  }, [pb.authStore.isValid]);

  async function logOut() {
    await pb.authStore.clear();
    console.log(pb.authStore);
    setUser2(null);
  }

  async function logIn() {
    const authData = await pb
      .collection("users")
      .authWithPassword("test@test.com", "testtest");
    console.log(authData);

    setUser2(pb.authStore.model);
  }
  return (
    <div id="navbar">
      <div>
        <Link href={"/cwiczenie/strona1"}>Strona 1</Link>
        <Link href={"/cwiczenie/strona2"}>Strona 2</Link>
      </div>
      <div>
        <Menu2
          pb={pb}
          logIn={logIn}
          logOut={logOut}
          setUser2={setUser2}
          user={user2}
        />
      </div>
    </div>
  );
}
