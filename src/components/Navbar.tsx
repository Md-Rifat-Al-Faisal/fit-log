"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  return (
    <nav className="border-b border-[#2a2a2a] bg-[#111111] py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
            <Menu size={24} />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-[#1c1c1e] rounded-box w-52 border border-[#2a2a2a]">
            <li>
              <Link href="/" className={pathname === "/" ? "text-[#ccff00]" : "text-white"}>
                Workout
              </Link>
            </li>
            <li>
              <Link href="/my-plan" className={pathname === "/my-plan" ? "text-[#ccff00]" : "text-white"}>
                My Plan
              </Link>
            </li>
          </ul>
        </div>
        
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-white uppercase font-oswald">
          <Dumbbell className="text-[#ccff00]" size={28} />
          FitLog
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium bg-[#1c1c1e] px-6 py-2 rounded-full border border-[#2a2a2a]">
        <Link href="/" className={pathname === "/" ? "text-[#ccff00]" : "text-gray-400 hover:text-white transition"}>
          Workout
        </Link>
        <Link href="/my-plan" className={pathname === "/my-plan" ? "text-[#ccff00]" : "text-gray-400 hover:text-white transition"}>
          My Plan
        </Link>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          Plan
          <span className="bg-[#ccff00] text-black w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {mounted ? plan.length : 0}
          </span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
          Saved
          <span className="border border-gray-500 w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {mounted ? saved.length : 0}
          </span>
        </Link>
      </div>
    </nav>
  );
}