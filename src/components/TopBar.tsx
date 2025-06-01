import React from "react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="w-full bg-gray-900 text-white py-4 px-8 shadow flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight">UIC Gradebook</h1>
      <nav>
        <Link
          href="/register"
          className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition font-medium shadow"
        >
          Get API Key
        </Link>
      </nav>
    </header>
  );
}
