"use client";

import Link from "next/link";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Page() {
  const [show391, setShow391] = useState(false);
  const [show468, setShow468] = useState(false);
  const [show545, setShow545] = useState(false);

  const square391Ref = useRef<HTMLDivElement>(null);
  const square468Ref = useRef<HTMLDivElement>(null);
  const square545Ref = useRef<HTMLDivElement>(null);

  const animateSquare = (
    ref: React.RefObject<HTMLDivElement | null>,
    show: boolean
  ) => {
    if (!ref.current) return;
    if (show) {
      gsap.fromTo(
        ref.current,
        { scale: 0, opacity: 0 }, // start small in center
        { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" } // grow to full size
      );
    } else {
      gsap.to(ref.current, { scale: 0, opacity: 0, duration: 0.3 });
    }
  };

  // useEffect hooks
  useEffect(() => animateSquare(square391Ref, show391), [show391]);
  useEffect(() => animateSquare(square468Ref, show468), [show468]);
  useEffect(() => animateSquare(square545Ref, show545), [show545]);

  return (
    <div>
      <Header variant="noButton" spanText="[ ANALYSIS ]" />

      <div className="absolute top-15 left-9 leading-relaxed">
        <div className="text-[15px] font-semibold mb-1">A.I ANALYSIS</div>
        <div className="text-[14px]">
          A.I. HAS ESTIMATED THE FOLLOWING. <br /> FIX ESTIMATED INFORMATION IF
          NEEDED.
        </div>
      </div>

      <div className="flex justify-center mt-16 relative">
        <div className="relative w-[545px] h-[545px] rotate-45 flex items-center justify-center">
          {/* 545px square */}
          <div
            ref={square545Ref}
            className="absolute w-[545px] h-[545px] border-2 border-[#A0A4AB] border-dashed pointer-events-none"
          ></div>

          {/* 468px square */}
          <div
            ref={square468Ref}
            className="absolute w-[468px] h-[468px] border-2 border-[#A0A4AB] border-dashed pointer-events-none"
          ></div>

          {/* 391px square */}
          <div
            ref={square391Ref}
            className="absolute w-[391px] h-[391px] border-2 border-[#A0A4AB] border-dashed pointer-events-none"
          ></div>

          {/* Inner grid */}
          <div className="w-[315px] h-[315px] grid grid-cols-2 grid-rows-2 gap-2 relative z-10">
            {/* DEMOGRAPHICS */}
            <Link href="/demographics" className="block">
              <div
                className="bg-[#E1E2E2] w-full h-full flex items-center justify-center hover:bg-gray-300 hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                onMouseEnter={() => setShow391(true)}
                onMouseLeave={() => setShow391(false)}
              >
                <div className="-rotate-45 font-semibold text-base leading-6 tracking-[-0.02em] text-center flex items-center">
                  DEMOGRAPHICS
                </div>
              </div>
            </Link>

            {/* SKIN TYPE DETAILS */}
            <div
              className="bg-[#F1F1F2] cursor-not-allowed flex items-center justify-center hover:bg-gray-300 transition duration-300"
              onMouseEnter={() => setShow468(true)}
              onMouseLeave={() => setShow468(false)}
            >
              <div className="-rotate-45 font-semibold text-base leading-6 tracking-[-0.02em] text-center flex items-center">
                SKIN TYPE DETAILS
              </div>
            </div>

            {/* COSMETIC CONCERNS */}
            <div
              className="bg-[#F1F1F2] cursor-not-allowed flex items-center justify-center hover:bg-gray-300 transition duration-300"
              onMouseEnter={() => setShow468(true)}
              onMouseLeave={() => setShow468(false)}
            >
              <div className="-rotate-45 font-semibold text-base leading-6 tracking-[-0.02em] text-center flex items-center">
                COSMETIC CONCERNS
              </div>
            </div>

            {/* WEATHER */}
            <div
              className="bg-[#F1F1F2] cursor-not-allowed flex items-center justify-center hover:bg-gray-300 transition duration-300"
              onMouseEnter={() => setShow545(true)}
              onMouseLeave={() => setShow545(false)}
            >
              <div className="-rotate-45 font-semibold text-base leading-6 tracking-[-0.02em] text-center flex items-center">
                WEATHER
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link href="/proceed">
        <button className="absolute bottom-2 left-7 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer">
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

      <Link href="/demographics">
        <button className="absolute bottom-2 right-7 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer">
          <div className="text-[13px] font-semibold">GET SUMMARY</div>
          <div className="w-10 h-10 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon
              icon={faPlay}
              className="rotate-70"
              style={{ width: "0.8rem", height: "0.8rem" }}
            />
          </div>
        </button>
      </Link>
    </div>
  );
}
