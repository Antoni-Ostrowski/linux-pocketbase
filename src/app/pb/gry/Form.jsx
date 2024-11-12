"use client";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Form({ pb }) {
  const [dane, setDane] = useState({
    nazwa: null,
    cena: null,
    opis: null,
    zdjecie: null,
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
    formData.append("zdjecie", dane.zdjecie);

    await pb.collection("gry").create(formData);
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[400px] p-10 flex justify-center items-center flex-col gap-10">
        <Input
          id="nazwa"
          placeholder={"nazwa"}
          onChange={(e) => handleChange(e, "nazwa")}
        />
        <Input
          id="cena"
          placeholder={"cena"}
          onChange={(e) => handleChange(e, "cena")}
        />
        <Input
          id="opis"
          placeholder={"opis"}
          onChange={(e) => handleChange(e, "opis")}
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

        <Button variant="outline" onClick={handleSubmitButton}>
          Button
        </Button>
      </Card>
    </div>
  );
}
