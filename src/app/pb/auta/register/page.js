"use client";
import PocketBase from "pocketbase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
  const pb = new PocketBase("http://172.16.15.155:8080");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(null);
  useEffect(() => {
    setIsValid(pb.authStore.isValid);
  }, []);
  const router = useRouter();

  async function handleButton() {
    console.log(email);
    console.log(password);

    try {
      const data = {
        email: email,
        password: password,
        passwordConfirm: password,
      };
      const record = await pb.collection("users").create(data);

      console.log(record);

      if (record !== null) {
        try {
          const authData = await pb
            .collection("users")
            .authWithPassword(email, password);
          console.log(authData);
          router.push("/pb/auta");
        } catch (error) {
          setError(true);
          console.log(error);
        }
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }
  return (
    <div>
      {isValid ? (
        <div>jestes juz zalogowany</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Zarejestruj sie</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-10 flex-col">
            <Label htmlFor="email">
              <h2>email</h2>
              <Input
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Label>
            <Label htmlFor="password">
              <h2>password</h2>
              <Input
                password="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Label>
          </CardContent>
          <CardFooter>
            <Button onClick={handleButton}>Zarejestruj</Button>
            <div>{error && <p>wystapil blad</p>}</div>
            <Link href={"/pb/auta/login"}>
              <div>logowanie</div>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
