"use client";
import Link from "next/link";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

interface DemographicsData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

const mockResults: DemographicsData = {
  race: { black: 0.12, white: 0.13, "east asian": 0.25 },
  age: { "20-29": 0.03, "30-39": 0.15, "40-49": 0.21 },
  gender: { male: 0.52, female: 0.48 },
};

export default function Page() {
  const [results, setResults] = useState<DemographicsData | null>(null);

  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [selectedPercentage, setSelectedPercentage] = useState<number>(0);

  const [confirmedRace, setConfirmedRace] = useState<string | null>(null);
  const [confirmedAge, setConfirmedAge] = useState<string | null>(null);
  const [confirmedGender, setConfirmedGender] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    "race" | "age" | "gender"
  >("race");

  useEffect(() => {
    if (!results) return;

    const sorted = Object.entries(results.race).sort((a, b) => b[1] - a[1]);
    const [firstRace, firstPerc] = sorted[0];

    setTimeout(() => {
      setSelectedRace(firstRace);
      setSelectedPercentage(firstPerc);
      setConfirmedRace(firstRace);
    }, 0);
  }, [results]);

  // New effect: run when user switches category
  useEffect(() => {
    if (!results) return;

    const displayData = results[selectedCategory];
    const sorted = Object.entries(displayData).sort((a, b) => b[1] - a[1]);
    const [topKey, topValue] = sorted[0];

    setTimeout(() => {
      setSelectedRace(topKey);
      setSelectedPercentage(topValue);
    }, 0);
  }, [selectedCategory, results]);

  useEffect(() => {
    const stored = localStorage.getItem("demographicsResults");

    if (stored) {
      // wrap in setTimeout to avoid synchronous setState in useEffect
      setTimeout(() => setResults(JSON.parse(stored)), 0);
    } else if (process.env.NODE_ENV === "development") {
      // use mock data in development if nothing in localStorage
      setTimeout(() => setResults(mockResults), 0);
    }
  }, []);

  if (!results) return <div>Loading...</div>;

  const topValue = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0];

  const dataMap = {
    race: results.race,
    age: results.age,
    gender: results.gender,
  };

  const displayData = dataMap[selectedCategory];
  const topKey = topValue(displayData);
  const topPerc = displayData[topKey];

  return (
    <div>
      <Header variant="noButton" spanText="[ ANALYSIS ]" />

      <div className="absolute top-20 left-9 leading-relaxed">
        <div className="text-[15px] font-semibold mb-1">A.I ANALYSIS</div>
        <div className="text-7xl tracking-tighter">DEMOGRAPHICS</div>
        <div className="text-[14px]">PREDICTED RACE & AGE</div>
      </div>

      <div className="flex items-center justify-between relative p-8">
        {/* LEFT CARDS */}
        <div>
          <div
            className={`absolute border-t border-black w-42 h-[82px] top-[235px] left-8 p-4 cursor-pointer ${
              selectedCategory === "race"
                ? "bg-[#1A1B1C] text-white"
                : "bg-[#E1E1E2] text-black"
            }`}
            onClick={() => setSelectedCategory("race")}
          >
            <div className="text-sm font-semibold pb-2">
              {confirmedRace
                ? confirmedRace.charAt(0).toUpperCase() + confirmedRace.slice(1)
                : ""}
            </div>
            <div className="text-med font-semibold">RACE</div>
          </div>

          <div
            className={`absolute border-t border-black w-42 h-[82px] top-[330px] left-8 p-4 cursor-pointer ${
              selectedCategory === "age"
                ? "bg-[#1A1B1C] text-white"
                : "bg-[#E1E1E2] text-black"
            }`}
            onClick={() => setSelectedCategory("age")}
          >
            <div className="text-sm font-semibold pb-2">
              {confirmedAge ?? topValue(results.age)}
            </div>
            <div className="text-med font-semibold">AGE</div>
          </div>

          <div
            className={`absolute border-t border-black w-42 h-[82px] top-[425px] left-8 p-4 cursor-pointer ${
              selectedCategory === "gender"
                ? "bg-[#1A1B1C] text-white"
                : "bg-[#F3F3F4] text-black"
            }`}
            onClick={() => setSelectedCategory("gender")}
          >
            <div className="text-sm font-semibold pb-2">
              {(confirmedGender ?? topValue(results.gender))
                .charAt(0)
                .toUpperCase() +
                (confirmedGender ?? topValue(results.gender)).slice(1)}
            </div>
            <div className="text-med font-semibold">SEX</div>
          </div>
        </div>

        {/* MIDDLE PANEL */}
        <div className="absolute w-[925px] h-[425px] top-[235px] left-54 opacity-100 bg-[#F3F3F4] flex justify-between border-t border-black">
          <div className="text-[44px] ml-4">
            {selectedRace
              ? selectedRace.charAt(0).toUpperCase() + selectedRace.slice(1)
              : ""}
          </div>
          {selectedRace && (
            <div className="relative w-[450px] h-[450px] flex items-center justify-center">
              <svg className="w-[400px] h-[400px] -rotate-90">
                {/* Background ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="transparent"
                />

                {/* Progress ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  stroke="#000"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 190}
                  strokeDashoffset={
                    2 * Math.PI * 190 * (1 - selectedPercentage)
                  }
                />
              </svg>

              {/* Percentage Text */}
              <div className="absolute text-center text-[44px] font-medium leading-tight">
                {Math.round(selectedPercentage * 100)}%
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL: Full race data */}
        <div className="absolute border-t border-black w-[330px] h-[425px] top-[235px] right-8 opacity-100 bg-[#F3F3F4]">
          <div className="flex justify-between p-4">
            <div className="text-[16px] text-[#1A1B1C] font-medium tracking-tighter">
              {selectedCategory.toUpperCase()}
            </div>
            <div className="text-[16px] text-[#1A1B1C] font-medium tracking-tighter">
              A.I. CONFIDENCE
            </div>
          </div>

          <div className="px-0 -mt-1">
            {Object.entries(displayData)
              .sort((a, b) => b[1] - a[1])
              .map(([key, value]) => {
                const isSelected = selectedRace === key; // highlight current selection

                return (
                  <button
                    key={key}
                    className={`flex justify-between w-full text-left px-3 py-3 
          ${
            isSelected ? "bg-black text-white" : "hover:bg-gray-200 text-black"
          }`}
                    onClick={() => {
                      setSelectedRace(key); // updates middle panel circle
                      setSelectedPercentage(value);
                    }}
                  >
                    <div className="flex items-center gap-2 relative">
                      <span className="text-xl leading-none relative">
                        ◇
                        {isSelected && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px]">
                            •
                          </span>
                        )}
                      </span>
                      <span className="capitalize">{key}</span>
                    </div>
                    <span>{(value * 100).toFixed(0)}%</span>
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-2 left-0 w-full px-8 flex justify-between items-center">
        {/* Left: Back button */}
        <Link href="/analysis">
          <button className="px-4 py-2 flex items-center gap-4 whitespace-nowrap cursor-pointer">
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

        {/* Center: Info text */}
        <div className="text-base text-[#A0A4AB] text-center">
          If A.I. estimate is wrong, select the correct one.
        </div>

        {/* Right: Reset & Confirm buttons */}
        <div className="flex gap-8">
          <button className="w-[73px] h-[35px] border text-[#1A1B1C] font-semibold text-[14px] cursor-pointer">
            RESET
          </button>
          <button
            className="w-[95px] h-[35px] border bg-[#1A1B1C] text-white font-semibold text-[14px] cursor-pointer"
            onClick={() => {
              if (!selectedRace) return;

              if (selectedCategory === "race") setConfirmedRace(selectedRace);
              if (selectedCategory === "age") setConfirmedAge(selectedRace);
              if (selectedCategory === "gender")
                setConfirmedGender(selectedRace);
            }}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
}
