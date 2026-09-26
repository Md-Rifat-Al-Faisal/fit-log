import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="px-6 md:px-12 py-12 lg:py-20 flex flex-col lg:flex-row items-center gap-12 max-w-360 mx-auto">
      <div className="flex-1 space-y-6">
        <span className="badge text-[#ccff00] bg-[#1c1c1e] border border-[#2a2a2a] font-bold uppercase tracking-wider p-4">
          Workout Library
        </span>
        <h1 className="text-5xl lg:text-7xl font-bold font-oswald uppercase leading-tight text-white">
          Train with intent. <br /> Log every set.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold border-none rounded uppercase px-8">
          Browse Workouts
        </a>
      </div>
      <div className="flex-1 w-full flex justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-transparent">
          <Image src="/banner.png" alt="Hero Workout" fill className="object-cover" priority />
        </div>
      </div>
    </section>
  );
}