import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Medal } from "lucide-react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";

interface ScoreEntry {
  email: string;
  score: bigint;
  timestamp: bigint;
  category: string;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  userEmail: string;
}

const medalColors = ["text-yellow-400", "text-gray-300", "text-amber-600"];
const medalIcons = ["🥇", "🥈", "🥉"];

export default function LeaderboardModal({
  isOpen,
  onClose,
  category,
  userEmail,
}: LeaderboardModalProps) {
  const { actor } = useActor();
  const [entries, setEntries] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !actor) return;
    setLoading(true);
    actor
      .getTopScores()
      .then((all) => {
        // Filter by category, sort desc, take top 10
        const filtered = all
          .filter((e) => e.category === category)
          .sort((a, b) => (b.score > a.score ? 1 : b.score < a.score ? -1 : 0))
          .slice(0, 10);
        setEntries(filtered);
      })
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [isOpen, actor, category]);

  const emailPrefix = (email: string) => email.split("@")[0];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="leaderboard.modal"
        className="max-w-md border-white/10 text-white"
        style={{ background: "oklch(0.10 0.03 148)" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span style={{ color: "oklch(0.72 0.2 148)" }}>
              🏆 Top 10 Leaderboard
            </span>
          </DialogTitle>
          <p className="text-center text-sm text-white/50 capitalize">
            {category} scores
          </p>
        </DialogHeader>

        {loading ? (
          <div
            data-ocid="leaderboard.loading_state"
            className="flex items-center justify-center py-10 gap-2 text-white/50"
          >
            <Loader2 className="w-5 h-5 animate-spin" /> Loading scores...
          </div>
        ) : entries.length === 0 ? (
          <div
            data-ocid="leaderboard.empty_state"
            className="text-center py-10 text-white/40"
          >
            No scores yet. Be the first! ⚽
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            <div className="space-y-2 pr-2">
              {entries.map((entry, i) => {
                const isCurrentUser =
                  entry.email.toLowerCase() === userEmail.toLowerCase();
                return (
                  <div
                    key={`${entry.email}-${i}`}
                    data-ocid={`leaderboard.item.${i + 1}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isCurrentUser ? "border" : "border border-white/5"
                    }`}
                    style={
                      isCurrentUser
                        ? {
                            background: "oklch(0.72 0.2 148 / 0.12)",
                            borderColor: "oklch(0.72 0.2 148 / 0.4)",
                          }
                        : { background: "oklch(0.13 0.03 148)" }
                    }
                  >
                    <div className="w-8 text-center">
                      {i < 3 ? (
                        <span className="text-lg">{medalIcons[i]}</span>
                      ) : (
                        <span
                          className="text-sm font-bold"
                          style={{ color: "oklch(0.55 0.07 148)" }}
                        >
                          #{i + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-semibold truncate text-sm ${
                          isCurrentUser ? "" : "text-white/80"
                        }`}
                        style={
                          isCurrentUser ? { color: "oklch(0.72 0.2 148)" } : {}
                        }
                      >
                        {emailPrefix(entry.email)}
                        {isCurrentUser && (
                          <span className="ml-1 text-xs opacity-70">(you)</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-lg font-bold"
                        style={i < 3 ? {} : { color: "oklch(0.72 0.2 148)" }}
                      >
                        {i < 3 ? (
                          <span className={medalColors[i]}>
                            {Number(entry.score)}
                          </span>
                        ) : (
                          Number(entry.score)
                        )}
                      </span>
                      <p className="text-xs text-white/30">{category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <button
          type="button"
          data-ocid="leaderboard.close_button"
          onClick={onClose}
          className="w-full mt-2 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "oklch(0.72 0.2 148)",
            color: "oklch(0.08 0.02 148)",
          }}
        >
          <Medal className="w-4 h-4 inline-block mr-1" /> Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
