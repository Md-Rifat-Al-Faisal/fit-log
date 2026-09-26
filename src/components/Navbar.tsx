"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Menu } from "lucide-react";
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
<nav className="border-b border-white/5 bg-[#0c0d10]/70 backdrop-blur-md sticky top-0 z-50">      <div className="max-w-360 mx-auto w-full px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="dropdown md:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
              <Menu size={24} />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-[#15171c] rounded-box w-52 border border-[#23262f]">
              <li>
                <Link href="/" className={pathname === "/" ? "text-[#ccff00] font-bold" : "text-white"}>
                  Workout
                </Link>
              </li>
              <li>
                <Link href="/my-plan" className={pathname === "/my-plan" ? "text-[#ccff00] font-bold" : "text-white"}>
                  My Plan
                </Link>
              </li>
            </ul>
          </div>
          
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider text-white uppercase font-oswald">
            <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} className="object-contain" priority />
            FitLog
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <Link 
            href="/" 
            className={`px-5 py-2.5 rounded-full transition ${pathname === "/" ? "bg-[#162104] border border-[#263b06] text-[#ccff00]" : "text-gray-400 hover:text-white border border-transparent"}`}
          >
            Workout
          </Link>
          <Link 
            href="/my-plan" 
            className={`px-5 py-2.5 rounded-full transition ${pathname === "/my-plan" ? "bg-[#162104] border border-[#263b06] text-[#ccff00]" : "text-gray-400 hover:text-white border border-transparent"}`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium">
          <Link href="/my-plan" className="flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold px-4 py-2 rounded-full transition">
            Plan
            <span className="bg-black/15 text-black w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {mounted ? plan.length : 0}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 border border-gray-500 hover:border-white text-gray-300 hover:text-white font-bold px-4 py-2 rounded-full transition">
            Saved
            <span className="border border-gray-500 w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {mounted ? saved.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}