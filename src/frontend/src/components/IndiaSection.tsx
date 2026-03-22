import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const indiaStats = {
  fifaRanking: 124,
  rankingPeak: 94,
  rankingPeakYear: 1996,
  allTimeGoals: 430,
  allTimeCaps: 550,
  confederation: "AFC",
  saffTitles: 9,
  asianCupBest: "Runners-up (1964)",
  olympicsAppearances: 1,
  worldCupAppearances: 1,
};

const topScorers = [
  {
    rank: 1,
    name: "Sunil Chhetri",
    goals: 94,
    caps: 150,
    era: "2005–2024",
    flag: "🇮🇳",
    status: "Retired",
  },
  {
    rank: 2,
    name: "Bhaichung Bhutia",
    goals: 40,
    caps: 107,
    era: "1995–2011",
    flag: "🇮🇳",
    status: "Retired",
  },
  {
    rank: 3,
    name: "I.M. Vijayan",
    goals: 19,
    caps: 79,
    era: "1992–2003",
    flag: "🇮🇳",
    status: "Retired",
  },
  {
    rank: 4,
    name: "Jeje Lalpekhlua",
    goals: 23,
    caps: 82,
    era: "2011–2021",
    flag: "🇮🇳",
    status: "Retired",
  },
  {
    rank: 5,
    name: "Liston Colaco",
    goals: 12,
    caps: 38,
    era: "2019–Present",
    flag: "🇮🇳",
    status: "Active",
  },
  {
    rank: 6,
    name: "Manvir Singh",
    goals: 9,
    caps: 42,
    era: "2018–Present",
    flag: "🇮🇳",
    status: "Active",
  },
];

const currentSquad = {
  GK: [
    { name: "Gurpreet Singh Sandhu", club: "Bengaluru FC", caps: 82, age: 32 },
    { name: "Amrinder Singh", club: "ATK Mohun Bagan", caps: 28, age: 30 },
    { name: "Vishal Kaith", club: "Chennaiyin FC", caps: 12, age: 27 },
  ],
  DEF: [
    { name: "Sandesh Jhingan", club: "FC Goa", caps: 55, age: 30 },
    { name: "Akash Mishra", club: "FC Goa", caps: 18, age: 24 },
    { name: "Rahul Bheke", club: "Bengaluru FC", caps: 35, age: 33 },
    { name: "Roshan Singh", club: "Bengaluru FC", caps: 14, age: 22 },
    { name: "Pritam Kotal", club: "Mohun Bagan SG", caps: 52, age: 30 },
  ],
  MID: [
    { name: "Anirudh Thapa (C)", club: "Chennaiyin FC", caps: 68, age: 27 },
    { name: "Brandon Fernandes", club: "ATK Mohun Bagan", caps: 48, age: 29 },
    { name: "Sahal Abdul Samad", club: "Kerala Blasters", caps: 45, age: 26 },
    { name: "Lalengmawia", club: "NorthEast United FC", caps: 32, age: 23 },
    { name: "Jeakson Singh", club: "Hyderabad FC", caps: 25, age: 23 },
    { name: "Apuia", club: "ATK Mohun Bagan", caps: 20, age: 24 },
    { name: "Suresh Singh Wangjam", club: "Bengaluru FC", caps: 22, age: 25 },
  ],
  FWD: [
    { name: "Liston Colaco", club: "ATK Mohun Bagan", caps: 38, age: 24 },
    { name: "Manvir Singh", club: "ATK Mohun Bagan", caps: 42, age: 26 },
    { name: "Edmund Lalrindika", club: "FC Goa", caps: 20, age: 23 },
    { name: "Ishan Pandita", club: "Chennaiyin FC", caps: 15, age: 25 },
    {
      name: "Lallianzuala Chhangte",
      club: "Mumbai City FC",
      caps: 38,
      age: 26,
    },
    {
      name: "Vikram Pratap Singh",
      club: "NorthEast United FC",
      caps: 18,
      age: 21,
    },
  ],
};

const saffTitles = [
  { year: 1993, host: "Pakistan", final: "India 4-0 Sri Lanka" },
  { year: 1997, host: "India", final: "India 5-1 Maldives" },
  { year: 1999, host: "India", final: "India 2-0 Sri Lanka" },
  { year: 2005, host: "Bangladesh", final: "India 2-0 Sri Lanka" },
  { year: 2009, host: "Bangladesh", final: "India 2-0 Afghanistan" },
  { year: 2011, host: "India", final: "India 4-0 Afghanistan" },
  { year: 2015, host: "Kerala, India", final: "India 2-1 Afghanistan" },
  { year: 2021, host: "Maldives", final: "India 3-0 Nepal" },
  { year: 2023, host: "India", final: "India 2-0 Kuwait" },
];

const rankingHistory = [
  { year: 1994, ranking: 94, note: "Historic peak" },
  { year: 1998, ranking: 117 },
  { year: 2002, ranking: 127 },
  { year: 2010, ranking: 148 },
  { year: 2015, ranking: 171, note: "Lowest point" },
  { year: 2018, ranking: 96, note: "Modern high under Igor Stimac" },
  { year: 2020, ranking: 108 },
  { year: 2022, ranking: 101 },
  { year: 2024, ranking: 119 },
  { year: 2026, ranking: 124, note: "Current" },
];

const posColors: Record<string, string> = {
  GK: "bg-yellow-600/30 text-yellow-300",
  DEF: "bg-blue-600/30 text-blue-300",
  MID: "bg-green-600/30 text-green-300",
  FWD: "bg-red-600/30 text-red-300",
};

type SquadKey = keyof typeof currentSquad;

export const IndiaSection = () => {
  const [squadView, setSquadView] = useState<SquadKey>("GK");

  return (
    <div className="text-white space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 flex items-center justify-center text-5xl">
          🇮🇳
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">
            India National Football Team
          </h2>
          <p className="text-gray-400 text-sm">
            The Blue Tigers · AFC · Est. 1937
          </p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/40">
            FIFA #{indiaStats.fifaRanking}
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
            {indiaStats.saffTitles}x SAFF Champions
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {
            label: "FIFA Ranking",
            value: `#${indiaStats.fifaRanking}`,
            sub: "Current",
          },
          {
            label: "Best Ranking",
            value: `#${indiaStats.rankingPeak}`,
            sub: `${indiaStats.rankingPeakYear}`,
          },
          {
            label: "SAFF Titles",
            value: indiaStats.saffTitles,
            sub: "Championships",
          },
          { label: "Asian Cup", value: "1964", sub: "Runners-up" },
          { label: "All-time Goals", value: "94", sub: "Chhetri's tally" },
          { label: "World Cup", value: "1950", sub: "Only appearance" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 text-center"
          >
            <p className="text-2xl font-bold text-orange-400">{stat.value}</p>
            <p className="text-white text-xs font-medium mt-0.5">
              {stat.label}
            </p>
            <p className="text-gray-500 text-xs">{stat.sub}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="squad">
        <TabsList className="bg-gray-800 border border-gray-700">
          <TabsTrigger
            value="squad"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300"
            data-ocid="india.squad.tab"
          >
            👔 Current Squad
          </TabsTrigger>
          <TabsTrigger
            value="scorers"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300"
            data-ocid="india.scorers.tab"
          >
            ⚽ Top Scorers
          </TabsTrigger>
          <TabsTrigger
            value="saff"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300"
            data-ocid="india.saff.tab"
          >
            🏆 SAFF History
          </TabsTrigger>
          <TabsTrigger
            value="ranking"
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-300"
            data-ocid="india.ranking.tab"
          >
            📈 FIFA Rankings
          </TabsTrigger>
        </TabsList>

        {/* Current Squad Tab */}
        <TabsContent value="squad" className="mt-4">
          <div className="flex gap-2 mb-4 flex-wrap">
            {(["GK", "DEF", "MID", "FWD"] as SquadKey[]).map((pos) => (
              <button
                type="button"
                key={pos}
                onClick={() => setSquadView(pos)}
                data-ocid={`india.squad.${pos.toLowerCase()}.toggle`}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  squadView === pos
                    ? `${posColors[pos]} ring-2 ring-white/30`
                    : "bg-gray-700/60 text-gray-400 hover:bg-gray-600/60"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentSquad[squadView].map((player, i) => (
              <div
                key={player.name}
                data-ocid={`india.squad.item.${i + 1}`}
                className="flex items-center gap-3 bg-gray-800/50 border border-gray-700 rounded-xl p-3 hover:border-orange-500/40 transition-colors"
              >
                <span className="text-3xl">🇮🇳</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm truncate">
                    {player.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {player.club}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-orange-400 font-bold text-sm">
                    {player.caps}
                  </p>
                  <p className="text-gray-500 text-xs">caps</p>
                </div>
                <Badge className={`text-xs ${posColors[squadView]}`}>
                  {squadView}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Top Scorers Tab */}
        <TabsContent value="scorers" className="mt-4">
          <div className="space-y-3">
            {topScorers.map((player, i) => (
              <div
                key={player.name}
                data-ocid={`india.scorer.item.${i + 1}`}
                className="flex items-center gap-4 bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-orange-500/40 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    i === 0
                      ? "bg-yellow-500 text-black"
                      : i === 1
                        ? "bg-gray-400 text-black"
                        : i === 2
                          ? "bg-orange-700 text-white"
                          : "bg-gray-700 text-white"
                  }`}
                >
                  {player.rank}
                </div>
                <span className="text-3xl">{player.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">{player.name}</p>
                  <p className="text-gray-400 text-xs">{player.era}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-400">
                    {player.goals}
                  </p>
                  <p className="text-gray-500 text-xs">goals</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-400">
                    {player.caps}
                  </p>
                  <p className="text-gray-500 text-xs">caps</p>
                </div>
                <Badge
                  className={
                    player.status === "Active"
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-gray-600/40 text-gray-400"
                  }
                >
                  {player.status}
                </Badge>
              </div>
            ))}
          </div>
          <Card className="bg-gradient-to-r from-orange-600/20 to-transparent border-orange-500/40 mt-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-orange-400 flex items-center gap-2">
                👑 Legend: Sunil Chhetri
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-300 space-y-2">
              <p>
                Sunil Chhetri is India's greatest footballer and one of the
                world's top international scorers. He retired in June 2024 after
                scoring{" "}
                <span className="text-orange-400 font-bold">
                  94 international goals
                </span>{" "}
                in
                <span className="text-blue-400 font-bold"> 150 caps</span> —
                ranking him among Ronaldo, Messi, and Daei in all-time
                international scorers.
              </p>
              <p className="text-gray-400">
                Active 2005–2024 · Captained India for over a decade · ISL icon
                with Bengaluru FC & Mumbai City FC
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SAFF History Tab */}
        <TabsContent value="saff" className="mt-4">
          <p className="text-gray-400 text-sm mb-4">
            India has won the SAFF Championship (South Asian Football
            Federation) a record
            <span className="text-orange-400 font-bold"> 9 times</span>, more
            than any other nation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {saffTitles.map((title, i) => (
              <div
                key={title.year}
                data-ocid={`india.saff.item.${i + 1}`}
                className="bg-gradient-to-br from-orange-600/10 to-gray-800/50 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/60 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40 font-bold text-base">
                    {title.year}
                  </Badge>
                  <span className="text-yellow-400 text-lg">🏆</span>
                </div>
                <p className="text-white font-semibold text-sm">
                  {title.final}
                </p>
                <p className="text-gray-500 text-xs mt-1">Host: {title.host}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* FIFA Rankings Tab */}
        <TabsContent value="ranking" className="mt-4">
          <div className="space-y-2">
            {rankingHistory.map((entry, i) => {
              const maxRank = 175;
              const barWidth = ((maxRank - entry.ranking) / maxRank) * 100;
              return (
                <div
                  key={entry.year}
                  data-ocid={`india.ranking.item.${i + 1}`}
                  className="flex items-center gap-4 bg-gray-800/40 rounded-lg p-3"
                >
                  <span className="text-gray-400 text-sm font-mono w-10 shrink-0">
                    {entry.year}
                  </span>
                  <div className="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        entry.ranking <= 100
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : entry.ranking <= 130
                            ? "bg-gradient-to-r from-orange-500 to-orange-400"
                            : "bg-gradient-to-r from-red-700 to-red-500"
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-bold w-14 shrink-0 ${
                      entry.ranking <= 100
                        ? "text-green-400"
                        : entry.ranking <= 130
                          ? "text-orange-400"
                          : "text-red-400"
                    }`}
                  >
                    #{entry.ranking}
                  </span>
                  {entry.note && (
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 text-xs shrink-0">
                      {entry.note}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndiaSection;
