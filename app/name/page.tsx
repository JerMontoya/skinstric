"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const square1 = useRef(null);
  const square2 = useRef(null);
  const square3 = useRef(null);

  const [stage, setStage] = useState<
    "name" | "location" | "loading" | "thankYou"
  >("name");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const router = useRouter();

  const handleProceed = () => {
    router.push("/proceed"); // Navigate to your proceed/page.tsx
  };

  useEffect(() => {
    gsap.to(square1.current, {
      rotation: 360,
      duration: 60, // 60 seconds for a full spin
      repeat: -1, // infinite loop
      ease: "linear",
    });
    gsap.to(square2.current, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(square3.current, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (stage === "name" && name.trim() !== "") {
        setStage("location");
      } else if (stage === "location" && location.trim() !== "") {
        // Simulate submission
        setStage("loading");
        setTimeout(() => {
          // Here you can POST to your API with { name, location }
          setStage("thankYou");
        }, 2000); // 2 seconds "Processing Submission"
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />

      {/* Small top text */}
      <div className="absolute top-16 left-9 text-[12px] font-semibold">
        TO START ANALYSIS
      </div>

      {/* Centered content with squares */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex flex-col items-center justify-center">
          {/* Squares */}
          <div
            ref={square1}
            className="absolute w-[425px] h-[425px] border-2 border-dashed border-[#C0C4CC]"
          ></div>
          <div
            ref={square2}
            className="absolute w-[475px] h-[475px] border-2 border-dashed border-[#E0E3EE] rotate-25"
          ></div>
          <div
            ref={square3}
            className="absolute w-[525px] h-[525px] border-2 border-dashed border-[#F0F2F8] rotate-50"
          ></div>

          {/* Center text */}

          <div className="relative z-10 flex flex-col items-center gap-2 text-center">
            {stage === "name" && (
              <>
                <div className="text-[14px] text-[#A0A4AB]">CLICK TO TYPE</div>
                <input
                  type="text"
                  placeholder="Introduce Yourself"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="placeholder-[#85898F] text-6xl text-[#85898F] tracking-[-0.04em] bg-transparent underline decoration-[#85898F] decoration-1 underline-offset-8 focus:outline-none text-center"
                  autoFocus
                />
              </>
            )}
            {stage === "location" && (
              <>
                <div className="text-[14px] text-[#A0A4AB]">
                  WHERE ARE YOU FROM?
                </div>
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="placeholder-[#85898F] text-6xl text-[#85898F] tracking-[-0.04em] bg-transparent underline decoration-[#85898F] decoration-1 underline-offset-8 focus:outline-none text-center"
                  autoFocus
                />
              </>
            )}
            {stage === "loading" && (
              <div>
                <div className="text-xl text-[#85898F]">
                  Processing submission
                </div>
                <div className="text-5xl text-[#85898F]">. . .</div>
              </div>
            )}
            {stage === "thankYou" && (
              <div className="flex flex-col gap-4">
                <div className="text-2xl text-[#4F5257]">Thank you!</div>
                <div className="text-xl text-[#4F5257]">Proceed for the next step</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom-left button */}
      <Link href="/">
        <button className="absolute bottom-7 left-7 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer">
          <div className="w-10 h-10 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon
              icon={faPlay}
              className="rotate-20"
              style={{ width: "0.8rem", height: "0.8rem" }}
            />
          </div>
          <div className="text-[13px] font-semibold">BACK</div>
        </button>
      </Link>

      {/* Bottom-right Proceed button */}
      {stage === "thankYou" && (
        <button
          onClick={handleProceed}
          className="absolute bottom-7 right-7 px-4 py-2 flex items-center gap-4 whitespace-nowrap cursor-pointer"
        >
          <div className="text-[13px] font-semibold">PROCEED</div>
          <div className="w-10 h-10 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 rotate-70" />
          </div>
        </button>
      )}
    </div>
  );
}
