import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">
          Welcome to <span className="text-orange-600">FoodMate</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
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
    </main>
  );
}

