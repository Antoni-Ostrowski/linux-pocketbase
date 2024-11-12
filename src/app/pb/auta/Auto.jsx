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
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";

export default function Auto({ auto, pb }) {
  return (
    <Card className={"w-[300px] h-[330px]"}>
      <CardHeader className="flex justify-between items-center flex-row">
        <div>
          <CardTitle>{auto.nazwa}</CardTitle>
          <CardDescription>{auto.cena} PLN</CardDescription>
        </div>

        <EditButton auto={auto} pb={pb} />
      </CardHeader>
      <CardContent>
        <Image
          src={pb.files.getUrl(auto, auto.zdjecie)}
          alt={auto.zdjecie}
          width={200}
          height={200}
          priority={true}
        />
        {auto.wypozyczony ? <div>wypożyczony</div> : <div>wolny</div>}
      </CardContent>
    </Card>
  );
}
