export interface GlossaryEntry {
  term: string
  definition: string
}

const glossary: Record<string, GlossaryEntry> = {
  DRS: {
    term: "DRS",
    definition:
      "Drag Reduction System — a rear wing flap that opens on certain straights to reduce drag and help the driver overtake the car ahead.",
  },
  DNF: {
    term: "DNF",
    definition:
      "Did Not Finish — the driver had to retire the car before the end of the race due to a mechanical issue, crash, or other problem.",
  },
  Pole: {
    term: "Pole Position",
    definition:
      "The driver who sets the fastest lap in qualifying starts the race from 1st place on the grid — this is called 'pole position'.",
  },
  WDC: {
    term: "WDC",
    definition:
      "World Drivers' Championship — the main title awarded to the driver who scores the most points over the season.",
  },
  WCC: {
    term: "WCC",
    definition:
      "World Constructors' Championship — the team title awarded to the constructor (team) that scores the most points across both its drivers.",
  },
  Points: {
    term: "Points System",
    definition:
      "Only the top 10 finishers score points: 25 for 1st, 18 for 2nd, 15 for 3rd, then 12, 10, 8, 6, 4, 2, and 1 for 10th place. An extra point is awarded for the fastest lap if the driver finishes in the top 10.",
  },
  Gap: {
    term: "Gap",
    definition:
      "The time difference between two drivers. A gap of +5.342s means the driver finished 5.342 seconds behind the car ahead.",
  },
  "Fastest Lap": {
    term: "Fastest Lap",
    definition:
      "The driver who sets the single quickest lap time during the race earns a bonus championship point (provided they finish in the top 10).",
  },
  Constructor: {
    term: "Constructor",
    definition:
      "The team that designs and builds the car's chassis and engine. Examples include Red Bull, Ferrari, and Mercedes. Constructors compete for the WCC title.",
  },
  "Grand Prix": {
    term: "Grand Prix",
    definition:
      "French for 'Grand Prize' — each race weekend is called a Grand Prix. A season has 20+ Grands Prix held in different countries around the world.",
  },
  Understeer: {
    term: "Understeer",
    definition:
      "When the front of the car doesn't turn enough, making the car feel like it wants to go straight instead of following the corner. Beginners feel this as 'the car won't turn'.",
  },
  Oversteer: {
    term: "Oversteer",
    definition:
      "When the rear of the car slides out during a corner. Beginners feel this as 'the back end wants to spin around'.",
  },
  "Pit Stop": {
    term: "Pit Stop",
    definition:
      "When a car comes into the pit lane for new tires and/or repairs. Top teams can change all four tires in under 2.5 seconds.",
  },
  Podium: {
    term: "Podium",
    definition:
      "The top 3 finishers of a race. They stand on a podium for the trophy ceremony. 1st place stands highest in the middle, 2nd to the right, 3rd to the left.",
  },
}

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  const normalizedTerm = term.charAt(0).toUpperCase() + term.slice(1)
  return glossary[term] ?? glossary[normalizedTerm]
}

export function getAllTerms(): GlossaryEntry[] {
  return Object.values(glossary)
}

export const POINTS_SYSTEM_DESCRIPTION =
  "Points are awarded to the top 10 finishers: 25-18-15-12-10-8-6-4-2-1. Plus 1 bonus point for fastest lap if the driver finishes in the top 10."
