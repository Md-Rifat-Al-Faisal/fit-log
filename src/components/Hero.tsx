import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="max-w-360 mx-auto w-full px-6 lg:px-8 py-8 lg:py-10">
      <div className="bg-[#15171c] border border-[#23262f] rounded-4xl p-8 lg:px-14 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-10 w-full">

        <div className="w-full lg:flex-1 flex flex-col items-start justify-center">
          <span className="text-[#ccff00] font-bold uppercase tracking-[0.2em] text-xs mb-4 lg:mb-5">
            Workout Library
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-oswald uppercase leading-[1.1] text-white tracking-wide mb-6">
            Train with intent. Log<br />every set.
          </h1>

          <p className="text-[#a1a1aa] text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it<br className="hidden lg:block" /> into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href="#library" className="btn bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold border-none rounded-lg uppercase px-10 min-h-14 h-14 w-fit inline-flex text-sm">
            Browse Workouts
          </a>
        </div>

        <div className="relative w-full max-w-70 sm:max-w-80 lg:max-w-90 aspect-square shrink-0">
          <Image
            src="/banner.png"
            alt="Hero Workout"
            fill
            sizes="(max-width: 1024px) 60vw, 320px"
            className="object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );
}