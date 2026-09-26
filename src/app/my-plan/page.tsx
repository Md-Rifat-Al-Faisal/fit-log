"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import { PlanWorkout } from "@/types";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone, metrics, isHydrated } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<"duration" | "calories" | "rating">("duration");

  if (!isHydrated) {
    return (
      <div className="max-w-360 mx-auto px-6 md:px-12 py-32 w-full flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#ccff00] mb-4"></span>
        <p className="text-gray-400 font-medium text-lg animate-pulse">Loading workouts…</p>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-360 mx-auto px-6 md:px-12 py-12 w-full">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-oswald uppercase text-white mb-2">My Plan</h1>
        <p className="text-gray-400 mb-8">Cap of five lifts for today. Finish them, then load more.</p>
        
        <div className="bg-[#1c1c1e] rounded-xl border border-[#2a2a2a] p-6 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#2a2a2a]">
          <div className="flex-1 pb-4 md:pb-0 md:pr-6">
            <p className="text-gray-500 text-sm font-medium mb-1">Exercises</p>
            <p className="text-4xl font-bold text-[#ccff00] font-oswald">{metrics.exercises}</p>
          </div>
          <div className="flex-1 py-4 md:py-0 md:px-6">
            <p className="text-gray-500 text-sm font-medium mb-1">Minutes</p>
            <p className="text-4xl font-bold text-white font-oswald">{metrics.minutes}</p>
          </div>
          <div className="flex-1 pt-4 md:pt-0 md:pl-6">
            <p className="text-gray-500 text-sm font-medium mb-1">Calories</p>
            <p className="text-4xl font-bold text-white font-oswald">{metrics.calories}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-[#2a2a2a] pb-4">
        <div className="flex gap-2 p-1 bg-[#1c1c1e] rounded-lg border border-[#2a2a2a]">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${activeTab === "plan" ? "bg-[#2a2a2a] text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition ${activeTab === "saved" ? "bg-[#2a2a2a] text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-medium">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "duration" | "calories" | "rating")}
              className="appearance-none bg-[#1c1c1e] border border-[#2a2a2a] text-white text-sm rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="border border-dashed border-[#2a2a2a] rounded-xl p-12 flex flex-col items-center justify-center text-center bg-[#111111]">
          <h3 className="text-2xl font-bold font-oswald text-white uppercase mb-2">Nothing Here Yet</h3>
          <p className="text-gray-400 mb-6">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold border-none rounded-full px-8 uppercase">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item) => {
            const isCompleted = activeTab === "plan" && (item as PlanWorkout).isDone;

            return (
              <div 
                key={item.id} 
                className={`bg-[#1c1c1e] border border-[#2a2a2a] rounded-xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-[#444] transition ${isCompleted ? "opacity-40 grayscale" : ""}`}
              >
                <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-[#111111]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 200px" className="object-cover" />
                </div>
                
                <div className="flex-1 w-full flex flex-col justify-center">
                  <h3 className={`text-xl font-bold font-oswald uppercase mb-1 ${isCompleted ? "line-through text-gray-500" : "text-white"}`}>
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{item.equipment}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1"><Clock size={14} className="text-[#ccff00]" /> {item.duration} min</span>
                    <span className="flex items-center gap-1"><Flame size={14} className="text-[#ccff00]" /> {item.caloriesBurned} kcal</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-[#ccff00]" /> {item.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 justify-end md:justify-start">
                  <Link href={`/workout/${item.id}`} className="btn btn-sm btn-outline border-gray-600 text-gray-300 hover:bg-[#2a2a2a] hover:border-gray-400 rounded">
                    View Details
                  </Link>
                  
                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      disabled={isCompleted}
                      className="btn btn-sm bg-[#ccff00] hover:bg-[#b3e600] text-black border-none rounded disabled:bg-gray-700 disabled:text-gray-400"
                    >
                      <Check size={16} /> {isCompleted ? "Completed" : "Mark as Done"}
                    </button>
                  )}
                  
                  <button
                    onClick={() => activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)}
                    className="btn btn-sm btn-ghost text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded px-2"
                    aria-label="Remove"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}