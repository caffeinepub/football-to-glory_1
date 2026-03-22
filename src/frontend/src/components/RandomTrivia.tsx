import { Button } from "@/components/ui/button";
import { CheckCircle, RefreshCw, XCircle, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface TriviaItem {
  question: string;
  answer: string;
  category: string;
  funFact?: string;
}

const TRIVIA_BANK: TriviaItem[] = [
  {
    question:
      "Which player has scored the most goals in a single World Cup tournament?",
    answer: "Just Fontaine (13 goals, 1958 France)",
    category: "World Cup",
    funFact:
      "Fontaine's record has stood for over 65 years and may never be broken.",
  },
  {
    question:
      "Who holds the record for most UEFA Champions League titles as a player?",
    answer: "Several players with 6 titles (Karim Benzema, Nacho Fernandez)",
    category: "UCL",
    funFact: "Real Madrid has won the UCL a record 15 times.",
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    answer: "Brazil (5 times: 1958, 1962, 1970, 1994, 2002)",
    category: "World Cup",
    funFact:
      "Brazil is the only team to have played in every single World Cup.",
  },
  {
    question: "Who is the all-time top scorer in international football?",
    answer: "Cristiano Ronaldo (130+ goals for Portugal)",
    category: "Records",
    funFact: "Ronaldo broke Ali Daei's record of 109 goals in 2021.",
  },
  {
    question: "What is the highest scoreline ever in a World Cup match?",
    answer: "Hungary 10–1 El Salvador (1982)",
    category: "World Cup",
    funFact:
      "Hungary's László Kiss scored a hat-trick as a substitute in that match.",
  },
  {
    question: "Which goalkeeper has kept the most clean sheets in UCL history?",
    answer: "Iker Casillas (100+ UCL clean sheets)",
    category: "UCL",
    funFact:
      "Casillas is considered one of the greatest goalkeepers of all time.",
  },
  {
    question: "Who scored the 'Hand of God' goal?",
    answer: "Diego Maradona (Argentina vs England, 1986 World Cup)",
    category: "World Cup",
    funFact:
      "In the same match, Maradona also scored the 'Goal of the Century'.",
  },
  {
    question: "Which club has won the most league titles in England?",
    answer: "Manchester United (20 First Division/Premier League titles)",
    category: "Clubs",
    funFact: "Liverpool have 19 league titles, just one behind United.",
  },
  {
    question: "What year was FIFA founded?",
    answer: "1904 (in Paris, France)",
    category: "History",
    funFact:
      "The founding members were Belgium, Denmark, France, Netherlands, Spain, Sweden, and Switzerland.",
  },
  {
    question: "Who scored in the 1966 World Cup final for England?",
    answer: "Geoff Hurst (hat-trick) and Martin Peters",
    category: "World Cup",
    funFact:
      "Geoff Hurst is the only player to score a hat-trick in a World Cup Final.",
  },
  {
    question: "Which player won the most Ballon d'Or awards?",
    answer: "Lionel Messi (8 times)",
    category: "Awards",
    funFact: "Messi won his first in 2009 and his most recent in 2023.",
  },
  {
    question: "What is the furthest an African team has gone in the World Cup?",
    answer: "Semi-finals — Morocco in 2022 and Cameroon in 1990 (4th place)",
    category: "World Cup",
    funFact:
      "Morocco became the first African team to reach the World Cup semi-finals in 2022.",
  },
  {
    question: "Who holds the record for most appearances in UCL history?",
    answer: "Cristiano Ronaldo (183+ appearances)",
    category: "UCL",
    funFact:
      "Ronaldo is also the all-time top scorer in the UCL with 140+ goals.",
  },
  {
    question: "Which nation hosted the first FIFA World Cup?",
    answer: "Uruguay (1930)",
    category: "World Cup",
    funFact:
      "Uruguay also won the first World Cup, defeating Argentina 4–2 in the final.",
  },
  {
    question: "What is the fastest goal ever scored in international football?",
    answer: "Hakan Sukur (Turkey) — 11 seconds vs South Korea, 2002 World Cup",
    category: "Records",
    funFact: "It happened in the 3rd-place play-off, not in the main rounds.",
  },
  {
    question: "Which club has won the most UCL/European Cup titles?",
    answer: "Real Madrid (15 titles)",
    category: "UCL",
    funFact:
      "Real Madrid also won 3 consecutive UCL titles between 2016 and 2018.",
  },
  {
    question: "Who is India's all-time top scorer?",
    answer: "Sunil Chhetri (94+ international goals)",
    category: "India",
    funFact:
      "Chhetri once had more international goals than Messi at a point in their careers.",
  },
  {
    question: "What is the VAR system in football?",
    answer:
      "Video Assistant Referee — technology to review key match decisions",
    category: "Rules",
    funFact: "VAR was first used in the 2018 World Cup in Russia.",
  },
  {
    question:
      "Which player scored the winning goal in the 2014 World Cup final?",
    answer: "Mario Götze (Germany) — 113th minute vs Argentina",
    category: "World Cup",
    funFact:
      "Götze came on as a substitute and scored his first career World Cup goal.",
  },
  {
    question: "What trophy is awarded to the best player at the World Cup?",
    answer: "The Golden Ball (Ballon d'Or du Mondial)",
    category: "Awards",
    funFact: "In 2022, Lionel Messi won the Golden Ball for the second time.",
  },
  {
    question: "Which country won Euro 2020 (played in 2021)?",
    answer: "Italy (defeated England 3–2 on penalties)",
    category: "Euro",
    funFact:
      "The tournament was delayed by one year due to the COVID-19 pandemic.",
  },
  {
    question: "How many players are on the field per team during a match?",
    answer: "11 players (plus substitutes on the bench)",
    category: "Rules",
    funFact: "FIFA allows up to 5 substitutions per team in most competitions.",
  },
  {
    question: "Who scored the iconic 'Panenka' penalty and when?",
    answer:
      "Antonin Panenka (Czechoslovakia) — Euro 1976 final vs West Germany",
    category: "History",
    funFact: "The chipped penalty kick is now called a 'Panenka' in his honor.",
  },
  {
    question: "What is the offside rule in simple terms?",
    answer:
      "A player is offside if closer to the opponent's goal than both the ball and the second-to-last defender when the ball is played",
    category: "Rules",
    funFact:
      "The offside rule has existed since 1863, though the exact details have changed many times.",
  },
  {
    question: "Which World Cup had the most goals scored?",
    answer: "1998 France World Cup — 171 goals in 64 matches",
    category: "World Cup",
    funFact: "France won that tournament, defeating Brazil 3–0 in the final.",
  },
  {
    question: "Who scored the most goals in a single La Liga season?",
    answer: "Lionel Messi — 50 goals in the 2011/12 season",
    category: "Records",
    funFact: "Messi scored those 50 goals in just 37 league appearances.",
  },
  {
    question: "What year did the Premier League start?",
    answer: "1992 — replacing the First Division as England's top flight",
    category: "History",
    funFact:
      "Manchester United won the first Premier League title in the 1992/93 season.",
  },
  {
    question: "Which African nation qualified for the World Cup most times?",
    answer: "Cameroon (8 appearances)",
    category: "Africa",
    funFact:
      "Cameroon famously reached the quarter-finals in 1990, shocking Argentina in the group stage.",
  },
  {
    question: "What is a 'golden goal'?",
    answer: "A goal scored in extra time that immediately ends the match",
    category: "Rules",
    funFact:
      "The golden goal rule was used from 1993 to 2004 in major competitions, then abolished.",
  },
  {
    question: "Who is the youngest player to appear in a World Cup?",
    answer: "Norman Whiteside (Northern Ireland) — 17 years, 41 days in 1982",
    category: "Records",
    funFact:
      "Whiteside broke the previous record set by Pele at the 1958 World Cup.",
  },
];

export default function RandomTrivia() {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * TRIVIA_BANK.length),
  );
  const [revealed, setRevealed] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const trivia = TRIVIA_BANK[currentIndex];

  const next = () => {
    let idx = Math.floor(Math.random() * TRIVIA_BANK.length);
    if (idx === currentIndex) idx = (idx + 1) % TRIVIA_BANK.length;
    setCurrentIndex(idx);
    setRevealed(false);
    setLiked(null);
  };

  const categoryColors: Record<string, string> = {
    "World Cup": "bg-yellow-500/20 text-yellow-400",
    UCL: "bg-blue-500/20 text-blue-400",
    Records: "bg-red-500/20 text-red-400",
    Awards: "bg-purple-500/20 text-purple-400",
    History: "bg-orange-500/20 text-orange-400",
    Rules: "bg-gray-500/20 text-gray-400",
    Clubs: "bg-green-500/20 text-green-400",
    India: "bg-orange-500/20 text-orange-400",
    Euro: "bg-blue-500/20 text-blue-400",
    Africa: "bg-green-500/20 text-green-400",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-yellow-400">Random Trivia</h2>
        <span className="text-gray-500 text-sm ml-2">
          {TRIVIA_BANK.length} facts
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.35 }}
          className="bg-gray-800/90 border border-gray-700 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[trivia.category] ?? "bg-gray-700 text-gray-400"}`}
            >
              {trivia.category}
            </span>
            <span className="text-gray-600 text-xs">
              {currentIndex + 1} / {TRIVIA_BANK.length}
            </span>
          </div>

          <p className="text-white text-lg font-medium leading-relaxed mb-6">
            {trivia.question}
          </p>

          <AnimatePresence>
            {!revealed ? (
              <motion.div key="reveal-btn" exit={{ opacity: 0 }}>
                <Button
                  onClick={() => setRevealed(true)}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3"
                >
                  Reveal Answer
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-green-400 font-semibold text-sm uppercase tracking-wide mb-1">
                    Answer
                  </p>
                  <p className="text-white text-base">{trivia.answer}</p>
                </div>
                {trivia.funFact && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                    <p className="text-blue-400 font-semibold text-xs uppercase tracking-wide mb-1">
                      ⚡ Fun Fact
                    </p>
                    <p className="text-gray-300 text-sm">{trivia.funFact}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiked(true)}
                    className={`flex-1 border ${
                      liked === true
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-600"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" /> Knew it!
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiked(false)}
                    className={`flex-1 border ${
                      liked === false
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-600"
                    }`}
                  >
                    <XCircle className="w-4 h-4 mr-1" /> Learned it!
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={next}
          variant="ghost"
          className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> Next Trivia
        </Button>
      </div>
    </div>
  );
}
