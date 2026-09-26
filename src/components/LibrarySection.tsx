"use client";

import { useState, useEffect } from "react";
import { Workout } from "@/types";
import { getAllWorkouts } from "@/utils/api";
import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="px-6 md:px-12 py-16 max-w-360 mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold font-oswald uppercase text-white mb-2">The Library</h2>
        <p className="text-gray-400">Twelve lifts covering every major muscle group.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}