import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="px-6 md:px-12 py-8 max-w-360 mx-auto">
      <div className="bg-[#1c1c1e] border border-[#2a2a2a] rounded-3xl p-8 lg:px-16 lg:py-10 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-6 max-w-xl flex flex-col items-start">
          <span className="text-[#ccff00] font-bold uppercase tracking-wider text-sm">
            Workout Library
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold font-oswald uppercase leading-tight text-white">
            Train with intent.<br />Log every set.
          </h1>
          <p className="text-gray-400 text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="pt-4">
            <a href="#library" className="btn bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold border-none rounded uppercase px-8 w-fit inline-flex">
              Browse Workouts
            </a>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-87.5 lg:max-w-100 aspect-3/4 overflow-hidden bg-transparent">
            <Image 
              src="/banner.png" 
              alt="Hero Workout" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-right" 
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
}