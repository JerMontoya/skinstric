import Link from "next/link";

interface HeaderProps {
  variant?: "default" | "noButton"; // you can add more variants if needed
  spanText?: string; // optional custom text for the span
}

export default function Header({ variant = "default", spanText }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-5 px-8">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-[10px] font-semibold cursor-pointer">SKINSTRIC</Link>
        <span className="text-gray-400 text-[10px] font-semibold">
          {spanText || "[ INTRO ]"}
        </span>
      </div>

      {/* Right side non-clickable button */}
       {variant === "default" && (
        <button className="bg-black text-white px-3 py-2 text-[8px] font-semibold tracking-tighter">
          ENTER CODE
        </button>
      )}
    </header>
  );
}