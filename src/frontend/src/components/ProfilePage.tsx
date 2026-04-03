import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { Award, BarChart3, Star, Target, Trophy, User } from "lucide-react";
import { motion } from "motion/react";
import { useActor } from "../hooks/useActor";

interface ProfilePageProps {
  userEmail: string;
}

export default function ProfilePage({ userEmail }: ProfilePageProps) {
  const { actor, isFetching } = useActor();

  const { data: scores = [], isLoading } = useQuery({
    queryKey: ["userScores", userEmail],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getUserScores(userEmail);
    },
    enabled: !!actor && !isFetching,
  });

  const quizScores = scores.filter((s) => s.category === "Quiz");
  const triviaScores = scores.filter((s) => s.category === "Trivia");
  const bestQuiz = quizScores.length
    ? Math.max(...quizScores.map((s) => Number(s.score)))
    : 0;
  const bestTrivia = triviaScores.length
    ? Math.max(...triviaScores.map((s) => Number(s.score)))
    : 0;
  const avgScore = scores.length
    ? Math.round(
        scores.reduce((acc, s) => acc + Number(s.score), 0) / scores.length,
      )
    : 0;

  const sorted = [...scores].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  const formatDate = (ts: bigint) => {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-400";
    if (score >= 5) return "text-yellow-400";
    return "text-red-400";
  };

  const scoreBadge = (score: number) => {
    if (score >= 9) return "🏆 Excellent";
    if (score >= 7) return "⭐ Great";
    if (score >= 5) return "👍 Good";
    return "💪 Keep Going";
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "oklch(0.72 0.2 148 / 0.2)",
            color: "oklch(0.72 0.2 148)",
          }}
        >
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">
            My Profile
          </h2>
          <p className="text-white/50 text-sm">{userEmail}</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Sessions",
            value: scores.length,
            icon: BarChart3,
            color: "oklch(0.72 0.2 148)",
          },
          {
            label: "Best Quiz",
            value: `${bestQuiz}/10`,
            icon: Target,
            color: "oklch(0.78 0.18 80)",
          },
          {
            label: "Best Trivia",
            value: `${bestTrivia}/10`,
            icon: Star,
            color: "oklch(0.75 0.18 270)",
          },
          {
            label: "Avg Score",
            value: `${avgScore}/10`,
            icon: Trophy,
            color: "oklch(0.78 0.15 30)",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-white/10 bg-white/5">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon
                    className="w-4 h-4"
                    style={{ color: stat.color }}
                  />
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
                <p
                  className="text-2xl font-bold font-heading"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Score History */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Score History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div
              data-ocid="profile.loading_state"
              className="text-center py-12 text-white/40"
            >
              <div className="w-8 h-8 border-2 border-emerald-500/40 border-t-emerald-500 rounded-full animate-spin mx-auto mb-3" />
              Loading your scores...
            </div>
          ) : sorted.length === 0 ? (
            <div data-ocid="profile.empty_state" className="text-center py-12">
              <p className="text-5xl mb-4">🎯</p>
              <p className="text-white/50 text-sm">
                No quiz or trivia sessions yet. Play a round to see your
                history!
              </p>
            </div>
          ) : (
            <ScrollArea className="max-h-[500px]">
              <div className="space-y-3">
                {sorted.map((s, idx) => (
                  <motion.div
                    key={String(s.timestamp) + s.category}
                    data-ocid={`profile.item.${idx + 1}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                        style={{ background: "oklch(0.72 0.2 148 / 0.15)" }}
                      >
                        {s.category === "Quiz" ? "🎯" : "⚡"}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">
                          {s.category}
                        </p>
                        <p className="text-white/40 text-xs">
                          {formatDate(s.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold font-heading ${scoreColor(Number(s.score))}`}
                      >
                        {Number(s.score)}/10
                      </p>
                      <Badge className="text-xs bg-white/10 text-white/60 border-white/10">
                        {scoreBadge(Number(s.score))}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
