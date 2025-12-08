"use client";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./components/Header";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Page() {
  const titleRef = useRef(null);

  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const leftSquareRef = useRef(null);
  const rightSquareRef = useRef(null);

  useGSAP(() => {
    const title = document.querySelector("h1");
    const leftBtn = document.querySelector("#left-btn");
    const rightBtn = document.querySelector("#right-btn");
    const leftSquare = document.querySelector("#left-square");
    const rightSquare = document.querySelector("#right-square");

    if (!title || !leftBtn || !rightBtn || !leftSquare || !rightSquare) return;

    leftBtn.addEventListener("mouseenter", () => {
      gsap.to(title, { x: 300, duration: 0.5 });
      gsap.to(rightBtn, { opacity: 0, duration: 0.3 });
      gsap.to(rightSquare, { opacity: 0, duration: 0.3 });
    });

    leftBtn.addEventListener("mouseleave", () => {
      gsap.to(title, { x: 0, duration: 0.5 });
      gsap.to(rightBtn, { opacity: 1, duration: 0.3 });
      gsap.to(rightSquare, { opacity: 1, duration: 0.3 });
    });

    rightBtn.addEventListener("mouseenter", () => {
      gsap.to(title, { x: -300, duration: 0.5 });
      gsap.to(leftBtn, { opacity: 0, duration: 0.3 });
      gsap.to(leftSquare, { opacity: 0, duration: 0.3 });
    });

    rightBtn.addEventListener("mouseleave", () => {
      gsap.to(title, { x: 0, duration: 0.5 });
      gsap.to(leftBtn, { opacity: 1, duration: 0.3 });
      gsap.to(leftSquare, { opacity: 1, duration: 0.3 });
    });
  }, []);

  return (
    <div className="relative w-full h-screen">
      <Header />

      {/* LEFT square + button */}
      <div
        id="left-square"
        ref={leftSquareRef}
        className="absolute top-1/2 -translate-y-1/2 left-[-300px] w-[515px] h-[515px]"
      >
        <div className="absolute inset-0 border-2 border-dashed border-[#A0A4AB] rotate-45 opacity-100 pointer-events-none"></div>

        <button
          id="left-btn"
          ref={leftBtnRef}
          className="absolute top-1/2 left-[70%] transform -translate-y-1/2 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer"
        >
          <div className="w-8 h-8 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 rotate-20" />
          </div>
          <div className="text-[14px]">DISCOVER A.I.</div>
        </button>
      </div>

      {/* RIGHT square + button */}
      <div
        id="right-square"
        ref={rightSquareRef}
        className="absolute top-1/2 -translate-y-1/2 right-[-300px] w-[515px] h-[515px]"
      >
        <div className="absolute inset-0 border-2 border-dashed border-[#A0A4AB] rotate-45 opacity-100"></div>

        <button
          id="right-btn"
          ref={rightBtnRef}
          className="absolute top-1/2 left-[-5%] transform -translate-y-1/2 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer"
        >
          <div className="text-[14px]">TAKE TEST</div>
          <div className="w-8 h-8 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3 rotate-70" />
          </div>
        </button>
      </div>

      {/* TITLE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          ref={titleRef}
          className="text-8xl font-light text-gray-800 text-center"
        >
          Sophisticated <br /> skincare
        </h1>
      </div>

      {/* bottom text */}
      <div className="absolute bottom-13 left-3 w-[350px] text-[14px] leading-snug">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
}
