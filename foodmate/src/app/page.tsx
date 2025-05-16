'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react"; // You can also use Heroicons or other icons

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col p-6">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
      />

      {/* Top navigation */}
      <div className="flex justify-between items-center mb-8 relative">
        {/* Logo center on mobile */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Image
            src="/logo-foodmate.png"
            alt="FoodMate Logo"
            width={140}
            height={60}
            priority
          />
        </div>

        {/* Hamburger menu on mobile */}
        <div className="md:hidden absolute right-0">
          <Button
            size="icon"
            variant="ghost"
	    className="text-white hover:bg-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Desktop login/register buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="bg-white/70 hover:bg-white">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-orange-600 text-white hover:bg-orange-700">
              Register
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu (toggleable) */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mb-6 md:hidden items-center">
          <Link href="/login" className="w-full max-w-xs">
            <Button variant="outline" className="w-full bg-white/70 hover:bg-white">
              Login
            </Button>
          </Link>
          <Link href="/register" className="w-full max-w-xs">
            <Button className="w-full bg-orange-600 text-white hover:bg-orange-700">
              Register
            </Button>
          </Link>
        </div>
      )}

      {/* Center content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-6 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Welcome to <span className="text-orange-600">FoodMate</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Your friendly neighborhood food ordering app ... fast, fresh, and right to your door.
          </p>

          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full max-w-xs"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Get Started
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

