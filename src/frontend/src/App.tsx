import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Search,
  Shield,
  Star,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CountryDetailModal from "./components/CountryDetail";
import IndiaSection from "./components/IndiaSection";
import LeagueBrowser from "./components/LeagueBrowser";
import LiveScores from "./components/LiveScores";
import LoginPage from "./components/LoginPage";
import PlayersSection from "./components/PlayersSection";
import QuizPage from "./components/QuizPage";
import RandomTrivia from "./components/RandomTrivia";
import RecordsPage from "./components/RecordsPage";
import UCLSeasons from "./components/UCLSeasons";
import { allCountries } from "./data/countries";
import { LEGENDS } from "./data/legends";
import { allPlayersExtended } from "./data/players";

// ─── DATA ───────────────────────────────────────────────────────────────────

const WORLD_CUPS = [
  {
    year: 1950,
    host: "Brazil",
    winner: "Uruguay",
    runnerUp: "Brazil",
    score: "2–1",
    goldenBoot: "Ademir (Brazil) – 9 goals",
    flag: "🇧🇷",
    winnerFlag: "🇺🇾",
  },
  {
    year: 1954,
    host: "Switzerland",
    winner: "West Germany",
    runnerUp: "Hungary",
    score: "3–2",
    goldenBoot: "Sándor Kocsis (Hungary) – 11 goals",
    flag: "🇨🇭",
    winnerFlag: "🇩🇪",
  },
  {
    year: 1958,
    host: "Sweden",
    winner: "Brazil",
    runnerUp: "Sweden",
    score: "5–2",
    goldenBoot: "Just Fontaine (France) – 13 goals",
    flag: "🇸🇪",
    winnerFlag: "🇧🇷",
  },
  {
    year: 1962,
    host: "Chile",
    winner: "Brazil",
    runnerUp: "Czechoslovakia",
    score: "3–1",
    goldenBoot: "Garrincha / Vavá / Leonel Sánchez – 4 goals",
    flag: "🇨🇱",
    winnerFlag: "🇧🇷",
  },
  {
    year: 1966,
    host: "England",
    winner: "England",
    runnerUp: "West Germany",
    score: "4–2 (AET)",
    goldenBoot: "Eusébio (Portugal) – 9 goals",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    winnerFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  },
  {
    year: 1970,
    host: "Mexico",
    winner: "Brazil",
    runnerUp: "Italy",
    score: "4–1",
    goldenBoot: "Gerd Müller (W.Germany) – 10 goals",
    flag: "🇲🇽",
    winnerFlag: "🇧🇷",
  },
  {
    year: 1974,
    host: "West Germany",
    winner: "West Germany",
    runnerUp: "Netherlands",
    score: "2–1",
    goldenBoot: "Grzegorz Lato (Poland) – 7 goals",
    flag: "🇩🇪",
    winnerFlag: "🇩🇪",
  },
  {
    year: 1978,
    host: "Argentina",
    winner: "Argentina",
    runnerUp: "Netherlands",
    score: "3–1 (AET)",
    goldenBoot: "Mario Kempes (Argentina) – 6 goals",
    flag: "🇦🇷",
    winnerFlag: "🇦🇷",
  },
  {
    year: 1982,
    host: "Spain",
    winner: "Italy",
    runnerUp: "West Germany",
    score: "3–1",
    goldenBoot: "Paolo Rossi (Italy) – 6 goals",
    flag: "🇪🇸",
    winnerFlag: "🇮🇹",
  },
  {
    year: 1986,
    host: "Mexico",
    winner: "Argentina",
    runnerUp: "West Germany",
    score: "3–2",
    goldenBoot: "Gary Lineker (England) – 6 goals",
    flag: "🇲🇽",
    winnerFlag: "🇦🇷",
  },
  {
    year: 1990,
    host: "Italy",
    winner: "West Germany",
    runnerUp: "Argentina",
    score: "1–0",
    goldenBoot: "Salvatore Schillaci (Italy) – 6 goals",
    flag: "🇮🇹",
    winnerFlag: "🇩🇪",
  },
  {
    year: 1994,
    host: "USA",
    winner: "Brazil",
    runnerUp: "Italy",
    score: "0–0 (3–2 pens)",
    goldenBoot: "Hristo Stoichkov / Oleg Salenko – 6 goals",
    flag: "🇺🇸",
    winnerFlag: "🇧🇷",
  },
  {
    year: 1998,
    host: "France",
    winner: "France",
    runnerUp: "Brazil",
    score: "3–0",
    goldenBoot: "Davor Šuker (Croatia) – 6 goals",
    flag: "🇫🇷",
    winnerFlag: "🇫🇷",
  },
  {
    year: 2002,
    host: "South Korea/Japan",
    winner: "Brazil",
    runnerUp: "Germany",
    score: "2–0",
    goldenBoot: "Ronaldo (Brazil) – 8 goals",
    flag: "🇰🇷🇯🇵",
    winnerFlag: "🇧🇷",
  },
  {
    year: 2006,
    host: "Germany",
    winner: "Italy",
    runnerUp: "France",
    score: "1–1 (5–3 pens)",
    goldenBoot: "Miroslav Klose (Germany) – 5 goals",
    flag: "🇩🇪",
    winnerFlag: "🇮🇹",
  },
  {
    year: 2010,
    host: "South Africa",
    winner: "Spain",
    runnerUp: "Netherlands",
    score: "1–0 (AET)",
    goldenBoot: "Thomas Müller / 5 others – 5 goals",
    flag: "🇿🇦",
    winnerFlag: "🇪🇸",
  },
  {
    year: 2014,
    host: "Brazil",
    winner: "Germany",
    runnerUp: "Argentina",
    score: "1–0 (AET)",
    goldenBoot: "James Rodríguez (Colombia) – 6 goals",
    flag: "🇧🇷",
    winnerFlag: "🇩🇪",
  },
  {
    year: 2018,
    host: "Russia",
    winner: "France",
    runnerUp: "Croatia",
    score: "4–2",
    goldenBoot: "Harry Kane (England) – 6 goals",
    flag: "🇷🇺",
    winnerFlag: "🇫🇷",
  },
  {
    year: 2022,
    host: "Qatar",
    winner: "Argentina",
    runnerUp: "France",
    score: "3–3 (4–2 pens)",
    goldenBoot: "Kylian Mbappé (France) – 8 goals",
    flag: "🇶🇦",
    winnerFlag: "🇦🇷",
  },
  {
    year: 2026,
    host: "USA / Canada / Mexico",
    winner: "TBD",
    runnerUp: "TBD",
    score: "Upcoming",
    goldenBoot: "TBD",
    flag: "🇺🇸🇨🇦🇲🇽",
    winnerFlag: "🏆",
  },
];

// biome-ignore lint/correctness/noUnusedVariables: legacy data kept for reference
const UCL_FINALS = [
  {
    year: 1956,
    winner: "Real Madrid",
    runnerUp: "Stade de Reims",
    score: "4–3",
    venue: "Paris",
  },
  {
    year: 1957,
    winner: "Real Madrid",
    runnerUp: "Fiorentina",
    score: "2–0",
    venue: "Madrid",
  },
  {
    year: 1958,
    winner: "Real Madrid",
    runnerUp: "AC Milan",
    score: "3–2 (AET)",
    venue: "Brussels",
  },
  {
    year: 1960,
    winner: "Real Madrid",
    runnerUp: "Eintracht Frankfurt",
    score: "7–3",
    venue: "Glasgow",
  },
  {
    year: 1964,
    winner: "Inter Milan",
    runnerUp: "Real Madrid",
    score: "3–1",
    venue: "Vienna",
  },
  {
    year: 1965,
    winner: "Inter Milan",
    runnerUp: "Benfica",
    score: "1–0",
    venue: "Milan",
  },
  {
    year: 1966,
    winner: "Real Madrid",
    runnerUp: "Partizan",
    score: "2–1",
    venue: "Brussels",
  },
  {
    year: 1971,
    winner: "Ajax",
    runnerUp: "Panathinaikos",
    score: "2–0",
    venue: "London",
  },
  {
    year: 1972,
    winner: "Ajax",
    runnerUp: "Inter Milan",
    score: "2–0",
    venue: "Rotterdam",
  },
  {
    year: 1973,
    winner: "Ajax",
    runnerUp: "Juventus",
    score: "1–0",
    venue: "Belgrade",
  },
  {
    year: 1975,
    winner: "Bayern Munich",
    runnerUp: "Leeds United",
    score: "2–0",
    venue: "Paris",
  },
  {
    year: 1976,
    winner: "Bayern Munich",
    runnerUp: "Saint-Étienne",
    score: "1–0",
    venue: "Glasgow",
  },
  {
    year: 1977,
    winner: "Liverpool",
    runnerUp: "Borussia Mönchengladbach",
    score: "3–1",
    venue: "Rome",
  },
  {
    year: 1978,
    winner: "Liverpool",
    runnerUp: "Club Brugge",
    score: "1–0",
    venue: "London",
  },
  {
    year: 1981,
    winner: "Liverpool",
    runnerUp: "Real Madrid",
    score: "1–0",
    venue: "Paris",
  },
  {
    year: 1984,
    winner: "Liverpool",
    runnerUp: "AS Roma",
    score: "1–1 (4–2 pens)",
    venue: "Rome",
  },
  {
    year: 1985,
    winner: "Juventus",
    runnerUp: "Liverpool",
    score: "1–0",
    venue: "Brussels",
  },
  {
    year: 1986,
    winner: "Steaua București",
    runnerUp: "Barcelona",
    score: "0–0 (2–0 pens)",
    venue: "Seville",
  },
  {
    year: 1988,
    winner: "PSV Eindhoven",
    runnerUp: "Benfica",
    score: "0–0 (6–5 pens)",
    venue: "Stuttgart",
  },
  {
    year: 1989,
    winner: "AC Milan",
    runnerUp: "Steaua București",
    score: "4–0",
    venue: "Barcelona",
  },
  {
    year: 1990,
    winner: "AC Milan",
    runnerUp: "Benfica",
    score: "1–0",
    venue: "Vienna",
  },
  {
    year: 1992,
    winner: "Barcelona",
    runnerUp: "Sampdoria",
    score: "1–0 (AET)",
    venue: "London",
  },
  {
    year: 1993,
    winner: "Marseille",
    runnerUp: "AC Milan",
    score: "1–0",
    venue: "Munich",
  },
  {
    year: 1994,
    winner: "AC Milan",
    runnerUp: "Barcelona",
    score: "4–0",
    venue: "Athens",
  },
  {
    year: 1995,
    winner: "Ajax",
    runnerUp: "AC Milan",
    score: "1–0",
    venue: "Vienna",
  },
  {
    year: 1997,
    winner: "Borussia Dortmund",
    runnerUp: "Juventus",
    score: "3–1",
    venue: "Munich",
  },
  {
    year: 1998,
    winner: "Real Madrid",
    runnerUp: "Juventus",
    score: "1–0",
    venue: "Amsterdam",
  },
  {
    year: 1999,
    winner: "Manchester United",
    runnerUp: "Bayern Munich",
    score: "2–1",
    venue: "Barcelona",
  },
  {
    year: 2000,
    winner: "Real Madrid",
    runnerUp: "Valencia",
    score: "3–0",
    venue: "Paris",
  },
  {
    year: 2001,
    winner: "Bayern Munich",
    runnerUp: "Valencia",
    score: "1–1 (5–4 pens)",
    venue: "Milan",
  },
  {
    year: 2002,
    winner: "Real Madrid",
    runnerUp: "Bayer Leverkusen",
    score: "2–1",
    venue: "Glasgow",
  },
  {
    year: 2003,
    winner: "AC Milan",
    runnerUp: "Juventus",
    score: "0–0 (3–2 pens)",
    venue: "Manchester",
  },
  {
    year: 2004,
    winner: "Porto",
    runnerUp: "Monaco",
    score: "3–0",
    venue: "Gelsenkirchen",
  },
  {
    year: 2005,
    winner: "Liverpool",
    runnerUp: "AC Milan",
    score: "3–3 (3–2 pens)",
    venue: "Istanbul",
  },
  {
    year: 2006,
    winner: "Barcelona",
    runnerUp: "Arsenal",
    score: "2–1",
    venue: "Paris",
  },
  {
    year: 2007,
    winner: "AC Milan",
    runnerUp: "Liverpool",
    score: "2–1",
    venue: "Athens",
  },
  {
    year: 2008,
    winner: "Manchester United",
    runnerUp: "Chelsea",
    score: "1–1 (6–5 pens)",
    venue: "Moscow",
  },
  {
    year: 2009,
    winner: "Barcelona",
    runnerUp: "Manchester United",
    score: "2–0",
    venue: "Rome",
  },
  {
    year: 2010,
    winner: "Inter Milan",
    runnerUp: "Bayern Munich",
    score: "2–0",
    venue: "Madrid",
  },
  {
    year: 2011,
    winner: "Barcelona",
    runnerUp: "Manchester United",
    score: "3–1",
    venue: "London",
  },
  {
    year: 2012,
    winner: "Chelsea",
    runnerUp: "Bayern Munich",
    score: "1–1 (4–3 pens)",
    venue: "Munich",
  },
  {
    year: 2013,
    winner: "Bayern Munich",
    runnerUp: "Borussia Dortmund",
    score: "2–1",
    venue: "London",
  },
  {
    year: 2014,
    winner: "Real Madrid",
    runnerUp: "Atlético Madrid",
    score: "4–1 (AET)",
    venue: "Lisbon",
  },
  {
    year: 2015,
    winner: "Barcelona",
    runnerUp: "Juventus",
    score: "3–1",
    venue: "Berlin",
  },
  {
    year: 2016,
    winner: "Real Madrid",
    runnerUp: "Atlético Madrid",
    score: "1–1 (5–3 pens)",
    venue: "Milan",
  },
  {
    year: 2017,
    winner: "Real Madrid",
    runnerUp: "Juventus",
    score: "4–1",
    venue: "Cardiff",
  },
  {
    year: 2018,
    winner: "Real Madrid",
    runnerUp: "Liverpool",
    score: "3–1",
    venue: "Kyiv",
  },
  {
    year: 2019,
    winner: "Liverpool",
    runnerUp: "Tottenham",
    score: "2–0",
    venue: "Madrid",
  },
  {
    year: 2020,
    winner: "Bayern Munich",
    runnerUp: "Paris Saint-Germain",
    score: "1–0",
    venue: "Lisbon",
  },
  {
    year: 2021,
    winner: "Chelsea",
    runnerUp: "Manchester City",
    score: "1–0",
    venue: "Porto",
  },
  {
    year: 2022,
    winner: "Real Madrid",
    runnerUp: "Liverpool",
    score: "1–0",
    venue: "Paris",
  },
  {
    year: 2023,
    winner: "Manchester City",
    runnerUp: "Inter Milan",
    score: "1–0",
    venue: "Istanbul",
  },
  {
    year: 2024,
    winner: "Real Madrid",
    runnerUp: "Borussia Dortmund",
    score: "2–0",
    venue: "London",
  },
];

// biome-ignore lint/correctness/noUnusedVariables: legacy data kept for reference
const WORLD_PLAYERS = [
  // UEFA – Europe
  {
    name: "Cristiano Ronaldo",
    flag: "🇵🇹",
    country: "Portugal",
    position: "FWD",
    era: "2001–present",
    clubs: "Sporting, Man Utd, Real Madrid, Juventus, Al Nassr",
    goals: 900,
    caps: 212,
    confederation: "UEFA",
  },
  {
    name: "Zlatan Ibrahimović",
    flag: "🇸🇪",
    country: "Sweden",
    position: "FWD",
    era: "1999–2023",
    clubs: "Ajax, Juventus, Inter, Barcelona, PSG, AC Milan, Man Utd",
    goals: 570,
    caps: 116,
    confederation: "UEFA",
  },
  {
    name: "Robert Lewandowski",
    flag: "🇵🇱",
    country: "Poland",
    position: "FWD",
    era: "2005–present",
    clubs: "Dortmund, Bayern Munich, Barcelona",
    goals: 634,
    caps: 151,
    confederation: "UEFA",
  },
  {
    name: "Luka Modrić",
    flag: "🇭🇷",
    country: "Croatia",
    position: "MID",
    era: "2003–present",
    clubs: "Dinamo Zagreb, Tottenham, Real Madrid",
    goals: 60,
    caps: 175,
    confederation: "UEFA",
  },
  {
    name: "Kevin De Bruyne",
    flag: "🇧🇪",
    country: "Belgium",
    position: "MID",
    era: "2008–present",
    clubs: "Chelsea, Wolfsburg, Manchester City",
    goals: 110,
    caps: 106,
    confederation: "UEFA",
  },
  {
    name: "Erling Haaland",
    flag: "🇳🇴",
    country: "Norway",
    position: "FWD",
    era: "2016–present",
    clubs: "Molde, Salzburg, Dortmund, Man City",
    goals: 350,
    caps: 30,
    confederation: "UEFA",
  },
  {
    name: "Kylian Mbappé",
    flag: "🇫🇷",
    country: "France",
    position: "FWD",
    era: "2015–present",
    clubs: "Monaco, PSG, Real Madrid",
    goals: 380,
    caps: 88,
    confederation: "UEFA",
  },
  {
    name: "Mohamed Salah",
    flag: "🇪🇬",
    country: "Egypt",
    position: "FWD",
    era: "2010–present",
    clubs: "Chelsea, Fiorentina, Roma, Liverpool",
    goals: 370,
    caps: 95,
    confederation: "CAF",
  },
  {
    name: "Virgil van Dijk",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "DEF",
    era: "2010–present",
    clubs: "Groningen, Celtic, Southampton, Liverpool",
    goals: 50,
    caps: 65,
    confederation: "UEFA",
  },
  {
    name: "Zinedine Zidane",
    flag: "🇫🇷",
    country: "France",
    position: "MID",
    era: "1988–2006",
    clubs: "Bordeaux, Juventus, Real Madrid",
    goals: 125,
    caps: 108,
    confederation: "UEFA",
  },
  {
    name: "David Beckham",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    country: "England",
    position: "MID",
    era: "1992–2013",
    clubs: "Man Utd, Real Madrid, LA Galaxy, PSG, Milan",
    goals: 162,
    caps: 115,
    confederation: "UEFA",
  },
  {
    name: "Wayne Rooney",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    country: "England",
    position: "FWD",
    era: "2002–2019",
    clubs: "Everton, Man Utd, DC United",
    goals: 253,
    caps: 120,
    confederation: "UEFA",
  },
  {
    name: "Steven Gerrard",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    country: "England",
    position: "MID",
    era: "1998–2016",
    clubs: "Liverpool, LA Galaxy",
    goals: 186,
    caps: 114,
    confederation: "UEFA",
  },
  {
    name: "Thierry Henry",
    flag: "🇫🇷",
    country: "France",
    position: "FWD",
    era: "1994–2012",
    clubs: "Monaco, Juventus, Arsenal, Barcelona",
    goals: 411,
    caps: 123,
    confederation: "UEFA",
  },
  {
    name: "Patrick Vieira",
    flag: "🇫🇷",
    country: "France",
    position: "MID",
    era: "1993–2011",
    clubs: "Cannes, AC Milan, Arsenal, Juventus, Inter, Man City",
    goals: 63,
    caps: 107,
    confederation: "UEFA",
  },
  {
    name: "Dennis Bergkamp",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "FWD",
    era: "1986–2006",
    clubs: "Ajax, Inter Milan, Arsenal",
    goals: 302,
    caps: 79,
    confederation: "UEFA",
  },
  {
    name: "Ruud Gullit",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "MID",
    era: "1979–1998",
    clubs: "Feyenoord, PSV, AC Milan, Sampdoria, Chelsea",
    goals: 219,
    caps: 66,
    confederation: "UEFA",
  },
  {
    name: "Marco van Basten",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "FWD",
    era: "1981–1995",
    clubs: "Ajax, AC Milan",
    goals: 301,
    caps: 58,
    confederation: "UEFA",
  },
  {
    name: "Clarence Seedorf",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "MID",
    era: "1992–2014",
    clubs: "Ajax, Sampdoria, Real Madrid, Inter, AC Milan",
    goals: 170,
    caps: 87,
    confederation: "UEFA",
  },
  {
    name: "Wesley Sneijder",
    flag: "🇳🇱",
    country: "Netherlands",
    position: "MID",
    era: "2002–2019",
    clubs: "Ajax, Real Madrid, Inter, Galatasaray",
    goals: 136,
    caps: 134,
    confederation: "UEFA",
  },
  {
    name: "Andrea Pirlo",
    flag: "🇮🇹",
    country: "Italy",
    position: "MID",
    era: "1995–2017",
    clubs: "Brescia, Inter, AC Milan, Juventus, New York City",
    goals: 102,
    caps: 116,
    confederation: "UEFA",
  },
  {
    name: "Francesco Totti",
    flag: "🇮🇹",
    country: "Italy",
    position: "FWD",
    era: "1992–2017",
    clubs: ["AS Roma"].join(""),
    goals: 307,
    caps: 58,
    confederation: "UEFA",
  },
  {
    name: "Alessandro Del Piero",
    flag: "🇮🇹",
    country: "Italy",
    position: "FWD",
    era: "1991–2014",
    clubs: "Juventus, Sydney FC, Delhi Dynamos",
    goals: 316,
    caps: 91,
    confederation: "UEFA",
  },
  {
    name: "Fabio Cannavaro",
    flag: "🇮🇹",
    country: "Italy",
    position: "DEF",
    era: "1993–2011",
    clubs: "Napoli, Parma, Inter, Juventus, Real Madrid",
    goals: 19,
    caps: 136,
    confederation: "UEFA",
  },
  {
    name: "Gianluigi Buffon",
    flag: "🇮🇹",
    country: "Italy",
    position: "GK",
    era: "1995–2023",
    clubs: "Parma, Juventus, PSG",
    goals: 0,
    caps: 176,
    confederation: "UEFA",
  },
  {
    name: "Iker Casillas",
    flag: "🇪🇸",
    country: "Spain",
    position: "GK",
    era: "1999–2020",
    clubs: "Real Madrid, Porto",
    goals: 0,
    caps: 167,
    confederation: "UEFA",
  },
  {
    name: "Manuel Neuer",
    flag: "🇩🇪",
    country: "Germany",
    position: "GK",
    era: "2005–present",
    clubs: "Schalke, Bayern Munich",
    goals: 0,
    caps: 124,
    confederation: "UEFA",
  },
  {
    name: "Thomas Müller",
    flag: "🇩🇪",
    country: "Germany",
    position: "MID",
    era: "2007–present",
    clubs: "Bayern Munich",
    goals: 232,
    caps: 130,
    confederation: "UEFA",
  },
  {
    name: "Miroslav Klose",
    flag: "🇩🇪",
    country: "Germany",
    position: "FWD",
    era: "1999–2016",
    clubs: "Kaiserslautern, Werder Bremen, Bayern, Lazio",
    goals: 276,
    caps: 137,
    confederation: "UEFA",
  },
  {
    name: "Philipp Lahm",
    flag: "🇩🇪",
    country: "Germany",
    position: "DEF",
    era: "2002–2017",
    clubs: "Bayern Munich, Stuttgart (loan)",
    goals: 37,
    caps: 113,
    confederation: "UEFA",
  },
  {
    name: "Bastian Schweinsteiger",
    flag: "🇩🇪",
    country: "Germany",
    position: "MID",
    era: "2002–2019",
    clubs: "Bayern Munich, Man Utd, Chicago Fire",
    goals: 68,
    caps: 121,
    confederation: "UEFA",
  },
  {
    name: "Paul Scholes",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    country: "England",
    position: "MID",
    era: "1993–2013",
    clubs: "Manchester United",
    goals: 155,
    caps: 66,
    confederation: "UEFA",
  },
  {
    name: "Ryan Giggs",
    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    country: "Wales",
    position: "MID",
    era: "1990–2014",
    clubs: "Manchester United",
    goals: 168,
    caps: 64,
    confederation: "UEFA",
  },
  {
    name: "Eric Cantona",
    flag: "🇫🇷",
    country: "France",
    position: "FWD",
    era: "1983–1997",
    clubs: "Various French clubs, Leeds United, Man Utd",
    goals: 185,
    caps: 45,
    confederation: "UEFA",
  },
  {
    name: "Luis Figo",
    flag: "🇵🇹",
    country: "Portugal",
    position: "MID",
    era: "1989–2009",
    clubs: "Sporting CP, Barcelona, Real Madrid, Inter",
    goals: 167,
    caps: 127,
    confederation: "UEFA",
  },
  {
    name: "Eusébio",
    flag: "🇵🇹",
    country: "Portugal",
    position: "FWD",
    era: "1957–1979",
    clubs: "Benfica, New England Tea Men",
    goals: 733,
    caps: 64,
    confederation: "UEFA",
  },
  {
    name: "Didier Deschamps",
    flag: "🇫🇷",
    country: "France",
    position: "MID",
    era: "1985–2001",
    clubs: "Marseille, Juventus, Chelsea, Valencia",
    goals: 29,
    caps: 103,
    confederation: "UEFA",
  },
  {
    name: "Cesc Fàbregas",
    flag: "🇪🇸",
    country: "Spain",
    position: "MID",
    era: "2003–2022",
    clubs: "Arsenal, Barcelona, Chelsea, Monaco",
    goals: 115,
    caps: 110,
    confederation: "UEFA",
  },
  {
    name: "Sergio Ramos",
    flag: "🇪🇸",
    country: "Spain",
    position: "DEF",
    era: "2003–present",
    clubs: "Sevilla, Real Madrid, PSG",
    goals: 132,
    caps: 180,
    confederation: "UEFA",
  },
  {
    name: "Gerard Piqué",
    flag: "🇪🇸",
    country: "Spain",
    position: "DEF",
    era: "2004–2022",
    clubs: "Man Utd, Zaragoza (loan), Barcelona",
    goals: 61,
    caps: 102,
    confederation: "UEFA",
  },
  // CONMEBOL – South America
  {
    name: "Lionel Messi",
    flag: "🇦🇷",
    country: "Argentina",
    position: "FWD",
    era: "2003–present",
    clubs: "Barcelona, PSG, Inter Miami",
    goals: 850,
    caps: 191,
    confederation: "CONMEBOL",
  },
  {
    name: "Neymar Jr.",
    flag: "🇧🇷",
    country: "Brazil",
    position: "FWD",
    era: "2009–present",
    clubs: "Santos, Barcelona, PSG, Al-Hilal",
    goals: 440,
    caps: 128,
    confederation: "CONMEBOL",
  },
  {
    name: "Ronaldinho",
    flag: "🇧🇷",
    country: "Brazil",
    position: "MID",
    era: "1998–2015",
    clubs: "Grêmio, PSG, Barcelona, AC Milan, Flamengo",
    goals: 280,
    caps: 97,
    confederation: "CONMEBOL",
  },
  {
    name: "Pelé",
    flag: "🇧🇷",
    country: "Brazil",
    position: "FWD",
    era: "1956–1977",
    clubs: "Santos, New York Cosmos",
    goals: 767,
    caps: 92,
    confederation: "CONMEBOL",
  },
  {
    name: "Diego Maradona",
    flag: "🇦🇷",
    country: "Argentina",
    position: "MID",
    era: "1976–1997",
    clubs: "Boca Juniors, Barcelona, Napoli, Seville",
    goals: 345,
    caps: 91,
    confederation: "CONMEBOL",
  },
  {
    name: "Alfredo Di Stéfano",
    flag: "🇦🇷",
    country: "Argentina/Spain",
    position: "FWD",
    era: "1945–1966",
    clubs: "River Plate, Real Madrid, Espanyol",
    goals: 512,
    caps: 31,
    confederation: "CONMEBOL",
  },
  {
    name: "Garrincha",
    flag: "🇧🇷",
    country: "Brazil",
    position: "FWD",
    era: "1953–1972",
    clubs: "Botafogo, Corinthians",
    goals: 249,
    caps: 60,
    confederation: "CONMEBOL",
  },
  {
    name: "Zico",
    flag: "🇧🇷",
    country: "Brazil",
    position: "MID",
    era: "1971–1994",
    clubs: "Flamengo, Udinese, Kashima Antlers",
    goals: 508,
    caps: 88,
    confederation: "CONMEBOL",
  },
  {
    name: "Sócrates",
    flag: "🇧🇷",
    country: "Brazil",
    position: "MID",
    era: "1974–1989",
    clubs: "Corinthians, Fiorentina",
    goals: 230,
    caps: 60,
    confederation: "CONMEBOL",
  },
  {
    name: "Romário",
    flag: "🇧🇷",
    country: "Brazil",
    position: "FWD",
    era: "1985–2008",
    clubs: "PSV, Barcelona, Fluminense",
    goals: 772,
    caps: 70,
    confederation: "CONMEBOL",
  },
  {
    name: "Ronaldo R9",
    flag: "🇧🇷",
    country: "Brazil",
    position: "FWD",
    era: "1993–2011",
    clubs: "Cruzeiro, PSV, Barcelona, Inter, Real Madrid",
    goals: 414,
    caps: 98,
    confederation: "CONMEBOL",
  },
  {
    name: "Carlos Tevez",
    flag: "🇦🇷",
    country: "Argentina",
    position: "FWD",
    era: "2001–2019",
    clubs: "Boca Juniors, West Ham, Man Utd, Man City, Juventus",
    goals: 325,
    caps: 76,
    confederation: "CONMEBOL",
  },
  {
    name: "Sergio Agüero",
    flag: "🇦🇷",
    country: "Argentina",
    position: "FWD",
    era: "2003–2021",
    clubs: "Independiente, Atlético Madrid, Man City, Barcelona",
    goals: 431,
    caps: 101,
    confederation: "CONMEBOL",
  },
  {
    name: "Ángel Di María",
    flag: "🇦🇷",
    country: "Argentina",
    position: "MID",
    era: "2005–present",
    clubs: "Rosario Central, Benfica, Real Madrid, PSG, Juventus, Fiorentina",
    goals: 185,
    caps: 145,
    confederation: "CONMEBOL",
  },
  {
    name: "Lautaro Martínez",
    flag: "🇦🇷",
    country: "Argentina",
    position: "FWD",
    era: "2015–present",
    clubs: "Racing Club, Inter Milan",
    goals: 200,
    caps: 65,
    confederation: "CONMEBOL",
  },
  {
    name: "Cafu",
    flag: "🇧🇷",
    country: "Brazil",
    position: "DEF",
    era: "1989–2008",
    clubs: "São Paulo, Roma, AC Milan",
    goals: 22,
    caps: 142,
    confederation: "CONMEBOL",
  },
  {
    name: "Roberto Carlos",
    flag: "🇧🇷",
    country: "Brazil",
    position: "DEF",
    era: "1991–2012",
    clubs: "Palmeiras, Inter, Real Madrid, Fenerbahçe",
    goals: 117,
    caps: 125,
    confederation: "CONMEBOL",
  },
  {
    name: "Thiago Silva",
    flag: "🇧🇷",
    country: "Brazil",
    position: "DEF",
    era: "2001–present",
    clubs: "AC Milan, PSG, Chelsea, Fluminense",
    goals: 20,
    caps: 108,
    confederation: "CONMEBOL",
  },
  {
    name: "Dani Alves",
    flag: "🇧🇷",
    country: "Brazil",
    position: "DEF",
    era: "2001–2023",
    clubs: "Sevilla, Barcelona, Juventus, PSG, Man City",
    goals: 120,
    caps: 126,
    confederation: "CONMEBOL",
  },
  {
    name: "Falcao García",
    flag: "🇨🇴",
    country: "Colombia",
    position: "FWD",
    era: "2005–2022",
    clubs: "Porto, Atlético Madrid, Monaco, Man Utd",
    goals: 440,
    caps: 99,
    confederation: "CONMEBOL",
  },
  {
    name: "Carlos Valderrama",
    flag: "🇨🇴",
    country: "Colombia",
    position: "MID",
    era: "1981–2004",
    clubs: "Montpellier, Real Valladolid, Tampa Bay Mutiny",
    goals: 11,
    caps: 111,
    confederation: "CONMEBOL",
  },
  {
    name: "Alexis Sánchez",
    flag: "🇨🇱",
    country: "Chile",
    position: "FWD",
    era: "2005–present",
    clubs: "Barcelona, Arsenal, Inter Milan, Man Utd",
    goals: 290,
    caps: 161,
    confederation: "CONMEBOL",
  },
  {
    name: "Arturo Vidal",
    flag: "🇨🇱",
    country: "Chile",
    position: "MID",
    era: "2005–present",
    clubs: "Juventus, Bayern Munich, Barcelona, Inter Milan",
    goals: 160,
    caps: 147,
    confederation: "CONMEBOL",
  },
  // CAF – Africa
  {
    name: "Sadio Mané",
    flag: "🇸🇳",
    country: "Senegal",
    position: "FWD",
    era: "2011–present",
    clubs: "Metz, Southampton, Liverpool, Bayern Munich, Al Nassr",
    goals: 300,
    caps: 108,
    confederation: "CAF",
  },
  {
    name: "Didier Drogba",
    flag: "🇨🇮",
    country: "Ivory Coast",
    position: "FWD",
    era: "1998–2018",
    clubs: "Le Mans, Guingamp, Marseille, Chelsea",
    goals: 360,
    caps: 105,
    confederation: "CAF",
  },
  {
    name: "Samuel Eto'o",
    flag: "🇨🇲",
    country: "Cameroon",
    position: "FWD",
    era: "1996–2019",
    clubs: "Barcelona, Inter Milan, Chelsea, Anzhi",
    goals: 476,
    caps: 118,
    confederation: "CAF",
  },
  {
    name: "George Weah",
    flag: "🇱🇷",
    country: "Liberia",
    position: "FWD",
    era: "1985–2003",
    clubs: "Monaco, PSG, AC Milan, Chelsea",
    goals: 239,
    caps: 75,
    confederation: "CAF",
  },
  {
    name: "Abedi Pelé",
    flag: "🇬🇭",
    country: "Ghana",
    position: "MID",
    era: "1982–1998",
    clubs: "Marseille, Lyon, Torino",
    goals: 113,
    caps: 73,
    confederation: "CAF",
  },
  {
    name: "Jay-Jay Okocha",
    flag: "🇳🇬",
    country: "Nigeria",
    position: "MID",
    era: "1990–2009",
    clubs: "Frankfurt, Fenerbahçe, PSG, Bolton, Hull",
    goals: 123,
    caps: 73,
    confederation: "CAF",
  },
  {
    name: "Yaya Touré",
    flag: "🇨🇮",
    country: "Ivory Coast",
    position: "MID",
    era: "2001–2019",
    clubs: "Monaco, Barcelona, Manchester City",
    goals: 228,
    caps: 101,
    confederation: "CAF",
  },
  {
    name: "Nwankwo Kanu",
    flag: "🇳🇬",
    country: "Nigeria",
    position: "FWD",
    era: "1991–2012",
    clubs: "Ajax, Inter, Arsenal, West Brom",
    goals: 198,
    caps: 86,
    confederation: "CAF",
  },
  {
    name: "Pierre-Emerick Aubameyang",
    flag: "🇬🇦",
    country: "Gabon",
    position: "FWD",
    era: "2008–present",
    clubs: "Dortmund, Arsenal, Barcelona, Chelsea, Marseille",
    goals: 350,
    caps: 82,
    confederation: "CAF",
  },
  {
    name: "Riyad Mahrez",
    flag: "🇩🇿",
    country: "Algeria",
    position: "MID",
    era: "2009–present",
    clubs: "Leicester City, Manchester City, Al-Ahli",
    goals: 210,
    caps: 92,
    confederation: "CAF",
  },
  {
    name: "Hakim Ziyech",
    flag: "🇲🇦",
    country: "Morocco",
    position: "MID",
    era: "2012–present",
    clubs: "Ajax, Chelsea, Galatasaray, PSG",
    goals: 135,
    caps: 67,
    confederation: "CAF",
  },
  {
    name: "Roger Milla",
    flag: "🇨🇲",
    country: "Cameroon",
    position: "FWD",
    era: "1970–1994",
    clubs: "Montpellier, Bastia, Saint-Étienne, Valenciennes",
    goals: 228,
    caps: 102,
    confederation: "CAF",
  },
  {
    name: "El-Hadji Diouf",
    flag: "🇸🇳",
    country: "Senegal",
    position: "FWD",
    era: "1999–2014",
    clubs: "Lens, Liverpool, Bolton, Sunderland",
    goals: 108,
    caps: 68,
    confederation: "CAF",
  },
  {
    name: "Achraf Hakimi",
    flag: "🇲🇦",
    country: "Morocco",
    position: "DEF",
    era: "2016–present",
    clubs: "Real Madrid, Dortmund (loan), Inter, PSG",
    goals: 70,
    caps: 76,
    confederation: "CAF",
  },
  {
    name: "Kalidou Koulibaly",
    flag: "🇸🇳",
    country: "Senegal",
    position: "DEF",
    era: "2009–present",
    clubs: "Metz, Napoli, Chelsea, Al Hilal",
    goals: 18,
    caps: 67,
    confederation: "CAF",
  },
  // AFC – Asia
  {
    name: "Son Heung-min",
    flag: "🇰🇷",
    country: "South Korea",
    position: "FWD",
    era: "2010–present",
    clubs: "Hamburg, Bayer Leverkusen, Tottenham",
    goals: 230,
    caps: 120,
    confederation: "AFC",
  },
  {
    name: "Hidetoshi Nakata",
    flag: "🇯🇵",
    country: "Japan",
    position: "MID",
    era: "1994–2006",
    clubs: "Perugia, Roma, Parma, Fiorentina, Bolton",
    goals: 68,
    caps: 77,
    confederation: "AFC",
  },
  {
    name: "Ali Daei",
    flag: "🇮🇷",
    country: "Iran",
    position: "FWD",
    era: "1988–2007",
    clubs: "Homayoun, Bayern Munich, Hertha BSC, Arminia Bielefeld",
    goals: 109,
    caps: 149,
    confederation: "AFC",
  },
  {
    name: "Park Ji-sung",
    flag: "🇰🇷",
    country: "South Korea",
    position: "MID",
    era: "1998–2014",
    clubs: "PSV, Manchester United, Queens Park Rangers",
    goals: 57,
    caps: 100,
    confederation: "AFC",
  },
  {
    name: "Shinji Kagawa",
    flag: "🇯🇵",
    country: "Japan",
    position: "MID",
    era: "2006–present",
    clubs: "Cerezo Osaka, Dortmund, Man Utd, Real Zaragoza",
    goals: 165,
    caps: 97,
    confederation: "AFC",
  },
  {
    name: "Keisuke Honda",
    flag: "🇯🇵",
    country: "Japan",
    position: "MID",
    era: "2005–2020",
    clubs: "VVV-Venlo, CSKA Moscow, AC Milan, Melbourne Victory",
    goals: 77,
    caps: 98,
    confederation: "AFC",
  },
  {
    name: "Takumi Minamino",
    flag: "🇯🇵",
    country: "Japan",
    position: "MID",
    era: "2012–present",
    clubs: "Red Bull Salzburg, Liverpool, Monaco, Stade de Reims",
    goals: 110,
    caps: 60,
    confederation: "AFC",
  },
  {
    name: "Kaoru Mitoma",
    flag: "🇯🇵",
    country: "Japan",
    position: "FWD",
    era: "2017–present",
    clubs: "Brighton, Union SG (loan)",
    goals: 70,
    caps: 38,
    confederation: "AFC",
  },
  {
    name: "Sami Al-Jaber",
    flag: "🇸🇦",
    country: "Saudi Arabia",
    position: "FWD",
    era: "1990–2007",
    clubs: "Al-Hilal, Wolverhampton",
    goals: 185,
    caps: 163,
    confederation: "AFC",
  },
  {
    name: "Zheng Zhi",
    flag: "🇨🇳",
    country: "China",
    position: "MID",
    era: "1998–2015",
    clubs: "Charlton, Celtic, Shenzhen Ruby, Guangzhou",
    goals: 35,
    caps: 112,
    confederation: "AFC",
  },
  {
    name: "Shinji Okazaki",
    flag: "🇯🇵",
    country: "Japan",
    position: "FWD",
    era: "2006–2022",
    clubs: "Stuttgart, Mainz, Leicester City, Málaga",
    goals: 178,
    caps: 119,
    confederation: "AFC",
  },
  // CONCACAF – North/Central America
  {
    name: "Clint Dempsey",
    flag: "🇺🇸",
    country: "USA",
    position: "MID",
    era: "2002–2018",
    clubs: "Fulham, Tottenham, Seattle Sounders",
    goals: 161,
    caps: 141,
    confederation: "CONCACAF",
  },
  {
    name: "Landon Donovan",
    flag: "🇺🇸",
    country: "USA",
    position: "MID",
    era: "1999–2016",
    clubs: "San Jose Earthquakes, LA Galaxy, Bayern Munich (loan)",
    goals: 159,
    caps: 157,
    confederation: "CONCACAF",
  },
  {
    name: "Cuauhtémoc Blanco",
    flag: "🇲🇽",
    country: "Mexico",
    position: "MID",
    era: "1992–2013",
    clubs: "América, Deportivo Veracruz, Chicago Fire",
    goals: 232,
    caps: 120,
    confederation: "CONCACAF",
  },
  {
    name: "Rafael Márquez",
    flag: "🇲🇽",
    country: "Mexico",
    position: "DEF",
    era: "1996–2018",
    clubs: "Monaco, Barcelona, NY Red Bulls, León",
    goals: 47,
    caps: 147,
    confederation: "CONCACAF",
  },
  {
    name: "Javier Hernández (Chicharito)",
    flag: "🇲🇽",
    country: "Mexico",
    position: "FWD",
    era: "2005–present",
    clubs: "Chivas, Man Utd, Real Madrid, Bayer Leverkusen, West Ham",
    goals: 416,
    caps: 109,
    confederation: "CONCACAF",
  },
  {
    name: "Carlos Vela",
    flag: "🇲🇽",
    country: "Mexico",
    position: "FWD",
    era: "2005–present",
    clubs: "Arsenal, Real Sociedad, LAFC",
    goals: 240,
    caps: 72,
    confederation: "CONCACAF",
  },
  {
    name: "Hugo Sánchez",
    flag: "🇲🇽",
    country: "Mexico",
    position: "FWD",
    era: "1976–1997",
    clubs: "UNAM, Atlético Madrid, Real Madrid, América",
    goals: 468,
    caps: 58,
    confederation: "CONCACAF",
  },
  {
    name: "DaMarcus Beasley",
    flag: "🇺🇸",
    country: "USA",
    position: "MID",
    era: "2000–2019",
    clubs: "Chicago Fire, PSV, Man City, Hannover, Puebla",
    goals: 52,
    caps: 126,
    confederation: "CONCACAF",
  },
  {
    name: "Tim Howard",
    flag: "🇺🇸",
    country: "USA",
    position: "GK",
    era: "1997–2019",
    clubs: "NY MetroStars, Man Utd, Everton, Colorado Rapids",
    goals: 0,
    caps: 121,
    confederation: "CONCACAF",
  },
  {
    name: "Christian Pulisic",
    flag: "🇺🇸",
    country: "USA",
    position: "MID",
    era: "2015–present",
    clubs: "Dortmund, Chelsea, AC Milan",
    goals: 130,
    caps: 72,
    confederation: "CONCACAF",
  },
  {
    name: "Giovanni Reyna",
    flag: "🇺🇸",
    country: "USA",
    position: "MID",
    era: "2019–present",
    clubs: "Borussia Dortmund, Nottingham Forest (loan)",
    goals: 48,
    caps: 30,
    confederation: "CONCACAF",
  },
  // OFC – Oceania
  {
    name: "Tim Cahill",
    flag: "🇦🇺",
    country: "Australia",
    position: "MID",
    era: "1997–2019",
    clubs: "Millwall, Everton, NY Red Bulls, Shanghai Shenhua",
    goals: 108,
    caps: 108,
    confederation: "OFC",
  },
  {
    name: "Harry Kewell",
    flag: "🇦🇺",
    country: "Australia",
    position: "MID",
    era: "1995–2014",
    clubs: "Leeds United, Liverpool, Galatasaray, Melbourne Victory",
    goals: 145,
    caps: 58,
    confederation: "OFC",
  },
  {
    name: "Mark Schwarzer",
    flag: "🇦🇺",
    country: "Australia",
    position: "GK",
    era: "1990–2016",
    clubs: "Bradford, Middlesbrough, Fulham, Chelsea, Leicester",
    goals: 0,
    caps: 109,
    confederation: "OFC",
  },
  {
    name: "Brett Emerton",
    flag: "🇦🇺",
    country: "Australia",
    position: "MID",
    era: "1998–2012",
    clubs: "Feyenoord, Blackburn Rovers, Sydney FC",
    goals: 57,
    caps: 95,
    confederation: "OFC",
  },
  {
    name: "Archie Thompson",
    flag: "🇦🇺",
    country: "Australia",
    position: "FWD",
    era: "1999–2015",
    clubs: "Melbourne Victory, Maldivian clubs",
    goals: 74,
    caps: 27,
    confederation: "OFC",
  },
];

const TIMELINE_EVENTS = [
  {
    year: 1950,
    event:
      "Uruguay wins the first post-WWII World Cup in Brazil, defeating hosts in the 'Maracanazo'.",
    type: "WC",
  },
  {
    year: 1954,
    event:
      "'Miracle of Bern' — West Germany defeats Hungary 3–2 despite being heavy underdogs.",
    type: "WC",
  },
  {
    year: 1956,
    event:
      "Real Madrid wins the inaugural European Cup, beginning their legendary dynasty.",
    type: "UCL",
  },
  {
    year: 1958,
    event:
      "A 17-year-old Pelé dazzles the world, scoring twice in the World Cup Final.",
    type: "WC",
  },
  {
    year: 1960,
    event:
      "Real Madrid's 7–3 win over Eintracht Frankfurt considered the greatest match ever played.",
    type: "UCL",
  },
  {
    year: 1966,
    event:
      "England wins the World Cup at Wembley; Geoff Hurst scores a hat-trick in the final.",
    type: "WC",
  },
  {
    year: 1970,
    event:
      "Brazil's 1970 squad, featuring Pelé, Jairzinho, Tostão, wins gold as greatest team ever.",
    type: "WC",
  },
  {
    year: 1971,
    event:
      "Ajax Amsterdam begins their era of Total Football under Rinus Michels & Johan Cruyff.",
    type: "UCL",
  },
  {
    year: 1974,
    event:
      "West Germany beat Netherlands 2–1; Cruyff's 'Total Football' revolutionizes the game.",
    type: "WC",
  },
  {
    year: 1977,
    event:
      "Liverpool begin European dominance, winning the first of their six European Cups.",
    type: "UCL",
  },
  {
    year: 1978,
    event:
      "Argentina hosts and wins the World Cup amid political controversy under military junta.",
    type: "WC",
  },
  {
    year: 1982,
    event:
      "Italy win the World Cup; Paolo Rossi scores hat-trick vs Brazil in Estadio de Sarriá.",
    type: "WC",
  },
  {
    year: 1986,
    event:
      "Maradona's 'Hand of God' and 'Goal of the Century' in Mexico City. Argentina champions.",
    type: "WC",
  },
  {
    year: 1989,
    event:
      "AC Milan's 'Dream Team' under Arrigo Sacchi wins back-to-back European Cups.",
    type: "UCL",
  },
  {
    year: 1992,
    event:
      "Champions League rebranded from European Cup; group stage introduced.",
    type: "UCL",
  },
  {
    year: 1994,
    event:
      "USA hosts the World Cup; Brazil wins on penalties for their 4th title; no goals in the final.",
    type: "WC",
  },
  {
    year: 1995,
    event:
      "Bosman ruling transforms football — free transfers at contract expiry changes everything.",
    type: "OTHER",
  },
  {
    year: 1999,
    event:
      "Manchester United's Treble; Solskjær's last-minute winner vs Bayern in Barcelona.",
    type: "UCL",
  },
  {
    year: 2002,
    event:
      "Ronaldo's redemption — scores twice in the final vs Germany to secure Brazil's 5th star.",
    type: "WC",
  },
  {
    year: 2005,
    event:
      "Liverpool's 'Miracle of Istanbul' — 3–0 down at half-time, comeback to beat AC Milan on pens.",
    type: "UCL",
  },
  {
    year: 2006,
    event:
      "Zidane's headbutt in his last ever game — Italy beats France on penalties in Berlin.",
    type: "WC",
  },
  {
    year: 2009,
    event:
      "Pep Guardiola's Barcelona win Treble; 'Tiki-taka' era begins — Messi scores with his head.",
    type: "UCL",
  },
  {
    year: 2010,
    event:
      "South Africa hosts first World Cup on African soil; Spain wins first World Cup.",
    type: "WC",
  },
  {
    year: 2012,
    event:
      "Messi scores 91 goals in a calendar year — breaking Gerd Müller's 1972 record.",
    type: "OTHER",
  },
  {
    year: 2014,
    event:
      "Germany's historic 7–1 semi-final demolition of Brazil on home soil.",
    type: "WC",
  },
  {
    year: 2016,
    event:
      "Real Madrid begin their unprecedented three consecutive UCL title run under Zidane.",
    type: "UCL",
  },
  {
    year: 2018,
    event:
      "France wins 2nd World Cup; Mbappé becomes 2nd teenager to score in a WC Final.",
    type: "WC",
  },
  {
    year: 2021,
    event:
      "Italy win Euro 2020 (held 2021); England lose on penalties at Wembley.",
    type: "OTHER",
  },
  {
    year: 2022,
    event:
      "Qatar hosts first Middle Eastern World Cup; Messi finally wins the World Cup for Argentina.",
    type: "WC",
  },
  {
    year: 2023,
    event:
      "Man City win the Treble under Pep Guardiola; first English team since Utd 1999.",
    type: "UCL",
  },
  {
    year: 2026,
    event:
      "USA, Canada & Mexico to jointly host the 48-team expanded World Cup.",
    type: "WC",
  },
];

// ─── POSITION COLOR HELPER ──────────────────────────────────────────────────
const positionColor = (pos: string) => {
  if (pos === "GK")
    return "bg-yellow-600/20 text-yellow-300 border-yellow-600/30";
  if (pos === "DEF") return "bg-blue-600/20 text-blue-300 border-blue-600/30";
  if (pos === "MID")
    return "bg-purple-600/20 text-purple-300 border-purple-600/30";
  return "bg-emerald-600/20 text-emerald-300 border-emerald-600/30";
};

// biome-ignore lint/correctness/noUnusedVariables: utility kept for reference
const confColor = (conf: string) => {
  const map: Record<string, string> = {
    UEFA: "bg-blue-700/30 text-blue-200",
    CONMEBOL: "bg-amber-700/30 text-amber-200",
    CAF: "bg-red-700/30 text-red-200",
    AFC: "bg-orange-700/30 text-orange-200",
    CONCACAF: "bg-teal-700/30 text-teal-200",
    OFC: "bg-violet-700/30 text-violet-200",
  };
  return map[conf] || "bg-gray-700/30 text-gray-200";
};

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("worldcup");
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(
    () => {
      const saved = localStorage.getItem("ftg_user_email");
      return saved ? { email: saved } : null;
    },
  );

  // World Cup filter
  const [wcFilter, setWcFilter] = useState("ALL");

  const tabs = [
    { id: "worldcup", label: "World Cup", icon: "🏆" },
    { id: "ucl", label: "Champions League", icon: "⭐" },
    { id: "players", label: "World Players", icon: "🌍" },
    { id: "legends", label: "Legends", icon: "👑" },
    { id: "live", label: "Live Scores", icon: "🔴" },
    { id: "records", label: "Records", icon: "📊" },
    { id: "india", label: "India", icon: "🇮🇳" },
    { id: "timeline", label: "Timeline", icon: "📅" },
    { id: "countries", label: "Countries", icon: "🌐" },
    { id: "quiz", label: "Quiz", icon: "🎯" },
    { id: "trivia", label: "Trivia", icon: "⚡" },
    { id: "leagues", label: "Leagues", icon: "🏟️" },
  ];

  // ─── LOGIN GATE ──────────────────────────────────────────────────────────────
  if (!currentUser) {
    return <LoginPage onLogin={(email) => setCurrentUser({ email })} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("ftg_user_email");
    setCurrentUser(null);
  };

  return (
    <div
      className="min-h-screen pitch-bg font-body"
      style={{ background: "oklch(0.08 0.02 148)" }}
    >
      {/* Header */}
      <header className="relative border-b border-white/10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.08 148 / 0.8), oklch(0.08 0.02 148 / 0.9))",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: "oklch(0.72 0.2 148 / 0.2)",
                border: "1px solid oklch(0.72 0.2 148 / 0.4)",
              }}
            >
              ⚽
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-white">
                Football <span className="green-gradient">to Glory</span>
              </h1>
              <p className="text-white/50 text-sm">
                Complete football history 1950–2026 • All players of the world
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-white/60 text-xs hidden sm:block">
                ⚽ {currentUser.email.split("@")[0]}
              </span>
              <button
                type="button"
                data-ocid="header.logout.button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-md"
        style={{ background: "oklch(0.08 0.02 148 / 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto scroll-hide gap-1 py-2">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                data-ocid={`nav.${tab.id}.link`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "text-black font-semibold"
                    : "text-white/60 hover:text-white/90 hover:bg-white/5"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "oklch(0.72 0.2 148)", color: "black" }
                    : {}
                }
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.id === "live" && (
                  <span
                    className="live-pulse w-2 h-2 rounded-full"
                    style={{ background: "#ef4444" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "worldcup" && (
            <motion.div
              key="worldcup"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <WorldCupSection wcFilter={wcFilter} setWcFilter={setWcFilter} />
            </motion.div>
          )}
          {activeTab === "ucl" && (
            <motion.div
              key="ucl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <UCLSeasons />
            </motion.div>
          )}
          {activeTab === "players" && (
            <motion.div
              key="players"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <PlayersSection />
            </motion.div>
          )}
          {activeTab === "legends" && (
            <motion.div
              key="legends"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <LegendsSection />
            </motion.div>
          )}
          {activeTab === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <LiveScores />
            </motion.div>
          )}
          {activeTab === "records" && (
            <motion.div
              key="records"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <RecordsPage />
            </motion.div>
          )}
          {activeTab === "india" && (
            <motion.div
              key="india"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <IndiaSection />
            </motion.div>
          )}
          {activeTab === "timeline" && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <TimelineSection />
            </motion.div>
          )}
          {activeTab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <QuizPage userEmail={currentUser.email} />
            </motion.div>
          )}
          {activeTab === "countries" && (
            <motion.div
              key="countries"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <CountriesSection />
            </motion.div>
          )}
          {activeTab === "trivia" && (
            <motion.div
              key="trivia"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="py-4"
            >
              <RandomTrivia userEmail={currentUser.email} />
            </motion.div>
          )}
          {activeTab === "leagues" && (
            <motion.div
              key="leagues"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <LeagueBrowser />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-white/10 mt-16 py-8"
        style={{ background: "oklch(0.07 0.01 148)" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-white/40 text-sm">
          <p>
            ⚽ Football to Glory — Complete World Football History 1950–2026
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-emerald hover:text-white transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─── WORLD CUP SECTION ───────────────────────────────────────────────────────
function WorldCupSection({
  wcFilter,
  setWcFilter,
}: { wcFilter: string; setWcFilter: (v: string) => void }) {
  const decades = [
    "ALL",
    "1950s",
    "1960s",
    "1970s",
    "1980s",
    "1990s",
    "2000s",
    "2010s",
    "2020s",
  ];
  const filtered =
    wcFilter === "ALL"
      ? WORLD_CUPS
      : WORLD_CUPS.filter((wc) => {
          const d = Math.floor(wc.year / 10) * 10;
          return `${d}s` === wcFilter;
        });

  return (
    <section>
      <SectionHeader
        icon={<Trophy className="w-6 h-6" />}
        title="FIFA World Cup"
        subtitle={`All ${WORLD_CUPS.length} tournaments · 1950–2026`}
      />
      <div className="flex gap-2 flex-wrap mb-6">
        {decades.map((d) => (
          <button
            type="button"
            key={d}
            data-ocid={`worldcup.${d}.tab`}
            onClick={() => setWcFilter(d)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              wcFilter === d
                ? "text-black font-semibold"
                : "text-white/60 hover:text-white border border-white/10 hover:border-white/30"
            }`}
            style={wcFilter === d ? { background: "oklch(0.72 0.2 148)" } : {}}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((wc, i) => (
          <motion.div
            key={wc.year}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card className="card-glow border-white/10 bg-white/5 hover:bg-white/8 transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{wc.flag}</span>
                    <div>
                      <CardTitle className="text-white font-heading text-xl">
                        {wc.year}
                      </CardTitle>
                      <p className="text-white/50 text-xs">{wc.host}</p>
                    </div>
                  </div>
                  {wc.winner !== "TBD" ? (
                    <div className="text-right">
                      <span className="text-2xl">{wc.winnerFlag}</span>
                    </div>
                  ) : (
                    <Badge className="bg-amber-600/20 text-amber-300 border-amber-600/30">
                      Upcoming
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {wc.winner !== "TBD" ? (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold">{wc.winner}</p>
                        <p className="text-white/40 text-xs">
                          vs {wc.runnerUp}
                        </p>
                      </div>
                      <div
                        className="text-center px-3 py-1 rounded-lg"
                        style={{ background: "oklch(0.72 0.2 148 / 0.15)" }}
                      >
                        <p className="text-emerald-300 font-bold font-heading">
                          {wc.score}
                        </p>
                      </div>
                    </div>
                    <p className="text-yellow-400/80 text-xs">
                      🥅 {wc.goldenBoot}
                    </p>
                  </>
                ) : (
                  <p className="text-white/50 text-sm">
                    48-team format · 3 host countries
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 rounded p-1.5">
      <p className="text-white/30 text-xs">{label}</p>
      <p className="text-white font-bold text-sm">{value}</p>
    </div>
  );
}

// ─── LEGENDS SECTION ─────────────────────────────────────────────────────────
function LegendsSection() {
  return (
    <section>
      <SectionHeader
        icon={<Star className="w-6 h-6" />}
        title="All-Time Legends"
        subtitle="250+ greatest players in football history"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEGENDS.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            data-ocid={`legends.item.${i + 1}`}
          >
            <Card className="card-glow border-white/10 bg-white/5 hover:bg-white/8 transition-all">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: "oklch(0.72 0.2 148 / 0.15)",
                      border: "1px solid oklch(0.72 0.2 148 / 0.3)",
                    }}
                  >
                    {l.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-white font-heading font-bold">
                        {l.name}
                      </h3>
                      <Badge
                        className={`text-xs border ${positionColor(l.position)}`}
                      >
                        {l.position}
                      </Badge>
                    </div>
                    <p className="text-white/50 text-xs mb-2">
                      {l.country} · {l.years}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <StatPill label="Goals" value={l.goals} />
                      <StatPill label="Caps" value={l.caps} />
                      <div className="bg-white/5 rounded p-1.5">
                        <p className="text-white/30 text-xs">Position</p>
                        <p className="text-white font-bold text-sm">
                          {l.position}
                        </p>
                      </div>
                    </div>
                    <p className="text-white/40 text-xs truncate">
                      🏟️ {l.clubs.join(", ")}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {l.trophies.map((t) => (
                        <Badge
                          key={t}
                          className="text-xs bg-amber-600/15 text-amber-300 border-amber-600/20"
                        >
                          🏆 {t}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-emerald-300/70 text-xs mt-1">
                      ⭐ {l.awards.join(" · ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── LIVE SCORES SECTION ──────────────────────────────────────────────────────
// ─── TIMELINE SECTION ────────────────────────────────────────────────────────
function TimelineSection() {
  const typeColor = (type: string) => {
    if (type === "WC")
      return {
        bg: "oklch(0.78 0.15 80 / 0.2)",
        border: "oklch(0.78 0.15 80 / 0.4)",
        text: "oklch(0.78 0.15 80)",
      };
    if (type === "UCL")
      return {
        bg: "oklch(0.7 0.18 240 / 0.2)",
        border: "oklch(0.7 0.18 240 / 0.4)",
        text: "oklch(0.8 0.18 240)",
      };
    return {
      bg: "oklch(0.72 0.2 148 / 0.15)",
      border: "oklch(0.72 0.2 148 / 0.3)",
      text: "oklch(0.72 0.2 148)",
    };
  };

  return (
    <section>
      <SectionHeader
        icon={<Clock className="w-6 h-6" />}
        title="Football Timeline"
        subtitle="Key moments 1950–2026"
      />
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2 text-xs">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "oklch(0.78 0.15 80)" }}
          />
          World Cup
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "oklch(0.8 0.18 240)" }}
          />
          Champions League
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "oklch(0.72 0.2 148)" }}
          />
          Other
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-16 top-0 bottom-0 w-px bg-white/10" />
        <div className="space-y-4">
          {TIMELINE_EVENTS.map((ev, i) => {
            const colors = typeColor(ev.type);
            return (
              <motion.div
                key={ev.year}
                data-ocid={`timeline.item.${i + 1}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-4"
              >
                <div className="w-14 text-right flex-shrink-0">
                  <span
                    className="font-heading font-bold text-sm"
                    style={{ color: colors.text }}
                  >
                    {ev.year}
                  </span>
                </div>
                <div
                  className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                  style={{
                    background: colors.text,
                    boxShadow: `0 0 8px ${colors.text}`,
                  }}
                />
                <Card
                  className="flex-1 border"
                  style={{ background: colors.bg, borderColor: colors.border }}
                >
                  <CardContent className="py-3">
                    <p className="text-white/85 text-sm">{ev.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SHARED SECTION HEADER ───────────────────────────────────────────────────
function SectionHeader({
  icon,
  title,
  subtitle,
}: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "oklch(0.72 0.2 148 / 0.2)",
          color: "oklch(0.72 0.2 148)",
        }}
      >
        {icon}
      </div>
      <div>
        <h2 className="font-heading text-2xl font-bold text-white">{title}</h2>
        <p className="text-white/50 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── COUNTRIES SECTION ───────────────────────────────────────────────────────
function CountriesSection() {
  const [selectedCountry, setSelectedCountry] = useState<
    import("./data/countries").Country | null
  >(null);
  const confColors: Record<string, string> = {
    UEFA: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    CONMEBOL: "bg-green-500/10 border-green-500/30 text-green-300",
    CAF: "bg-orange-500/10 border-orange-500/30 text-orange-300",
    AFC: "bg-red-500/10 border-red-500/30 text-red-300",
    CONCACAF: "bg-purple-500/10 border-purple-500/30 text-purple-300",
    OFC: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  };
  const confGroups = ["UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"];
  const getPlayerCount = (countryName: string) => {
    return allPlayersExtended.filter(
      (p) => p.country.toLowerCase() === countryName.toLowerCase(),
    ).length;
  };
  return (
    <section>
      {selectedCountry && (
        <CountryDetailModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
      <SectionHeader
        icon={<span className="text-2xl">🌐</span>}
        title="196 Countries"
        subtitle="Click any country to view team details, top scorers, and squad"
      />
      <div className="space-y-8">
        {confGroups.map((conf) => {
          const countries = allCountries.filter(
            (c) => c.confederation === conf,
          );
          return (
            <div key={conf}>
              <h3
                className={`text-lg font-bold mb-4 px-3 py-1.5 rounded-lg border inline-block ${confColors[conf]}`}
              >
                {conf} ({countries.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {countries.map((c) => {
                  const playerCount = getPlayerCount(c.name);
                  return (
                    <button
                      type="button"
                      key={c.code}
                      onClick={() => setSelectedCountry(c)}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-yellow-500/40 transition-all text-center cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/10"
                    >
                      <div className="text-3xl mb-2">{c.flag}</div>
                      <p className="text-white text-xs font-semibold leading-tight">
                        {c.name}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        {playerCount > 0
                          ? `${playerCount} players`
                          : `${c.confederation}`}
                      </p>
                      {playerCount > 0 && (
                        <p className="text-yellow-500/60 text-xs mt-0.5">
                          Tap for details
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
