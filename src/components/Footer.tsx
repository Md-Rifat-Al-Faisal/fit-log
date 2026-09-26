import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] bg-[#111111] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 mt-auto">
      <div className="flex items-center gap-2 font-bold tracking-wider text-white mb-4 md:mb-0 uppercase font-oswald">
        <Dumbbell className="text-[#ccff00]" size={24} />
        FitLog
      </div>
      <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
    </footer>
  );
}