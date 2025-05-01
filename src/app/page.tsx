"use client";
import { useState, useMemo } from "react";
import ICSE_DATA from "../data/ICSE25.json";
import ISC_DATA from "../data/ISC25.json";
import Logo from "../components/Logo";

// Map data to expected format
function mapStudent(s: any) {
  return {
    name: s["Name"],
    english: s["English Marks"],
    overall: s["Overall Score"],
  };
}

const schemes = {
  ISC: {
    bg: "bg-gradient-to-br from-primary-light to-primary-dark dark:from-[#1a1a1a] dark:to-[#927aa8]",
    accent:
      "bg-primary text-white border-primary-dark dark:bg-[#927aa8] dark:text-white dark:border-[#ae8fc6]",
    border: "border-primary-light dark:border-[#927aa8]",
    highlight: "bg-primary/10 dark:bg-[#ae8fc6]/20",
  },
  ICSE: {
    bg: "bg-gradient-to-br from-literaree-primary to-primary-light dark:from-[#1f8ec2] dark:to-[#c4aed4]",
    accent:
      "bg-literaree-primary text-white border-primary-dark dark:bg-[#1f8ec2] dark:text-white dark:border-[#c4aed4]",
    border: "border-literaree-primary dark:border-[#1f8ec2]",
    highlight: "bg-literaree-primary/10 dark:bg-[#1f8ec2]/20",
  },
};

type Student = { name: string; english: number; overall: number };
type SortKey = keyof Student;
type SortDir = "asc" | "desc";

export default function Home() {
  const [board, setBoard] = useState<"ISC" | "ICSE">("ISC");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const data =
    board === "ISC" ? ISC_DATA.map(mapStudent) : ICSE_DATA.map(mapStudent);
  const scheme = schemes[board];

  const sorted = useMemo(() => {
    const arr = [...data];
    arr.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortDir === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, sortKey, sortDir]);

  // Find the highest overall scorer
  const maxOverall = Math.max(...sorted.map((s) => s.overall));

  return (
    <div
      className={`min-h-screen ${scheme.bg} transition-colors duration-300 flex flex-col`}
    >
      <header className="w-full flex items-center justify-between px-4 sm:px-8 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="hidden sm:inline-block font-inter text-2xl sm:text-3xl text-primary ml-2 tracking-tight font-bold">
            ENGLISH LEARNERS
          </span>
        </div>
        <span className="font-garet text-base sm:text-lg text-primary-dark dark:text-primary-light font-semibold">
          ISC & ICSE 2025 Results
        </span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center w-full px-2 sm:px-0">
        <section className="w-full max-w-3xl mx-auto mt-6 fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6 gap-4">
            <h1 className="font-maharlika text-3xl sm:text-4xl text-primary text-center sm:text-left drop-shadow-lg">
              {board} Results
            </h1>
            <div className="flex gap-2">
              <button
                className={`px-5 py-2 rounded-full font-semibold border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-dark/40 ${
                  board === "ISC" ? scheme.accent : scheme.border
                } font-garet text-base sm:text-lg`}
                onClick={() => setBoard("ISC")}
              >
                ISC
              </button>
              <button
                className={`px-5 py-2 rounded-full font-semibold border shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-literaree-primary/40 ${
                  board === "ICSE" ? scheme.accent : scheme.border
                } font-garet text-base sm:text-lg`}
                onClick={() => setBoard("ICSE")}
              >
                ICSE
              </button>
            </div>
          </div>
          <div className="overflow-x-auto rounded-2xl glass shadow-lg border border-primary/20 dark:border-primary-dark/30 section-transition">
            <table className="min-w-full text-base font-['JetBrains_Mono',monospace]">
              <thead>
                <tr className="bg-primary/10 dark:bg-primary-dark/20">
                  <th
                    className="p-4 text-left cursor-pointer select-none font-semibold text-primary-dark dark:text-primary-light hover:underline"
                    onClick={() => {
                      setSortKey("name");
                      setSortDir(
                        sortKey === "name" && sortDir === "asc" ? "desc" : "asc"
                      );
                    }}
                  >
                    Name {sortKey === "name" && (sortDir === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="p-4 text-left cursor-pointer select-none font-semibold text-primary-dark dark:text-primary-light hover:underline"
                    onClick={() => {
                      setSortKey("english");
                      setSortDir(
                        sortKey === "english" && sortDir === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    English{" "}
                    {sortKey === "english" && (sortDir === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="p-4 text-left cursor-pointer select-none font-semibold text-primary-dark dark:text-primary-light hover:underline"
                    onClick={() => {
                      setSortKey("overall");
                      setSortDir(
                        sortKey === "overall" && sortDir === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }}
                  >
                    Overall %{" "}
                    {sortKey === "overall" && (sortDir === "asc" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <tr
                    key={s.name}
                    className={
                      i < 10 ? `${scheme.highlight} font-bold scale-in` : ""
                    }
                  >
                    <td
                      className="p-4 whitespace-nowrap text-lg"
                      style={
                        s.overall === maxOverall
                          ? {
                              color: "#FFD700",
                              fontWeight: 900,
                              letterSpacing: "0.02em",
                              textShadow: "0 1px 8px #FFD70044",
                            }
                          : undefined
                      }
                    >
                      {s.name}
                    </td>
                    <td className="p-4 text-lg">{s.english}</td>
                    <td className="p-4 text-lg">{s.overall}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
