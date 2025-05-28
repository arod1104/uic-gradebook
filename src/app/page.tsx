"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-blue-200 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/globe.svg"
          alt="UIC Globe"
          width={80}
          height={80}
          className="mb-6 drop-shadow-lg animate-spin-slow"
        />
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 drop-shadow-sm text-center">
          Welcome to <span className="text-blue-700">UIC Gradebook</span>
        </h1>
        <p className="mb-8 text-lg text-blue-800 text-center max-w-2xl font-medium">
          Discover grade distributions for every course and instructor at the
          University of Illinois at Chicago. Search by class, department, or
          professor to make informed decisions and explore academic trends
          across terms.
        </p>
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-indigo-700 transition-all text-lg font-semibold tracking-wide"
          onClick={() => router.push("/search")}
        >
          Start Searching
        </button>
        <div className="mt-12 flex flex-col items-center gap-2 text-blue-700/80 text-sm">
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-4 h-4 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            Data from 2004–2024 | Updated regularly
          </span>
        </div>
      </div>
    </main>
  );
}
