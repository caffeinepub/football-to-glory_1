import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface MatchEvent {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime?: string;
  strLeague: string;
  strLeagueBadge?: string;
  strStatus?: string;
  strProgress?: string;
  intRound?: string;
}

const LEAGUES = [
  { id: "4328", name: "Premier League", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "4335", name: "La Liga", emoji: "🇪🇸" },
  { id: "4332", name: "Bundesliga", emoji: "🇩🇪" },
  { id: "4331", name: "Serie A", emoji: "🇮🇹" },
  { id: "4334", name: "Ligue 1", emoji: "🇫🇷" },
  { id: "4480", name: "UEFA Champions League", emoji: "⭐" },
];

const LEAGUE_EMOJI: Record<string, string> = {
  "Premier League": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "La Liga": "🇪🇸",
  Bundesliga: "🇩🇪",
  "Serie A": "🇮🇹",
  "Ligue 1": "🇫🇷",
  "UEFA Champions League": "⭐",
  Soccer: "⚽",
};

function getLeagueEmoji(leagueName: string): string {
  for (const [key, val] of Object.entries(LEAGUE_EMOJI)) {
    if (leagueName.includes(key)) return val;
  }
  return "⚽";
}

function StatusBadge({
  status,
  isLive,
}: { status?: string; isLive?: boolean }) {
  if (isLive || status === "Match Finished" || status === "FT") {
    if (isLive)
      return (
        <Badge className="bg-green-500/20 text-green-300 border border-green-500/40 text-xs flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </Badge>
      );
    return (
      <Badge className="bg-gray-500/20 text-gray-300 border border-gray-500/40 text-xs">
        FT
      </Badge>
    );
  }
  if (status === "Not Started" || !status) {
    return (
      <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs">
        Upcoming
      </Badge>
    );
  }
  // In-progress with minute
  return (
    <Badge className="bg-green-500/20 text-green-300 border border-green-500/40 text-xs flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      {status}'
    </Badge>
  );
}

function MatchCard({
  match,
  showLeague,
  index,
}: { match: MatchEvent; showLeague?: boolean; index: number }) {
  const hasScore =
    match.intHomeScore !== null &&
    match.intAwayScore !== null &&
    match.intHomeScore !== "" &&
    match.intAwayScore !== "";

  const isLive = !!(
    match.strProgress &&
    match.strProgress !== "FT" &&
    match.strProgress !== "" &&
    !match.strStatus?.includes("Finished")
  );

  return (
    <Card
      data-ocid={`live.item.${index + 1}`}
      className="bg-white/5 border-white/10 hover:bg-white/8 transition-colors"
    >
      <CardContent className="py-3 px-4">
        {showLeague && (
          <p className="text-white/40 text-xs mb-2">
            {getLeagueEmoji(match.strLeague)} {match.strLeague}
          </p>
        )}
        <div className="flex items-center gap-2">
          <div className="flex-1 text-right">
            <p className="text-white text-sm font-semibold truncate">
              {match.strHomeTeam}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 min-w-[72px]">
            {hasScore ? (
              <div
                className="px-3 py-1 rounded-lg text-center"
                style={{ background: "oklch(0.72 0.2 148 / 0.15)" }}
              >
                <span className="text-white font-bold font-mono text-base">
                  {match.intHomeScore} – {match.intAwayScore}
                </span>
              </div>
            ) : (
              <span className="text-white/30 text-sm">vs</span>
            )}
            <StatusBadge
              status={match.strProgress || match.strStatus}
              isLive={isLive}
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold truncate">
              {match.strAwayTeam}
            </p>
          </div>
        </div>
        <p className="text-white/30 text-xs text-center mt-2">
          {match.strTime
            ? `${match.dateEvent} ${match.strTime}`
            : match.dateEvent}
        </p>
      </CardContent>
    </Card>
  );
}

function LeagueGroup({
  leagueName,
  matches,
  startIndex,
}: { leagueName: string; matches: MatchEvent[]; startIndex: number }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 w-full text-left mb-2 group"
      >
        <span className="text-lg">{getLeagueEmoji(leagueName)}</span>
        <span className="text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
          {leagueName}
        </span>
        <span className="text-white/30 text-xs ml-auto">
          {open ? "▲" : "▼"} {matches.length} matches
        </span>
      </button>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {matches.map((m, i) => (
            <MatchCard
              key={m.idEvent || `${leagueName}-${i}`}
              match={m}
              index={startIndex + i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LiveScores() {
  const [liveMatches, setLiveMatches] = useState<MatchEvent[]>([]);
  const [recentByLeague, setRecentByLeague] = useState<
    Record<string, MatchEvent[]>
  >({});
  const [upcomingByLeague, setUpcomingByLeague] = useState<
    Record<string, MatchEvent[]>
  >({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("live");

  const fetchLive = useCallback(async () => {
    setLoading((p) => ({ ...p, live: true }));
    try {
      const res = await fetch(
        "https://www.thesportsdb.com/api/v1/json/3/livescore.php?s=Soccer",
      );
      const data = await res.json();
      setLiveMatches(data.events || []);
      setLastRefresh(new Date());
    } catch {
      // silently fail, show empty state
    } finally {
      setLoading((p) => ({ ...p, live: false }));
    }
  }, []);

  const fetchRecent = useCallback(async () => {
    setLoading((p) => ({ ...p, recent: true }));
    try {
      const results = await Promise.all(
        LEAGUES.map((l) =>
          fetch(
            `https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${l.id}`,
          )
            .then((r) => r.json())
            .then((d) => ({
              name: l.name,
              emoji: l.emoji,
              matches: (d.results || []).slice(0, 10).map((m: MatchEvent) => ({
                ...m,
                strLeague: l.name,
              })),
            }))
            .catch(() => ({ name: l.name, emoji: l.emoji, matches: [] })),
        ),
      );
      const grouped: Record<string, MatchEvent[]> = {};
      for (const r of results) {
        if (r.matches.length > 0) grouped[r.name] = r.matches;
      }
      setRecentByLeague(grouped);
    } catch {
    } finally {
      setLoading((p) => ({ ...p, recent: false }));
    }
  }, []);

  const fetchUpcoming = useCallback(async () => {
    setLoading((p) => ({ ...p, upcoming: true }));
    try {
      const results = await Promise.all(
        LEAGUES.map((l) =>
          fetch(
            `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${l.id}`,
          )
            .then((r) => r.json())
            .then((d) => ({
              name: l.name,
              emoji: l.emoji,
              matches: (d.events || []).slice(0, 10).map((m: MatchEvent) => ({
                ...m,
                strLeague: l.name,
              })),
            }))
            .catch(() => ({ name: l.name, emoji: l.emoji, matches: [] })),
        ),
      );
      const grouped: Record<string, MatchEvent[]> = {};
      for (const r of results) {
        if (r.matches.length > 0) grouped[r.name] = r.matches;
      }
      setUpcomingByLeague(grouped);
    } catch {
    } finally {
      setLoading((p) => ({ ...p, upcoming: false }));
    }
  }, []);

  useEffect(() => {
    fetchLive();
    fetchRecent();
    fetchUpcoming();
  }, [fetchLive, fetchRecent, fetchUpcoming]);

  // Auto-refresh live tab every 60s
  useEffect(() => {
    if (activeTab !== "live") return;
    const interval = setInterval(fetchLive, 60000);
    return () => clearInterval(interval);
  }, [activeTab, fetchLive]);

  const isLiveLoading = loading.live;
  const isRecentLoading = loading.recent;
  const isUpcomingLoading = loading.upcoming;

  const liveCount = liveMatches.length;
  const recentCount = Object.values(recentByLeague).flat().length;
  const upcomingCount = Object.values(upcomingByLeague).flat().length;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-6 h-6" style={{ color: "oklch(0.72 0.2 148)" }} />
            <h2
              className="text-2xl font-bold font-heading"
              style={{ color: "oklch(0.95 0.02 148)" }}
            >
              Live Scores
            </h2>
          </div>
          <p className="text-white/50 text-sm">
            Football scores from top leagues worldwide
          </p>
          {lastRefresh && (
            <p className="text-white/30 text-xs mt-1">
              Live tab refreshes every 60s · Last:{" "}
              {lastRefresh.toLocaleTimeString()}
            </p>
          )}
        </div>
        <Button
          data-ocid="live.refresh.button"
          onClick={() => {
            fetchLive();
            fetchRecent();
            fetchUpcoming();
          }}
          disabled={isLiveLoading}
          variant="outline"
          size="sm"
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLiveLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/5 border border-white/10 mb-6 w-full sm:w-auto">
          <TabsTrigger
            value="live"
            data-ocid="live.tab"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
            Live Now
            {liveCount > 0 && (
              <Badge className="ml-2 bg-green-500/30 text-green-300 text-xs px-1">
                {liveCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            data-ocid="recent.tab"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Recent Results
            {recentCount > 0 && (
              <Badge className="ml-2 bg-white/20 text-white/70 text-xs px-1">
                {recentCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="upcoming"
            data-ocid="upcoming.tab"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300"
          >
            Upcoming
            {upcomingCount > 0 && (
              <Badge className="ml-2 bg-blue-500/30 text-blue-300 text-xs px-1">
                {upcomingCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* LIVE NOW */}
        <TabsContent value="live">
          {isLiveLoading && liveMatches.length === 0 && (
            <div
              data-ocid="live.loading_state"
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}
          {!isLiveLoading && liveMatches.length === 0 && (
            <div data-ocid="live.empty_state" className="text-center py-16">
              <p className="text-5xl mb-3">🏟️</p>
              <p className="text-white/50 text-lg font-semibold">
                No live matches right now
              </p>
              <p className="text-white/30 text-sm mt-2">
                Check back during match times. The page auto-refreshes every 60
                seconds.
              </p>
            </div>
          )}
          {liveMatches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {liveMatches.map((m, i) => (
                <MatchCard
                  key={m.idEvent || `live-${i}`}
                  match={m}
                  showLeague
                  index={i}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* RECENT RESULTS */}
        <TabsContent value="recent">
          {isRecentLoading && Object.keys(recentByLeague).length === 0 && (
            <div data-ocid="recent.loading_state" className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}
          {!isRecentLoading && Object.keys(recentByLeague).length === 0 && (
            <div data-ocid="recent.empty_state" className="text-center py-16">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-white/40">No recent results found.</p>
            </div>
          )}
          {Object.entries(recentByLeague).map(([league, matches], gi) => (
            <LeagueGroup
              key={league}
              leagueName={league}
              matches={matches}
              startIndex={gi * 10}
            />
          ))}
        </TabsContent>

        {/* UPCOMING */}
        <TabsContent value="upcoming">
          {isUpcomingLoading && Object.keys(upcomingByLeague).length === 0 && (
            <div data-ocid="upcoming.loading_state" className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 rounded-xl bg-white/5 animate-pulse"
                />
              ))}
            </div>
          )}
          {!isUpcomingLoading && Object.keys(upcomingByLeague).length === 0 && (
            <div data-ocid="upcoming.empty_state" className="text-center py-16">
              <p className="text-4xl mb-3">📅</p>
              <p className="text-white/40">No upcoming fixtures found.</p>
            </div>
          )}
          {Object.entries(upcomingByLeague).map(([league, matches], gi) => (
            <LeagueGroup
              key={league}
              leagueName={league}
              matches={matches}
              startIndex={gi * 10}
            />
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-8 pt-4 border-t border-white/10 text-center">
        <p className="text-white/25 text-xs">
          Powered by{" "}
          <a
            href="https://www.thesportsdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/60 underline transition-colors"
          >
            TheSportsDB
          </a>
        </p>
      </div>
    </section>
  );
}
