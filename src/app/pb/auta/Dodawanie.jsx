"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trigger } from "@radix-ui/react-dialog";
import { CirclePlus, Pencil } from "lucide-react";
import { useState } from "react";

export default function Dodawanie({ pb }) {
  const [dane, setDane] = useState({
    nazwa: null,
    cena: null,
    zdjecie: null,
  });

  function handleChange(e, source) {
    setDane((prevDane) => {
      return { ...prevDane, [source]: e.target.value };
    });
  }

  async function handleSubmitButton() {
    console.log(dane);
    const formData = new FormData();
    formData.append("nazwa", dane.nazwa);
    formData.append("cena", dane.cena);
    formData.append("zdjecie", dane.zdjecie);

    await pb.collection("auta").create(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex w-[300px] h-[330px]">
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dodaj auto</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Card className="p-10 flex justify-center items-center flex-col gap-2">
          <Label htmlFor="nazwa">nazwa</Label>
          <Input
            id="nazwa"
            placeholder={"nazwa"}
            onChange={(e) => handleChange(e, "nazwa")}
          />
          <Label htmlFor="nazwa">cena</Label>

          <Input
            id="cena"
            type="number"
            placeholder={"cena"}
            onChange={(e) => handleChange(e, "cena")}
          />

          <Input
            id="zdjecie"
            type="file"
            placeholder={"zdjecie"}
            onChange={(e) => {
              setDane((prevDane) => {
                return {
                  ...prevDane,
                  zdjecie: e.target.files[0],
                };
              });
            }}
          />
        </Card>
        <DialogFooter>
          <Trigger asChild>
            <Button type="submit" onClick={handleSubmitButton}>
              Dodaj
            </Button>
          </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
