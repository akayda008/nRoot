"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logos/nRoot-Logo.png";
import { useState, useRef } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const hoverTimeout = useRef(null);

  // Hover-based dropdown (for desktop)
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpen(true), 80);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white shadow flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 h-(--header-height)"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src={logo}
            alt="nRoot Technologies Logo"
            width={200}
            height={200}
            className="cursor-pointer hover:scale-105 transition-transform w-12 sm:w-14 lg:w-16 h-auto"
            priority
          />
        </Link>
      </div>

      {/* Title */}
      <h1
        className="text-xl sm:text-2xl lg:text-3xl font-semibold text-center flex-1 select-none leading-tight tracking-tight text-gray-800"
      >
        <span className="text-red-600">nR</span>oot Technologies Private Limited
      </h1>

      {/* Menu Button + Dropdown */}
      <nav
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl bg-none border-none cursor-pointer select-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-3 bg-white rounded-xl shadow-lg ring-1 ring-black/5 flex flex-col min-w-[260px] p-2 transition-all duration-200 ease-out opacity-100 translate-y-0"
          >
            {/* Core Pages */}
            <Link href="/" className="menu-item">Home</Link>
            <Link href="/about-us" className="menu-item">About Us</Link>

            {/* Our Projects Dropdown */}
            <div className="relative group">
              <Link href="/our-projects" className="menu-item flex justify-between items-center">
                Our Projects <span className="text-gray-400 group-hover:text-gray-600">▸</span>
              </Link>
              <div className="submenu group-hover:flex">
                <Link href="/our-projects/greenfield-projects" className="submenu-item">Greenfield Projects</Link>
                <Link href="/our-projects/brownfield-projects" className="submenu-item">Brownfield Projects</Link>
                <Link href="/our-projects/indigenization" className="submenu-item">Indigenization</Link>
                <Link href="/our-projects/reengineered-projects" className="submenu-item">Reengineered Projects</Link>
              </div>
            </div>

            {/* Consultancy Dropdown */}
            <div className="relative group">
              <Link href="/consultancy-services" className="menu-item flex justify-between items-center">
                Consultancy Services<span className="text-gray-400 group-hover:text-gray-600">▸</span>
              </Link>
              <div className="submenu group-hover:flex">
                <Link href="/consultancy-services/project-management" className="submenu-item">Project Management</Link>
                <Link href="/consultancy-services/research-and-development" className="submenu-item">Research & Development</Link>
                <Link href="/consultancy-services/skill-development-and-placement" className="submenu-item">Skill Development & Placement</Link>
              </div>
            </div>

            {/* Other Links */}
            <Link href="/patrons-and-partners" className="menu-item">Patrons & Partners</Link>
            <Link href="/awards-and-achievements" className="menu-item">Awards & Achievements</Link>
            <Link href="/gallery-and-events" className="menu-item">Gallery & Events</Link>
            <Link href="/contact-us" className="menu-item">Contact Us</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
