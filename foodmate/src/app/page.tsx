import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <form className="w-full max-w-sm space-y-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input id="email" type="email" placeholder="Your email" />

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

