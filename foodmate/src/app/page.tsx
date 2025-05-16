import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col p-6">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/bg-foodmate.webp')" }}
      />

      {/* Top navigation */}
      <div className="flex justify-end items-center gap-4 mb-8">
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

      {/* Center content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-2xl w-full text-center space-y-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
            Welcome to <span className="text-orange-600">FoodMate</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            Your friendly neighborhood food ordering app — fast, fresh, and right to your door.
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

