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
import { Switch } from "@/components/ui/switch";
import { Ellipsis, Pencil } from "lucide-react";
import { useState } from "react";

export function EditButton({ auto, pb }) {
  const [dane, setDane] = useState({
    nazwa: auto.nazwa,
    cena: auto.cena,
    zdjecie: auto.zdjecie,
    wypozyczony: auto.wypozyczony,
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
    formData.append("zdjecie", dane.zdjecie);
    formData.append("wypozyczony", dane.wypozyczony);

    console.log(dane);

    await pb.collection("auta").update(auto.id, formData);
  }
  async function handleDelete() {
    await pb.collection("auta").delete(auto.id);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Ellipsis />
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
            defaultValue={auto.nazwa}
            onChange={(e) => handleChange(e, "nazwa")}
          />
          <Label htmlFor="nazwa">cena</Label>

          <Input
            id="cena"
            placeholder={"cena"}
            defaultValue={auto.cena}
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

          <div>
            <Switch
              id="wypozyczony"
              onCheckedChange={(e) =>
                setDane((prevDane) => {
                  return { ...prevDane, ["wypozyczony"]: e };
                })
              }
              defaultChecked={auto.wypozyczony}
            />
            <Label htmlFor="wypozyczony">Wypożyczony</Label>
          </div>
        </Card>
        <DialogFooter>
          <Trigger asChild>
            <div className="flex gap-[10px]">
              <div>
                <Button variant="destructive" onClick={handleDelete}>
                  Usuń auto
                </Button>
              </div>
              <div>
                <Button type="submit" onClick={handleSubmitButton}>
                  Zapisz zamiany
                </Button>
              </div>
            </div>
          </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
