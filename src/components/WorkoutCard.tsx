import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="card bg-[#15171c] hover:-translate-y-1 hover:border-[#ccff00]/50 border border-[#23262f] transition-all cursor-pointer overflow-hidden shadow-xl group rounded-lg">
      <figure className="relative h-48 w-full overflow-hidden bg-[#0c0d10]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex gap-2 mb-2 flex-wrap">
          {workout.muscleGroups.map((group, idx) => (
            <div key={idx} className="badge bg-[#ccff00] text-black font-bold border-none text-xs py-3 px-3 uppercase">
              {group}
            </div>
          ))}
        </div>
        <h2 className="card-title text-xl font-bold font-oswald text-white uppercase mt-1">
          {workout.name}
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          {workout.equipment}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-300 mt-auto pt-4 border-t border-[#23262f]">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-[#ccff00]" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame size={14} className="text-[#ccff00]" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star size={14} className="text-[#ccff00]" /> {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}