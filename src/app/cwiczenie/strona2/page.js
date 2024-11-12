"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { pb } from "../Navbar";
export default function page() {
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    setUser2(pb.authStore);
    console.log(pb.authStore);
  }, []);

  useEffect(() => {
    console.log(pb.authStore.isValid);
  }, [pb.authStore.isValid]);

  return (
    <div>
      {!user2?.isValid ? <div>nie jestes zalogowany</div> : <div>STRONA 2</div>}
    </div>
  );
}
