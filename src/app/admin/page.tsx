"use client";
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "#080810" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p
            className="text-sf-blue mb-2 uppercase tracking-widest"
            style={{
              fontSize: "10px",
              fontFamily: "var(--font-jetbrains, monospace)",
            }}
          >
            Admin
          </p>
          <h1
            className="text-sf-white"
            style={{
              fontFamily: "var(--font-cal), Inter, system-ui, sans-serif",
              fontSize: "28px",
            }}
          >
            Stackform Admin
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/studio"
            className="block rounded-xl border border-sf-border p-6 transition-all duration-200 hover:border-sf-blue/40"
            style={{ backgroundColor: "#0d0d18" }}
          >
            <div className="text-3xl mb-3">📁</div>
            <div className="text-sf-white font-medium mb-1">Manage Projects</div>
            <div className="text-sf-white-faint" style={{ fontSize: "12px" }}>
              Add, edit, or remove case studies
            </div>
          </Link>

          <Link
            href="/studio/structure/project"
            className="block rounded-xl border border-sf-border p-6 transition-all duration-200 hover:border-sf-blue/40"
            style={{ backgroundColor: "#0d0d18" }}
          >
            <div className="text-3xl mb-3">➕</div>
            <div className="text-sf-white font-medium mb-1">Add New Project</div>
            <div className="text-sf-white-faint" style={{ fontSize: "12px" }}>
              Create a new case study
            </div>
          </Link>

          <Link
            href="/"
            className="block rounded-xl border border-sf-border p-6 transition-all duration-200 hover:border-sf-blue/40"
            style={{ backgroundColor: "#0d0d18" }}
          >
            <div className="text-3xl mb-3">🌐</div>
            <div className="text-sf-white font-medium mb-1">View Site</div>
            <div className="text-sf-white-faint" style={{ fontSize: "12px" }}>
              Open the public-facing website
            </div>
          </Link>

          <button
            onClick={() => {
              sessionStorage.removeItem("sf-admin");
              window.location.reload();
            }}
            className="block rounded-xl border border-sf-border p-6 text-left transition-all duration-200 hover:border-red-400/30 w-full cursor-pointer"
            style={{ backgroundColor: "#0d0d18" }}
          >
            <div className="text-3xl mb-3">🔒</div>
            <div className="text-sf-white font-medium mb-1">Sign Out</div>
            <div className="text-sf-white-faint" style={{ fontSize: "12px" }}>
              Clear admin session
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
