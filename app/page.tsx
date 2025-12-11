"use client";

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./components/Header";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const titleRef = useRef(null);

  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const leftSquareRef = useRef(null);
  const rightSquareRef = useRef(null);

  const router = useRouter();

  const handleRightClick = () => {
    router.push("/name");
  };

  useGSAP(() => {

    if (typeof window === "undefined" || window.innerWidth < 640) return;
    
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
        className="absolute top-[55%] -translate-y-[55%]
         /* Desktop layout */
          sm:left-[-300px]

         /* Mobile layout */
         left-1/2 -translate-x-1/2 sm:translate-x-0
         w-[250px] h-[250px] sm:w-[515px] sm:h-[515px] "
      >
        <div className="absolute inset-0 border-2 border-[#E5E6E9] sm:border-dashed sm:border-[#A0A4AB] rotate-45 opacity-100 pointer-events-none"></div>

        <button
          id="left-btn"
          ref={leftBtnRef}
          className="absolute top-1/2 left-[70%] transform -translate-y-1/2 px-4 py-2 items-center gap-6 whitespace-nowrap cursor-pointer hidden sm:flex"
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
        className="
          absolute top-[55%] -translate-y-[55%]
    

          /* Desktop layout */
          sm:right-[-300px]

          /* Mobile layout */
          right-1/2 translate-x-1/2 sm:translate-x-0
          w-[325px] h-[325px] sm:w-[515px] sm:h-[515px]
        "
      >
        <div className="absolute inset-0 border-2 border-[#E5E6E9] sm:border-dashed sm:border-[#A0A4AB] rotate-45 opacity-100"></div>

        <button
          id="right-btn"
          onClick={handleRightClick}
          ref={rightBtnRef}
          className="absolute sm:top-1/2 top-[85%] sm:left-[-5%] left-[32%] transform -translate-y-1/2 px-4 py-2 items-center sm:gap-6 gap-3 whitespace-nowrap cursor-pointer flex"
        >
          <div className="sm:text-[14px] text-[10px]">TAKE TEST</div>
          <div className="sm:w-8 sm:h-8 w-5 h-5 rotate-45 border border-[#1A1B1C] flex items-center justify-center">
            <FontAwesomeIcon icon={faPlay} className="sm:text-[16px] text-[8px] rotate-70" />
          </div>
        </button>
      </div>

      {/* TITLE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1
          ref={titleRef}
          className=" font-light text-gray-800 text-center
      md:text-8xl
      sm:text-6xl
      text-5xl"
        >
          Sophisticated <br /> skincare
        </h1>
      </div>

      {/* bottom text */}
      <div className="absolute sm:text-left text-center sm:left-3 left-47 sm:bottom-13 bottom-70 sm:w-[350px] w-[250px] sm:text-[14px] text-[10px] leading-snug text-[#A0A4AB] sm:text-[#1A1B1C]">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>
    </div>
  );
}
