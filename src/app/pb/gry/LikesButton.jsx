"use client";

import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function LikesButton({ pb, gra }) {
  async function handleLikes(newLikesValue) {
    await pb.collection("gry").update(gra.id, {
      nazwa: gra.nazwa,
      cena: gra.cena,
      opis: gra.opis,
      likes: newLikesValue,
    });
  }

  return (
    <div className="flex justify-center items-center">
      <Button variant="ghost" onClick={() => handleLikes(gra.likes + 1)}>
        <ThumbsUp />
      </Button>
      <Button variant="ghost" onClick={() => handleLikes(gra.likes - 1)}>
        <ThumbsDown />
      </Button>
      <p>{gra.likes}</p>
    </div>
  );
}
