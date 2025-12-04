export default function Header() {
  return (
    <header className="w-full flex items-center justify-between py-5 px-8">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button className="text-[10px] font-semibold cursor-pointer">SKINSTRIC</button>
        <span className="text-gray-400 text-[10px] font-semibold">[ INTRO ]</span>
      </div>

      {/* Right side button */}
      <button className="bg-black text-white px-3 py-2 text-[8px] font-semibold tracking-tighter">
        ENTER CODE
      </button>
    </header>
  );
}