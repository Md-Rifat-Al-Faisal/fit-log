import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-9xl font-bold text-[#ccff00] mb-4 font-oswald">404</h1>
      <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-wider">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page or workout you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/" className="btn bg-[#ccff00] text-black font-bold py-3 px-8 rounded hover:bg-[#b3e600] border-none uppercase">
        Go To Workouts
      </Link>
    </div>
  );
}