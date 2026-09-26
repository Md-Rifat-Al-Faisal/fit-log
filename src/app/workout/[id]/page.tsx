"use client";

import { useState, useEffect } from "react";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Workout } from "@/types";
import Image from "next/image";
import { CalendarPlus, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

export default function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [workoutId, setWorkoutId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setWorkoutId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!workoutId) return;

    async function loadWorkout() {
      try {
        const data = await getWorkoutById(workoutId as string);
        setWorkout(data);
      } catch (error) {
        console.error("Failed to load workout details:", error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [workoutId]);

  if (loading || !workoutId) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    );
  }

  if (!workout) {
    notFound();
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
  const isAlreadySaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        <div className="relative w-full min-h-100 lg:min-h-full rounded-2xl overflow-hidden bg-[#1c1c1e]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-oswald uppercase text-white mb-4">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {workout.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {workout.muscleGroups.map((group, idx) => (
                <div
                  key={idx}
                  className="badge bg-[#ccff00] text-black font-bold border-none py-3 px-4 uppercase text-xs"
                >
                  {group}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1c1c1e] rounded-xl overflow-hidden border border-[#2a2a2a]">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-[#2a2a2a]">
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase w-1/3">
                    Equipment
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.equipment}
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Difficulty
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.difficulty}
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Sets
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.sets}
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Reps
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.reps}
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Duration
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.duration} min
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Calories
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.caloriesBurned} kcal
                  </td>
                </tr>
                <tr className="hover:bg-[#2a2a2a]/50 transition">
                  <th className="px-6 py-4 text-gray-400 font-bold uppercase">
                    Rating
                  </th>
                  <td className="px-6 py-4 text-white text-right font-medium">
                    {workout.rating}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl font-bold font-oswald text-white uppercase mb-4 tracking-wider">
              Instructions
            </h3>
            <ol className="space-y-4">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-4 text-gray-300">
                  <span className="text-gray-500 font-bold">{idx + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToPlan(workout)}
              className={`btn font-bold uppercase flex-1 h-14 border-none ${
                isPlanFull || isAlreadyInPlan
                  ? "bg-[#454c59] text-gray-200 cursor-not-allowed hover:bg-[#454c59]"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black"
              }`}
            >
              <CalendarPlus size={20} />
              {isAlreadyInPlan
                ? "Already in Plan"
                : isPlanFull
                  ? "Plan Full"
                  : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className={`btn uppercase flex-1 h-14 ${
                isAlreadySaved
                  ? "bg-[#15171c] border-[#23262f] text-gray-400 cursor-not-allowed hover:bg-[#15171c]"
                  : "btn-outline border-gray-500 text-white hover:bg-[#1c1c1e] hover:border-gray-400 hover:text-white"
              }`}
            >
              <Bookmark size={20} />
              {isAlreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}