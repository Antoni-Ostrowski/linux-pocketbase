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
import { Pencil } from "lucide-react";
import { useState } from "react";

export function EditButton({ gra, pb }) {
  const [dane, setDane] = useState({
    nazwa: gra.nazwa,
    cena: gra.cena,
    opis: gra.opis,
    // zdjecie: null,
  });

  function handleChange(e, source) {
    setDane((prevDane) => {
      return { ...prevDane, [source]: e.target.value };
    });
  }

  async function handleSubmitButton() {
    const formData = new FormData();
    formData.append("nazwa", dane.nazwa);
    formData.append("cena", dane.cena);
    formData.append("opis", dane.opis);
    // formData.append("zdjecie", dane.zdjecie);

    console.log(dane);

    await pb.collection("gry").update(gra.id, formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj gre</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Card className="p-10 flex justify-center items-center flex-col gap-2">
          <Label htmlFor="nazwa">nazwa</Label>
          <Input
            id="nazwa"
            placeholder={"nazwa"}
            defaultValue={gra.nazwa}
            onChange={(e) => handleChange(e, "nazwa")}
          />
          <Label htmlFor="nazwa">cena</Label>

          <Input
            id="cena"
            placeholder={"cena"}
            defaultValue={gra.cena}
            onChange={(e) => handleChange(e, "cena")}
          />
          <Label htmlFor="nazwa">opis</Label>

          <Input
            id="opis"
            placeholder={"opis"}
            defaultValue={gra.opis}
            onChange={(e) => handleChange(e, "opis")}
          />
          {/* <Input
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
          /> */}
        </Card>
        <DialogFooter>
          <Trigger asChild>
            <Button type="submit" onClick={handleSubmitButton}>
              Zapisz zamiany
            </Button>
          </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
