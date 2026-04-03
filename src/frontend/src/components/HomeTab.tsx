import { Button } from "@/components/ui/button";
import {
  Activity,
  ArrowRight,
  Award,
  Globe,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const WORLD_CUP_WINNERS = [
  {
    year: 2022,
    winner: "Argentina",
    flag: "🇦🇷",
    score: "3-3 (4-2p)",
    host: "Qatar",
  },
  { year: 2018, winner: "France", flag: "🇫🇷", score: "4-2", host: "Russia" },
  {
    year: 2014,
    winner: "Germany",
    flag: "🇩🇪",
    score: "1-0 AET",
    host: "Brazil",
  },
  {
    year: 2010,
    winner: "Spain",
    flag: "🇪🇸",
    score: "1-0 AET",
    host: "South Africa",
  },
  {
    year: 2006,
    winner: "Italy",
    flag: "🇮🇹",
    score: "1-1 (5-3p)",
    host: "Germany",
  },
  {
    year: 2002,
    winner: "Brazil",
    flag: "🇧🇷",
    score: "2-0",
    host: "Korea/Japan",
  },
];

const UCL_WINNERS = [
  {
    year: "2024",
    winner: "Real Madrid",
    score: "2-0 vs Dortmund",
    venue: "Wembley",
  },
  {
    year: "2023",
    winner: "Man City",
    score: "1-0 vs Inter Milan",
    venue: "Istanbul",
  },
  {
    year: "2022",
    winner: "Real Madrid",
    score: "1-0 vs Liverpool",
    venue: "Paris",
  },
  { year: "2021", winner: "Chelsea", score: "1-0 vs Man City", venue: "Porto" },
  {
    year: "2020",
    winner: "Bayern Munich",
    score: "1-0 vs PSG",
    venue: "Lisbon",
  },
];

const LEGENDS = [
  {
    name: "Cristiano Ronaldo",
    country: "Portugal",
    flag: "🇵🇹",
    goals: "897 official + 67 unofficial",
    stat: "Most UCL goals (140)",
  },
  {
    name: "Lionel Messi",
    country: "Argentina",
    flag: "🇦🇷",
    goals: "841 official + 59 unofficial",
    stat: "8x Ballon d'Or",
  },
  {
    name: "Pelé",
    country: "Brazil",
    flag: "🇧🇷",
    goals: "643 official + 640 unofficial",
    stat: "3x World Cup Winner",
  },
  {
    name: "Diego Maradona",
    country: "Argentina",
    flag: "🇦🇷",
    goals: "345 goals",
    stat: "1986 WC God of Football",
  },
  {
    name: "Ronaldo Nazário",
    country: "Brazil",
    flag: "🇧🇷",
    goals: "414 official goals",
    stat: "2x WC Golden Ball",
  },
  {
    name: "Zinedine Zidane",
    country: "France",
    flag: "🇫🇷",
    goals: "125 goals",
    stat: "98 WC + Euro winner",
  },
];

const STATS = [
  {
    label: "Real Players",
    value: "2,000+",
    icon: Users,
    color: "oklch(0.72 0.2 148)",
  },
  {
    label: "FIFA Nations",
    value: "196",
    icon: Globe,
    color: "oklch(0.72 0.18 230)",
  },
  {
    label: "UCL Seasons",
    value: "71",
    icon: Trophy,
    color: "oklch(0.78 0.15 80)",
  },
  {
    label: "Match Records",
    value: "10K+",
    icon: Activity,
    color: "oklch(0.75 0.18 30)",
  },
];

interface HomeTabProps {
  onTabChange: (tab: string) => void;
}

export default function HomeTab({ onTabChange }: HomeTabProps) {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl px-6 py-16 text-center">
        <div
          className="absolute inset-0 rounded-2xl pitch-lines"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, oklch(0.18 0.1 148 / 0.7), oklch(0.09 0.025 148))",
          }}
        />
        {/* Center circle decoration */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "400px",
            border: "1.5px solid oklch(0.72 0.2 148 / 0.12)",
            borderRadius: "50%",
          }}
        />
        <div className="relative z-10 space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-2"
            style={{
              background: "oklch(0.72 0.2 148 / 0.15)",
              border: "2px solid oklch(0.72 0.2 148 / 0.4)",
              boxShadow: "0 0 60px oklch(0.72 0.2 148 / 0.2)",
            }}
          >
            <Trophy
              className="w-9 h-9"
              style={{ color: "oklch(0.85 0.18 82)" }}
            />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-heading text-4xl md:text-6xl font-bold"
            style={{ color: "oklch(0.94 0.05 148)" }}
          >
            Football{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.85 0.18 82), oklch(0.68 0.14 62))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              to Glory
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "oklch(0.65 0.06 148)" }}
          >
            The complete global football encyclopedia. Every tournament, every
            player, every nation — from 1950 to 2026.
          </motion.p>
          <motion.div
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <Button
              data-ocid="home.players.primary_button"
              onClick={() => onTabChange("players")}
              className="font-semibold gap-2"
              style={{
                background: "oklch(0.72 0.2 148)",
                color: "oklch(0.09 0.025 148)",
                boxShadow: "0 0 24px oklch(0.72 0.2 148 / 0.3)",
              }}
            >
              <Users className="w-4 h-4" /> Browse Players
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              data-ocid="home.ucl.secondary_button"
              variant="outline"
              onClick={() => onTabChange("ucl")}
              className="font-semibold gap-2 border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
            >
              <Trophy className="w-4 h-4" /> UCL Seasons
            </Button>
            <Button
              data-ocid="home.live.secondary_button"
              variant="outline"
              onClick={() => onTabChange("live")}
              className="font-semibold gap-2 border-green-500/40 text-green-400 hover:bg-green-500/10"
            >
              <Activity className="w-4 h-4" /> Live Scores
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl p-5 text-center card-glow cursor-pointer"
              style={{
                background: "oklch(0.13 0.04 148)",
                border: "1px solid oklch(0.72 0.2 148 / 0.12)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${stat.color}22` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p
                className="text-2xl font-bold font-heading"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.55 0.04 148)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* UCL Latest Winners */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Trophy
              className="w-5 h-5"
              style={{ color: "oklch(0.78 0.15 80)" }}
            />
            Recent UCL Champions
          </h2>
          <button
            type="button"
            data-ocid="home.ucl.link"
            onClick={() => onTabChange("ucl")}
            className="text-xs hover:text-white transition-colors flex items-center gap-1"
            style={{ color: "oklch(0.6 0.08 148)" }}
          >
            All Seasons <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {UCL_WINNERS.map((s, i) => (
            <motion.div
              key={s.year}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl p-4 card-glow"
              style={{
                background: "oklch(0.13 0.04 148)",
                border:
                  i === 0
                    ? "1px solid oklch(0.78 0.15 80 / 0.4)"
                    : "1px solid oklch(0.22 0.03 148)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    background:
                      i === 0
                        ? "oklch(0.78 0.15 80 / 0.2)"
                        : "oklch(0.16 0.03 148)",
                    color:
                      i === 0 ? "oklch(0.85 0.18 82)" : "oklch(0.6 0.04 148)",
                  }}
                >
                  {s.year}
                </span>
                {i === 0 && (
                  <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">
                    Latest
                  </span>
                )}
              </div>
              <p className="text-white font-bold text-base">{s.winner}</p>
              <p
                className="text-xs mt-1"
                style={{ color: "oklch(0.55 0.04 148)" }}
              >
                {s.score}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.5 0.04 148)" }}
              >
                📍 {s.venue}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* World Cup Winners */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Award
              className="w-5 h-5"
              style={{ color: "oklch(0.75 0.18 30)" }}
            />
            Recent World Cup Champions
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {WORLD_CUP_WINNERS.map((wc, i) => (
            <motion.div
              key={wc.year}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl p-4 text-center card-glow"
              style={{
                background:
                  i === 0
                    ? "oklch(0.15 0.07 30 / 0.4)"
                    : "oklch(0.13 0.04 148)",
                border:
                  i === 0
                    ? "1px solid oklch(0.75 0.18 30 / 0.4)"
                    : "1px solid oklch(0.22 0.03 148)",
              }}
            >
              <p className="text-3xl mb-2">{wc.flag}</p>
              <p className="text-white font-bold text-sm">{wc.winner}</p>
              <p
                className="text-xs font-bold mt-1"
                style={{ color: "oklch(0.85 0.18 82)" }}
              >
                {wc.year}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.5 0.04 148)" }}
              >
                {wc.host}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Legends */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
            <Star
              className="w-5 h-5"
              style={{ color: "oklch(0.72 0.2 148)" }}
            />
            Football Legends
          </h2>
          <button
            type="button"
            data-ocid="home.players.link"
            onClick={() => onTabChange("players")}
            className="text-xs hover:text-white transition-colors flex items-center gap-1"
            style={{ color: "oklch(0.6 0.08 148)" }}
          >
            All Players <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEGENDS.map((legend, i) => (
            <motion.div
              key={legend.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl p-4 card-glow"
              style={{
                background: "oklch(0.13 0.04 148)",
                border: "1px solid oklch(0.22 0.03 148)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{legend.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">
                    {legend.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.04 148)" }}
                  >
                    {legend.country}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <p
                  className="text-xs"
                  style={{ color: "oklch(0.65 0.12 148)" }}
                >
                  ⚽ {legend.goals}
                </p>
                <p className="text-xs" style={{ color: "oklch(0.65 0.12 80)" }}>
                  🏆 {legend.stat}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-heading text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" style={{ color: "oklch(0.78 0.15 80)" }} />
          Explore More
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              id: "quiz",
              label: "Football Quiz",
              emoji: "🎯",
              desc: "Test your knowledge",
            },
            {
              id: "trivia",
              label: "Random Trivia",
              emoji: "⚡",
              desc: "Surprise facts",
            },
            {
              id: "records",
              label: "Fun Records",
              emoji: "📊",
              desc: "Mind-blowing stats",
            },
            {
              id: "countries",
              label: "All Nations",
              emoji: "🌍",
              desc: "196 FIFA countries",
            },
          ].map((item, i) => (
            <motion.button
              key={item.id}
              data-ocid={`home.${item.id}.card`}
              type="button"
              onClick={() => onTabChange(item.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="rounded-xl p-5 text-left card-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "oklch(0.13 0.04 148)",
                border: "1px solid oklch(0.22 0.03 148)",
              }}
            >
              <p className="text-3xl mb-2">{item.emoji}</p>
              <p className="text-white font-bold text-sm">{item.label}</p>
              <p
                className="text-xs mt-0.5"
                style={{ color: "oklch(0.55 0.04 148)" }}
              >
                {item.desc}
              </p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
