"use client";
import React from "react";

export default function SearchPage() {
  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-100 p-6 border-r border-gray-200 flex flex-col gap-4">
        <h2 className="text-lg font-semibold mb-2">Search Filters</h2>
        <input className="border p-2 rounded" placeholder="Term" />
        <input
          className="border p-2 rounded"
          placeholder="Course Subject Code (crs_subj_cd)"
        />
        <input
          className="border p-2 rounded"
          placeholder="Course Number (crs_nbr)"
        />
        <input
          className="border p-2 rounded"
          placeholder="Course Title (crs_title)"
        />
        <input
          className="border p-2 rounded"
          placeholder="Department Name (dept_name)"
        />
        <input
          className="border p-2 rounded"
          placeholder="Primary Instructor"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          Search
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Search Grade Distributions</h1>
        {/* Results will go here */}
        <div className="text-gray-500">
          Enter search criteria and click "Search" to view results.
        </div>
      </main>
    </div>
  );
}
