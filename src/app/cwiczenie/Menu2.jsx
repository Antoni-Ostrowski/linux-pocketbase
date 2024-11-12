"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
export default function Menu({ pb, user, setUser2, logIn, logOut }) {
  console.log(user);

  return (
    <div className="flex justify-start items-center flex-col">
      {user && (
        <>
          <Avatar>
            <AvatarImage
              src={pb.files.getUrl(user, user?.avatar)}
              alt={user?.avatar}
              width={200}
              height={200}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          {!user ? "nie zalogowany" : "zalogowany"}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!user ? (
            <Link href={"/cwiczenie/login"}>
              <DropdownMenuItem
                onClick={() => {
                  // logIn(pb.authStore.model);
                }}
              >
                log in
              </DropdownMenuItem>
            </Link>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                logOut();
              }}
            >
              log out
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
