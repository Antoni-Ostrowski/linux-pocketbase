"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";
import LikesButton from "./LikesButton";
export default function ItemCard({ gra, pb }) {
  async function handleDelete(itemId) {
    console.log(itemId);

    try {
      await pb.collection("gry").delete(itemId);
    } catch (error) {}
  }

  return (
    <Card className={"w-[300px] h-[400px]"}>
      <CardHeader>
        <CardTitle>{gra.nazwa}</CardTitle>
        <CardDescription>{gra.cena} PLN</CardDescription>
      </CardHeader>
      <CardContent>
        <div>{gra.opis}</div>
        <Image
          src={pb.files.getUrl(gra, gra.zdjecie)}
          alt={gra.zdjecie}
          width={200}
          height={200}
          priority={true}
        />
      </CardContent>
      <CardFooter className={"w-full flex justify-end"}>
        <LikesButton pb={pb} gra={gra} />

        <EditButton gra={gra} pb={pb} />

        <Button variant={"ghost"} onClick={() => handleDelete(gra.id)}>
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}
