"use client";

import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" }, // front camera
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
        setError("Camera access denied or unavailable.");
      }
    }

    enableCamera();
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    startCamera();
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size = video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current frame onto canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save image data URL
    const dataUrl = canvas.toDataURL("image/png");
    setPhotoData(dataUrl);

    // Switch UI state
    setHasPhoto(true);

    // Stop the camera
    (video.srcObject as MediaStream)
      ?.getTracks()
      .forEach((track) => track.stop());
  };

  // Retake photo
  //   const retake = () => {
  //     setHasPhoto(false);
  //     setPhotoData(null);

  // Restart camera
  //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();
  //       }
  //     });
  //   };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="absolute top-0 left-0 w-full h-">
        <Header variant="noButton" spanText="[ ]" className="text-white" />
      </div>

      {/* Error message */}
      {error && (
        <div className="text-white text-center px-4">
          <p>{error}</p>
        </div>
      )}

      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* FROZEN PHOTO */}
      {hasPhoto && photoData && (
        <img
          src={photoData}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* CENTER TEXT AFTER CAPTURE */}
      {hasPhoto && (
        <div className="absolute bottom-80 inset-0 flex items-center justify-center z-40">
          <div className="text-white text-[14px] font-semibold text-center">
            GREAT SHOT!
          </div>
        </div>
      )}

      {/* CAPTURE BUTTON (only when not captured) */}
      {!hasPhoto && (
        <button
          className="absolute right-10 flex items-center gap-4 cursor-pointer"
          onClick={capturePhoto}
        >
          <div className="text-[#FCFCFC] text-[14px]">TAKE PICTURE</div>
          <Image src="/takePic.png" alt="camera" width={62} height={62} />
        </button>
      )}

      {/* RETAKE BUTTON (only when captured) */}
      {hasPhoto && (
        <button
          className="absolute bottom-7 right-7 px-4 py-2 flex items-center gap-4 whitespace-nowrap cursor-pointer"
          onClick={async () => {
            if (!photoData) return;

            try {
              // Show temporary loading if needed
              // (you could set a loading state here)

              const response = await fetch(
                "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ image: photoData }),
                }
              );

              const apiResults = await response.json();

              // Save to localStorage for Demographics page
              localStorage.setItem(
                "demographicsResults",
                JSON.stringify(apiResults.data)
              );

              // Optional: small delay for UX
              await new Promise((resolve) => setTimeout(resolve, 500));

              // Navigate to demographics page
              window.location.href = "/analysis";
            } catch (err) {
              console.error("API Error:", err);
            }
          }}
        >
          <div className="text-[13px] font-semibold text-[#FCFCFC]">
            PROCEED
          </div>
          <div className="w-10 h-10 rotate-45 border border-[#FCFCFC] flex items-center justify-center">
            <FontAwesomeIcon
              icon={faPlay}
              className="w-3 h-3 rotate-70 text-[#FCFCFC]"
            />
          </div>
        </button>
      )}

      {/* Hidden canvas (used for capture) */}
      <canvas ref={canvasRef} className="hidden" />

      <div className="fixed bottom-2 w-full px-8">
        {/* Button bottom-left */}
        <Link href="/proceed">
          <button className="absolute bottom-7 left-7 px-4 py-2 flex items-center gap-6 whitespace-nowrap cursor-pointer">
            <div className="w-10 h-10 rotate-45 border border-[#FCFCFC] flex items-center justify-center">
              <FontAwesomeIcon
                icon={faPlay}
                className="rotate-20 text-[#FCFCFC]"
                style={{ width: "0.8rem", height: "0.8rem" }}
              />
            </div>
          </button>
        </Link>

        {/* Centered text block */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-base text-[#FCFCFC] text-center flex flex-col gap-6">
          <div>TO GET BETTER RESULTS MAKE SURE YOU HAVE</div>
          <div className="flex gap-8 justify-center">
            <div>◇ NEUTRAL EXPRESSION</div>
            <div>◇ FRONTAL POSE</div>
            <div>◇ ADEQUATE LIGHTING</div>
          </div>
        </div>
      </div>
    </div>
  );
}
