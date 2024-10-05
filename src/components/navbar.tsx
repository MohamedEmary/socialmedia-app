"use client";

import Link from "next/link";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import logo from "../assets/logo.png";
import { ModeToggle } from "./ui/dark-toggle";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between fixed top-0 w-full z-10 px-4 py-2 border-b dark:bg-black bg-white">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Yap Logo" width={40} height={40} />
          <span className="font-bold text-3xl italic text-blue-400">Yap</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <Link href="/profile">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link
              href="/login"
              onClick={() => localStorage.removeItem("token")}>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href="/signup">
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Signup</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
