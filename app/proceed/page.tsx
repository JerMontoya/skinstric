"use client";

import Link from "next/link";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  // LEFT set refs
  const leftSquare1 = useRef(null);
  const leftSquare2 = useRef(null);
  const leftSquare3 = useRef(null);

  // RIGHT set refs
  const rightSquare1 = useRef(null);
  const rightSquare2 = useRef(null);
  const rightSquare3 = useRef(null);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCameraClick = () => {
    setCameraLoading(true); // start unique loading
    setTimeout(() => {
      router.push("/camera");
    }, 2000); // slight delay so user sees the loading overlay
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const base64 = await convertToBase64(file);

      const response = await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        }
      );

      const apiResults = await response.json();

      // Save to localStorage
      localStorage.setItem(
        "demographicsResults",
        JSON.stringify(apiResults.data)
      );

      // Wait a short time for UI
      await new Promise((resolve) => setTimeout(resolve, 300));

      router.push("/analysis");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  useEffect(() => {
    if (!loading) return;

    const anims = [
      gsap.to(rightSquare1.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
      }),
      gsap.to(rightSquare2.current, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "linear",
      }),
      gsap.to(rightSquare3.current, {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "linear",
      }),
    ];

    return () => anims.forEach((a) => a.kill());
  }, [loading]);

  useEffect(() => {
    if (!cameraLoading) return;

    const anims = [
      gsap.to(rightSquare1.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
      }),
      gsap.to(rightSquare2.current, {
        rotation: 360,
        duration: 80,
        repeat: -1,
        ease: "linear",
      }),
      gsap.to(rightSquare3.current, {
        rotation: 360,
        duration: 100,
        repeat: -1,
        ease: "linear",
      }),
    ];

    return () => anims.forEach((a) => a.kill());
  }, [cameraLoading]);

  return (
    <div>
      <Header variant="noButton" />
      <div className="absolute top-16 left-9 text-[12px] font-semibold">
        TO START ANALYSIS
      </div>

      <div className="relative w-full h-screen overflow-hidden sm:flex">
        {/* LEFT half */}
        <div className="sm:w-1/2 flex justify-center items-center relative">
          <div className="relative  w-[325px] h-[325px]">
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[40%] left-[30%] sm:w-[275px] sm:h-[275px] w-[150px] h-[150px] border-2 border-dashed sm:border-[#C0C4CC] border-[#F0F2F8]"
              ref={leftSquare1}
            ></div>
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[40%] left-[30%] sm:w-[300px] sm:h-[300px] w-[175px] h-[175px] border-2 border-dashed sm:border-[#E0E3EE] border-[#F0F2F8] rotate-25"
              ref={leftSquare2}
            ></div>
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[40%] left-[30%] sm:w-[325px] sm:h-[325px] w-[200px] h-[200px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={leftSquare3}
            ></div>
          </div>
          <button
            className="absolute sm:top-[35%] top-[50%] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 translate-x-5 sm:translate-x-0"
            onClick={handleCameraClick}
          >
            <Image
              src="/camera-icon.jpg"
              alt="camera"
              width={150}
              height={150}
              className="sm:w-[150px] sm:h-[150px] w-[120px] h-[120px]"
            />
          </button>

          {/* LINE POINTING TO TEXT */}
          <Image
            src="/line.png"
            alt="line"
            width={75}
            height={75}
            className="absolute top-[33%] left-[57.5%] hidden sm:block"
          />

          {/* TEXT TO THE RIGHT */}
          <div className="absolute sm:top-[31.5%] sm:left-[68%] top-[90%] left-[45%] text-left sm:text-[13px] text-[11px] font-medium leading-[1.8]">
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </div>
        </div>

        {/* RIGHT half */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative w-[325px] h-[325px] flex justify-center items-center">
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[30%] left-[75%] sm:w-[275px] sm:h-[275px] w-[150px] h-[150px] border-2 border-dashed sm:border-[#C0C4CC] border-[#F0F2F8]"
              ref={rightSquare1}
            ></div>
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[30%] left-[75%] sm:w-[300px] sm:h-[300px] w-[175px] h-[175px] border-2 border-dashed sm:border-[#E0E3EE] border-[#F0F2F8] rotate-25"
              ref={rightSquare2}
            ></div>
            <div
              className="absolute sm:top-[-5%] sm:left-[8%] top-[30%] left-[75%] sm:w-[325px] sm:h-[325px] w-[200px] h-[200px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={rightSquare3}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/line.png"
              alt="line"
              width={75}
              height={75}
              className="absolute top-[49%] left-[66.5%] rotate-180 hidden sm:block"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              onClick={handleGalleryClick}
              className="absolute sm:top-[35%] sm:left-[70%] top-[57%] left-[45%] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image
                src="/gallery.png"
                alt="gallery"
                width={150}
                height={150}
                className="sm:w-[150px] sm:h-[150px] w-[120px] h-[120px]"
              />
            </button>
            <div className="absolute sm:top-[56.5%] sm:left-[57.5%] top-[75%] left-[45%] text-right sm:text-[13px] text-[11px] font-medium leading-[1.8]">
              ALLOW A.I.
              <br />
              TO ACCESS GALLERY
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative w-[325px] h-[325px] flex items-center justify-center">
            <div
              className="absolute w-[275px] h-[275px] border-2 border-dashed border-[#C0C4CC]"
              ref={rightSquare1}
            ></div>
            <div
              className="absolute w-[300px] h-[300px] border-2 border-dashed border-[#E0E3EE] rotate-25"
              ref={rightSquare2}
            ></div>
            <div
              className="absolute w-[325px] h-[325px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={rightSquare3}
            ></div>

            {/* Text centered inside squares */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <span className="text-[14px] font-semibold text-[#1A1B1C]">
                PREPARING YOUR ANALYSIS
              </span>
            </div>
          </div>
        </div>
      )}

      {cameraLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="relative w-[325px] h-[325px] flex items-center justify-center">
            <div
              className="absolute w-[275px] h-[275px] border-2 border-dashed border-[#C0C4CC]"
              ref={rightSquare1}
            ></div>
            <div
              className="absolute w-[300px] h-[300px] border-2 border-dashed border-[#E0E3EE] rotate-25"
              ref={rightSquare2}
            ></div>
            <div
              className="absolute w-[325px] h-[325px] border-2 border-dashed border-[#F0F2F8] rotate-50"
              ref={rightSquare3}
            ></div>

            {/* Text centered inside squares */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
              <Image
                src="/camera-icon.jpg"
                alt="camera"
                width={150}
                height={150}
              />
              <span className="sm:text-[14px] text-[10px] font-semibold text-[#1A1B1C]">
                SETTING UP CAMERA
              </span>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm sm:text-base text-[#1A1B1C] text-center flex flex-col gap-6">
            <div>TO GET BETTER RESULTS MAKE SURE YOU HAVE</div>
            <div className="flex gap-8 justify-center text-xs sm:text-sm">
              <div>◇ NEUTRAL EXPRESSION</div>
              <div>◇ FRONTAL POSE</div>
              <div>◇ ADEQUATE LIGHTING</div>
            </div>
          </div>
        </div>
      )}

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
