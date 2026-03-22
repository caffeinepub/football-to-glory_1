import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { useState } from "react";

interface FootballRecord {
  id: number;
  category: string;
  emoji: string;
  title: string;
  holder: string;
  value: string;
  description: string;
  year?: string;
  difficulty?: "legendary" | "amazing" | "fun";
}

const RECORDS: FootballRecord[] = [
  // UCL Records
  {
    id: 1,
    category: "UCL Records",
    emoji: "⭐",
    title: "Most UCL Goals",
    holder: "Cristiano Ronaldo",
    value: "140 goals",
    description:
      "Ronaldo scored 140 UEFA Champions League goals across stints at Manchester United, Real Madrid and Juventus. A record that may never be broken.",
    year: "2003–2018",
    difficulty: "legendary",
  },
  {
    id: 2,
    category: "UCL Records",
    emoji: "🏆",
    title: "Most UCL Titles (Club)",
    holder: "Real Madrid",
    value: "15 titles",
    description:
      "Real Madrid are the undisputed kings of European football, winning the Champions League 15 times — more than any other club.",
    year: "1956–2024",
    difficulty: "legendary",
  },
  {
    id: 3,
    category: "UCL Records",
    emoji: "🥅",
    title: "Biggest UCL Win",
    holder: "Borussia Dortmund vs Legia Warsaw",
    value: "8–4",
    description:
      "BVB thrashed Legia Warsaw 8–4 in the 2016–17 group stage. Legia had been reduced to 9 men — and still scored 4!",
    year: "2016",
    difficulty: "amazing",
  },
  {
    id: 4,
    category: "UCL Records",
    emoji: "⚡",
    title: "Fastest UCL Goal",
    holder: "Roy Makaay (Bayern Munich)",
    value: "10.2 seconds",
    description:
      "Roy Makaay scored just 10.2 seconds into Bayern Munich's 2007 UCL quarter-final against Real Madrid — the fastest goal in UCL history.",
    year: "2007",
    difficulty: "amazing",
  },
  {
    id: 5,
    category: "UCL Records",
    emoji: "🧒",
    title: "Youngest UCL Scorer",
    holder: "Cesc Fabregas",
    value: "17 years, 18 days",
    description:
      "Cesc Fabregas scored in the UCL qualifying round for Arsenal at just 17 years and 18 days old in 2003.",
    year: "2003",
    difficulty: "fun",
  },
  {
    id: 6,
    category: "UCL Records",
    emoji: "👴",
    title: "Oldest UCL Scorer",
    holder: "Francesco Totti",
    value: "38 years, 59 days",
    description:
      "Roma legend Francesco Totti scored in the UCL at 38 years and 59 days in November 2014, making him the oldest scorer in UCL history.",
    year: "2014",
    difficulty: "fun",
  },
  {
    id: 7,
    category: "UCL Records",
    emoji: "📈",
    title: "Most UCL Assists",
    holder: "Cristiano Ronaldo",
    value: "42 assists",
    description:
      "Not just a scorer, Ronaldo also holds the record for most assists in UCL history with 42, proving he was a complete forward.",
    year: "2003–2019",
    difficulty: "legendary",
  },
  {
    id: 8,
    category: "UCL Records",
    emoji: "🎯",
    title: "Most UCL Goals in a Single Season",
    holder: "Cristiano Ronaldo",
    value: "17 goals",
    description:
      "Ronaldo scored 17 UCL goals in the 2013–14 season for Real Madrid — the most in a single Champions League campaign.",
    year: "2013–14",
    difficulty: "legendary",
  },
  {
    id: 9,
    category: "UCL Records",
    emoji: "🔥",
    title: "Most UCL Appearances",
    holder: "Iker Casillas",
    value: "177 appearances",
    description:
      "Legendary Spanish goalkeeper Iker Casillas appeared in the UCL 177 times, more than any other player in history.",
    year: "1999–2019",
    difficulty: "legendary",
  },
  {
    id: 10,
    category: "UCL Records",
    emoji: "🏅",
    title: "Most UCL Finals Won (Player)",
    holder: "Francisco Gento",
    value: "6 finals",
    description:
      "Real Madrid winger Francisco Gento won the European Cup/UCL 6 times between 1956–1966 — an individual record that stood for decades.",
    year: "1956–1966",
    difficulty: "legendary",
  },
  // World Cup Records
  {
    id: 11,
    category: "World Cup Records",
    emoji: "⚽",
    title: "Most World Cup Goals",
    holder: "Miroslav Klose",
    value: "16 goals",
    description:
      "Germany's Miroslav Klose scored 16 goals across four World Cups (2002, 2006, 2010, 2014), surpassing Ronaldo's previous record of 15.",
    year: "2002–2014",
    difficulty: "legendary",
  },
  {
    id: 12,
    category: "World Cup Records",
    emoji: "🏆",
    title: "Most World Cup Titles",
    holder: "Brazil",
    value: "5 titles",
    description:
      "Brazil are the only nation to have won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002), and the only country to qualify for every tournament.",
    year: "1958–2002",
    difficulty: "legendary",
  },
  {
    id: 13,
    category: "World Cup Records",
    emoji: "💥",
    title: "Biggest World Cup Win",
    holder: "Hungary vs El Salvador",
    value: "10–1",
    description:
      "Hungary demolished El Salvador 10–1 in the 1982 World Cup in Spain. László Kiss came on as substitute and scored a hat-trick in just 7 minutes.",
    year: "1982",
    difficulty: "amazing",
  },
  {
    id: 14,
    category: "World Cup Records",
    emoji: "🦅",
    title: "Eusébio's Golden Boot",
    holder: "Eusébio (Portugal)",
    value: "9 goals in 6 games",
    description:
      "Portugal's Eusébio was unstoppable at the 1966 World Cup, scoring 9 goals including 4 in a single quarter-final against North Korea. Portugal finished 3rd.",
    year: "1966",
    difficulty: "legendary",
  },
  {
    id: 15,
    category: "World Cup Records",
    emoji: "🧤",
    title: "Most WC Clean Sheets",
    holder: "Peter Shilton (England)",
    value: "10 clean sheets",
    description:
      "England goalkeeper Peter Shilton holds the World Cup record for most clean sheets with 10 across the 1982, 1986 and 1990 tournaments.",
    year: "1982–1990",
    difficulty: "amazing",
  },
  {
    id: 16,
    category: "World Cup Records",
    emoji: "📅",
    title: "Youngest World Cup Player",
    holder: "Norman Whiteside",
    value: "17 years, 41 days",
    description:
      "Northern Ireland's Norman Whiteside played in the 1982 World Cup at just 17 years and 41 days, breaking Pelé's previous record.",
    year: "1982",
    difficulty: "fun",
  },
  {
    id: 17,
    category: "World Cup Records",
    emoji: "⚡",
    title: "Fastest World Cup Goal",
    holder: "Hakan Şükür (Turkey)",
    value: "11 seconds",
    description:
      "Turkish striker Hakan Şükür scored just 11 seconds into the 2002 World Cup third-place match against South Korea — the fastest goal in WC history.",
    year: "2002",
    difficulty: "amazing",
  },
  {
    id: 18,
    category: "World Cup Records",
    emoji: "🇩🇪",
    title: "Germany 7–1 Brazil",
    holder: "Germany",
    value: "7–1 semifinal",
    description:
      "The 'Mineirazo' — Germany's 7–1 demolition of Brazil on home soil in the 2014 semifinal is the most shocking result in World Cup history.",
    year: "2014",
    difficulty: "legendary",
  },
  // Fun & Unusual Records
  {
    id: 19,
    category: "Fun & Unusual",
    emoji: "🏃",
    title: "Fastest Goal Ever Scored",
    holder: "Ricardo Oliveira (Brazil — unverified legend)",
    value: "~2 seconds",
    description:
      "Various local league games claim goals in 2 seconds, but the fastest officially documented goal in professional football is by Nawaf Al-Abed (Saudi Arabia) in 2.4 seconds in 2009.",
    year: "2009",
    difficulty: "fun",
  },
  {
    id: 20,
    category: "Fun & Unusual",
    emoji: "🧤",
    title: "Goalkeeper Scoring a Goal",
    holder: "Rogerio Ceni (Sao Paulo)",
    value: "131 career goals",
    description:
      "Brazilian goalkeeper Rogerio Ceni scored 131 goals in his career — more than most strikers! He was the designated free-kick and penalty taker at Sao Paulo.",
    year: "1997–2015",
    difficulty: "amazing",
  },
  {
    id: 21,
    category: "Fun & Unusual",
    emoji: "🙈",
    title: "Most Own Goals in One Match",
    holder: "Aigle Noir vs Linafoot (DR Congo)",
    value: "33 own goals",
    description:
      "In 2002, Congolese club Aigle Noir deliberately scored 33 own goals in protest against a refereeing decision. The match ended 102–1. Both clubs were banned.",
    year: "2002",
    difficulty: "fun",
  },
  {
    id: 22,
    category: "Fun & Unusual",
    emoji: "🔴",
    title: "Fastest Red Card",
    holder: "Lee Todd",
    value: "2 seconds",
    description:
      "Lee Todd received a red card just 2 seconds into a 2000 Sunday league match in England. The referee had barely blown the whistle when Todd used a profanity about the noise.",
    year: "2000",
    difficulty: "fun",
  },
  {
    id: 23,
    category: "Fun & Unusual",
    emoji: "💸",
    title: "Most Expensive Transfer Ever",
    holder: "Neymar Jr. to PSG",
    value: "€222 million",
    description:
      "In 2017, Neymar's transfer from Barcelona to Paris Saint-Germain shattered the world record at €222 million — nearly double the previous record.",
    year: "2017",
    difficulty: "amazing",
  },
  {
    id: 24,
    category: "Fun & Unusual",
    emoji: "🪄",
    title: "Penalty Record in a Shootout",
    holder: "KK Palace vs Civics (Namibia)",
    value: "48 penalties",
    description:
      "In 2005, a Namibian cup match went to the most ridiculous penalty shootout in history: KK Palace won 17–16 after 48 spot kicks were taken.",
    year: "2005",
    difficulty: "fun",
  },
  {
    id: 25,
    category: "Fun & Unusual",
    emoji: "📺",
    title: "Most Watched Football Match",
    holder: "2022 World Cup Final",
    value: "1.5 billion viewers",
    description:
      "The 2022 FIFA World Cup Final between Argentina and France was watched by an estimated 1.5 billion people worldwide, making it the most-watched sporting event in history.",
    year: "2022",
    difficulty: "legendary",
  },
  {
    id: 26,
    category: "Fun & Unusual",
    emoji: "🧱",
    title: "Goalkeeper Playing Outfield",
    holder: "Jose Luis Chilavert (Paraguay)",
    value: "67 career goals",
    description:
      "Paraguayan goalkeeper José Luis Chilavert scored 67 career goals including 8 for his national team, and scored hat-tricks. A true one-of-a-kind player.",
    year: "1990–2004",
    difficulty: "amazing",
  },
  {
    id: 27,
    category: "Fun & Unusual",
    emoji: "⏱️",
    title: "Longest Match in History",
    holder: "Santos vs Palmerias (Brazil)",
    value: "3 hours 23 minutes",
    description:
      "A São Paulo state championship match in 1991 lasted 3 hours 23 minutes due to suspensions, brawls, and extra time. It ended 4–4 and had to be replayed.",
    year: "1991",
    difficulty: "fun",
  },
  // Indian Football Records
  {
    id: 28,
    category: "Indian Football",
    emoji: "🇮🇳",
    title: "Most International Goals (India)",
    holder: "Sunil Chhetri",
    value: "94 goals in 152 matches",
    description:
      "Captain Sunil Chhetri is India's all-time top scorer with 94 international goals, making him the 3rd highest active international scorer globally, behind only Ronaldo and Messi.",
    year: "2005–present",
    difficulty: "legendary",
  },
  {
    id: 29,
    category: "Indian Football",
    emoji: "🏆",
    title: "India's Best World Cup Qualifier",
    holder: "India National Team",
    value: "AFC 3rd Round qualification",
    description:
      "India reached the AFC World Cup qualification third round in 2026 WC qualifying for the first time in decades under coach Manolo Márquez, a historic achievement.",
    year: "2023–2024",
    difficulty: "amazing",
  },
  {
    id: 30,
    category: "Indian Football",
    emoji: "🥇",
    title: "India's Biggest Win",
    holder: "India vs Pakistan",
    value: "7–0",
    description:
      "India's biggest international win was a 7–0 demolition of Pakistan in 1973. India has also beaten Sri Lanka 7–1 on multiple occasions.",
    year: "1973",
    difficulty: "amazing",
  },
  {
    id: 31,
    category: "Indian Football",
    emoji: "🌏",
    title: "India at the World Cup",
    holder: "India",
    value: "1950 World Cup qualification",
    description:
      "India qualified for the 1950 FIFA World Cup in Brazil but withdrew — reportedly because FIFA refused to let them play barefoot, although this is disputed. They've never qualified since.",
    year: "1950",
    difficulty: "fun",
  },
  {
    id: 32,
    category: "Indian Football",
    emoji: "👑",
    title: "First Indian to Play in Europe",
    holder: "Bhaichung Bhutia",
    value: "Bury FC, England (1999–2002)",
    description:
      "Bhaichung Bhutia, the 'Sikkimese Sniper,' became the first Indian to play professional football in England when he signed for Bury FC in 1999.",
    year: "1999",
    difficulty: "amazing",
  },
  // Iconic Individual Records
  {
    id: 33,
    category: "Individual Legends",
    emoji: "🐐",
    title: "Ronaldo's Career Goals",
    holder: "Cristiano Ronaldo",
    value: "900+ career goals",
    description:
      "Cristiano Ronaldo is the first and only player in history to score 900+ career goals across all competitions for club and country.",
    year: "2002–present",
    difficulty: "legendary",
  },
  {
    id: 34,
    category: "Individual Legends",
    emoji: "🎩",
    title: "Most Ballon d'Or Awards",
    holder: "Lionel Messi",
    value: "8 Ballon d'Or",
    description:
      "Lionel Messi has won the Ballon d'Or a record 8 times: 2009, 2010, 2011, 2012, 2015, 2019, 2021, and 2023.",
    year: "2009–2023",
    difficulty: "legendary",
  },
  {
    id: 35,
    category: "Individual Legends",
    emoji: "🎯",
    title: "Most Goals in a Calendar Year",
    holder: "Lionel Messi",
    value: "91 goals in 2012",
    description:
      "In 2012, Messi scored an astonishing 91 goals for Barcelona and Argentina, breaking Gerd Müller's previous record of 85 set in 1972.",
    year: "2012",
    difficulty: "legendary",
  },
  {
    id: 36,
    category: "Individual Legends",
    emoji: "🏃",
    title: "Most Goals in a Single WC Tournament",
    holder: "Just Fontaine (France)",
    value: "13 goals in 1958",
    description:
      "Just Fontaine scored 13 goals in the 1958 World Cup in Sweden — an astonishing record that has stood for over 65 years and may never be broken.",
    year: "1958",
    difficulty: "legendary",
  },
  {
    id: 37,
    category: "Individual Legends",
    emoji: "⚽",
    title: "Pelé's 1000 Goals",
    holder: "Pelé",
    value: "1,281 career goals",
    description:
      "Brazilian legend Pelé scored 1,281 career goals across all competitions, including friendlies. His 1,000th official goal (Santos vs Vasco) was celebrated nationwide in Brazil.",
    year: "1956–1977",
    difficulty: "legendary",
  },
  {
    id: 38,
    category: "Individual Legends",
    emoji: "🌪️",
    title: "Fastest Hat-Trick",
    holder: "Tommy Ross (Ross County)",
    value: "90 seconds",
    description:
      "Tommy Ross of Ross County scored the world's fastest hat-trick in a Scottish league match in 1964, netting 3 goals in just 90 seconds.",
    year: "1964",
    difficulty: "fun",
  },
];

const categoryColors: Record<
  string,
  { bg: string; text: string; border: string; icon: string }
> = {
  "UCL Records": {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    icon: "⭐",
  },
  "World Cup Records": {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    icon: "🏆",
  },
  "Fun & Unusual": {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    icon: "🎪",
  },
  "Indian Football": {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    icon: "🇮🇳",
  },
  "Individual Legends": {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    icon: "👑",
  },
};

const difficultyColors: Record<string, string> = {
  legendary: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  amazing: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  fun: "bg-green-500/20 text-green-300 border-green-500/40",
};

export default function RecordsPage() {
  const categories = Array.from(new Set(RECORDS.map((r) => r.category)));
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? RECORDS
      : RECORDS.filter((r) => r.category === activeCategory);

  return (
    <section className="pb-12">
      <div className="text-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-display font-bold mb-3"
        >
          <span className="trophy-gradient">🏅 Football Records</span>
        </motion.h1>
        <p className="text-white/50 text-lg">
          Mind-blowing stats, fun facts, and legendary achievements from the
          beautiful game
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          type="button"
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            activeCategory === "All"
              ? "bg-white/15 text-white border-white/30"
              : "text-white/50 border-white/10 hover:border-white/25"
          }`}
        >
          All ({RECORDS.length})
        </button>
        {categories.map((cat) => {
          const style = categoryColors[cat] || {
            bg: "",
            text: "text-white",
            border: "border-white/20",
          };
          const count = RECORDS.filter((r) => r.category === cat).length;
          return (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? `${style.bg} ${style.text} ${style.border}`
                  : "text-white/50 border-white/10 hover:border-white/25"
              }`}
            >
              {categoryColors[cat]?.icon} {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Records grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((record, i) => {
          const style = categoryColors[record.category] || {
            bg: "bg-white/5",
            text: "text-white",
            border: "border-white/10",
          };
          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card
                className={`card-glow border ${style.border} ${style.bg} bg-gray-900/50 h-full`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{record.emoji}</span>
                      <div>
                        <CardTitle
                          className={`text-base font-bold ${style.text}`}
                        >
                          {record.title}
                        </CardTitle>
                        <p className="text-white/50 text-xs mt-0.5">
                          {record.holder}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs shrink-0 border ${difficultyColors[record.difficulty || "fun"]}`}
                    >
                      {record.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold font-display mb-2 ${style.text}`}
                  >
                    {record.value}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {record.description}
                  </p>
                  {record.year && (
                    <p className="text-white/30 text-xs mt-2">
                      📅 {record.year}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
