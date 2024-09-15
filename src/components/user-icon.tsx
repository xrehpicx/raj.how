"use client";
import { useAuth } from "@/context/auth/AuthProvider";
import Image from "next/image";
import Avvvatars from "avvvatars-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { PopoverArrow } from "@radix-ui/react-popover";
import Link from "next/link";
import { Key } from "lucide-react";

export function UserIcon() {
  return (
    <div className="">
      <UserImage />
    </div>
  );
}

function UserImage() {
  const { user, logout, login } = useAuth();

  if (user?.avatar)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Image
            suppressHydrationWarning
            src={user?.avatar}
            alt="profile"
            width={20}
            height={20}
            className="rounded-full"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <PopoverArrow className="fill-background" />
          <Command>
            <CommandInput placeholder="Search actions" />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    logout();
                  }}
                >
                  Logout
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );

  return (
    <Link suppressHydrationWarning href="/login">
      <Key size={12} />
    </Link>
  );
}
