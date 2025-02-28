"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        EdTechX
      </Link>

      {/* Centered Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center space-x-8">
        <Link href="/features" className="hover:text-blue-600">Features</Link>
        <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
      </div>

      {/* Right-Aligned Buttons */}
      <div className="hidden md:flex space-x-4">
        <Button variant="ghost">
          <Link href={'/auth/login'}
          >Login</Link>
        </Button>
        <Button>
          <Link href={'/auth/register'}
          >Sign Up</Link>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-700" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white shadow-md transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <Link href="/" className="text-2xl font-bold">
            EdTechX
          </Link>
          <button title="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Mobile Links */}
        <div className="flex flex-col items-center space-y-6 mt-8 text-lg">
          <Link href="/features" onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Button variant="ghost" className="w-full">
            <Link href={'/auth/login'}
            >Login</Link>
          </Button>
          <Button className="w-full">
            <Link href={'/auth/register'}
            >Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
