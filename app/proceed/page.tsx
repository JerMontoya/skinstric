"use client";

import Link from "next/link";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Page() {
  // LEFT set refs
  const leftSquare1 = useRef(null);
  const leftSquare2 = useRef(null);
  const leftSquare3 = useRef(null);

  // RIGHT set refs
  const rightSquare1 = useRef(null);
  const rightSquare2 = useRef(null);
  const rightSquare3 = useRef(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Open file picker
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert file → Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result;

      // Send to API
      await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64String }),
        }
      );
    };
  };

  useEffect(() => {
    // Animate left squares
    gsap.to(leftSquare1.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(leftSquare2.current, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(leftSquare3.current, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "linear",
    });

    // Animate right squares
    gsap.to(rightSquare1.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(rightSquare2.current, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(rightSquare3.current, {
      rotation: 360,
      duration: 100,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="absolute top-16 left-9 text-[12px] font-semibold">
        TO START ANALYSIS
      </div>

      <div className="relative w-full h-screen overflow-hidden flex">
        {/* LEFT half */}
        <div className="w-1/2 flex justify-center items-center relative">
          <div className="relative  w-[325px] h-[325px]">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[275px] h-[275px] border-2 border-dashed border-[#C0C4CC]"
              ref={leftSquare1}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-dashed border-[#E0E3EE] rotate-25"
              ref={leftSquare2}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[325px] h-[325px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={leftSquare3}
            ></div>
          </div>
          <button className="absolute top-[35%] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
            <Image
              src="/camera-icon.jpg"
              alt="camera"
              width={150}
              height={150}
            />
          </button>

          {/* LINE POINTING TO TEXT */}
          <Image
            src="/line.png"
            alt="line"
            width={75}
            height={75}
            className="absolute top-[33%] left-[57.5%]"
          />

          {/* TEXT TO THE RIGHT */}
          <div className="absolute top-[31.5%] left-[68%] text-left text-[13px] font-medium leading-[1.8]">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </div>
        </div>

        {/* RIGHT half */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative w-[325px] h-[325px] flex justify-center items-center">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[275px] h-[275px] border-2 border-dashed border-[#C0C4CC]"
              ref={rightSquare1}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-2 border-dashed border-[#E0E3EE] rotate-25"
              ref={rightSquare2}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[325px] h-[325px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={rightSquare3}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/line.png"
              alt="line"
              width={75}
              height={75}
              className="absolute top-[49%] left-[66.5%] rotate-180"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleButtonClick}
              className="absolute top-[35%] left-[70%] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image
                src="/gallery.png"
                alt="gallery"
                width={150}
                height={150}
              />
            </button>
            <div className="absolute top-[56.5%] left-[57.5%] text-right text-[13px] font-medium leading-[1.8]">
              ALLOW A.I.
              <br />
              TO ACCESS GALLERY
            </div>
          </div>
        </div>
      </div>

      <Link href="/name">
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
    </div>
  );
}
