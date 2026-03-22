import { useMemo, useState } from "react";
import { allPlayersExtended as allPlayers } from "../data/players";
import type { Player } from "../data/players";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const StatBox = ({
  label,
  value,
}: { label: string; value: string | number }) => (
  <div className="bg-gray-800/80 rounded-lg p-3 text-center">
    <p className="text-2xl font-bold text-yellow-400">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{label}</p>
  </div>
);

const confColors: Record<string, string> = {
  UEFA: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  CONMEBOL: "bg-green-500/20 text-green-400 border-green-500/40",
  CAF: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  AFC: "bg-red-500/20 text-red-400 border-red-500/40",
  CONCACAF: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  OFC: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
};

const posColors: Record<string, string> = {
  GK: "bg-yellow-700/40 text-yellow-300",
  CB: "bg-blue-800/40 text-blue-300",
  LB: "bg-blue-700/40 text-blue-300",
  RB: "bg-blue-700/40 text-blue-300",
  DM: "bg-teal-700/40 text-teal-300",
  CM: "bg-green-700/40 text-green-300",
  CAM: "bg-lime-700/40 text-lime-300",
  LW: "bg-orange-700/40 text-orange-300",
  RW: "bg-orange-700/40 text-orange-300",
  SS: "bg-rose-700/40 text-rose-300",
  ST: "bg-red-700/40 text-red-300",
  Manager: "bg-gray-600/40 text-gray-300",
};

const formDotColor = (r: number) => {
  if (r >= 8) return "bg-green-500";
  if (r >= 6) return "bg-yellow-500";
  if (r >= 4) return "bg-orange-500";
  return "bg-red-500";
};

const PlayerAvatar = ({
  player,
  size = "sm",
}: { player: Player; size?: "sm" | "lg" }) => {
  const [imgError, setImgError] = useState(false);
  const dim = size === "lg" ? "w-16 h-16" : "w-10 h-10";
  const textSize = size === "lg" ? "text-3xl" : "text-lg";
  return (
    <div
      className={`${dim} rounded-full overflow-hidden bg-gray-700 flex-shrink-0 flex items-center justify-center`}
    >
      {player.imageUrl && !imgError ? (
        <img
          src={player.imageUrl}
          alt={player.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={textSize}>{player.flag}</span>
      )}
    </div>
  );
};

const PlayerCard = ({
  player,
  onClick,
}: { player: Player; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-gradient-to-br text-left from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-500/50 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <PlayerAvatar player={player} size="sm" />
        <div>
          <p className="font-bold text-white text-sm leading-tight">
            {player.name}
          </p>
          <p className="text-gray-400 text-xs">{player.country}</p>
        </div>
      </div>
      <Badge
        className={`text-xs ${posColors[player.position] || "bg-gray-700/40 text-gray-300"}`}
      >
        {player.position}
      </Badge>
    </div>
    <p className="text-yellow-400/80 text-xs mb-3 truncate">{player.club}</p>
    <div className="grid grid-cols-3 gap-2 text-center">
      <div>
        <p className="text-yellow-400 font-bold">{player.goals}</p>
        <p className="text-gray-500 text-xs">Goals</p>
      </div>
      <div>
        <p className="text-blue-400 font-bold">{player.assists}</p>
        <p className="text-gray-500 text-xs">Assists</p>
      </div>
      <div>
        <p className="text-green-400 font-bold">{player.matchesPlayed}</p>
        <p className="text-gray-500 text-xs">Matches</p>
      </div>
    </div>
    <div className="flex items-center justify-between mt-3">
      <Badge className={`text-xs ${confColors[player.confederation] || ""}`}>
        {player.confederation}
      </Badge>
      <span className="text-xs text-gray-500">{player.bestFoot} foot</span>
    </div>
  </button>
);

const PlayerModal = ({
  player,
  onClose,
}: { player: Player; onClose: () => void }) => {
  // Simulated advanced stats
  const passAccuracy = 72 + (player.assists % 20);
  const dribbles = Math.round((player.goals % 5) + 1.5 * 10) / 10;
  const tackles = Math.round(((player.matchesPlayed % 5) + 0.8) * 10) / 10;
  const xG = Math.round((player.goals * 0.85 + Math.random() * 10) * 10) / 10;
  const matchRating =
    6.5 + Math.round(((player.goals + player.assists) / 80) * 15) / 10;
  const recentForm = [7.2, 6.8, 7.5, 8.1, 6.9].map(
    (r) => Math.round((r + (Math.random() * 0.6 - 0.3)) * 10) / 10,
  );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <PlayerAvatar player={player} size="lg" />
            <div>
              <p className="text-xl font-bold text-white">{player.name}</p>
              <p className="text-gray-400 text-sm font-normal">
                {player.nationality} · {player.country}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge className={posColors[player.position] || "bg-gray-700/40"}>
              {player.position}
            </Badge>
            <Badge className={confColors[player.confederation] || ""}>
              {player.confederation}
            </Badge>
            <Badge className="bg-gray-700 text-gray-300">
              {player.bestFoot} Foot
            </Badge>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Club</span>
              <span className="text-white font-medium text-sm">
                {player.club}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Age</span>
              <span className="text-white font-medium text-sm">
                {player.age}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Height</span>
              <span className="text-white font-medium text-sm">
                {player.height}
              </span>
            </div>
            {player.weight && (
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Weight</span>
                <span className="text-white font-medium text-sm">
                  {player.weight}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Best Foot</span>
              <span className="text-white font-medium text-sm">
                {player.bestFoot}
              </span>
            </div>
          </div>

          {/* Core stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatBox label="Goals" value={player.goals} />
            <StatBox label="Assists" value={player.assists} />
            <StatBox label="Matches" value={player.matchesPlayed} />
          </div>

          {/* Advanced stats */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Advanced Stats
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Pass Accuracy</p>
                <p className="text-blue-400 font-bold">{passAccuracy}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Dribbles/Game</p>
                <p className="text-emerald-400 font-bold">{dribbles}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Tackles/Game</p>
                <p className="text-orange-400 font-bold">{tackles}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-400 text-xs">Expected Goals (xG)</p>
                <p className="text-purple-400 font-bold">{xG}</p>
              </div>
            </div>
          </div>

          {/* Match Rating */}
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Season Rating</span>
              <span className="text-yellow-400 font-bold text-lg">
                {Math.min(9.9, matchRating).toFixed(1)}/10
              </span>
            </div>
          </div>

          {/* Recent Form */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Recent Form (last 5 matches)
            </p>
            <div className="flex gap-2">
              {recentForm.map((r, i) => (
                <div key={`form-${i}-${r}`} className="flex-1 text-center">
                  <div
                    className={`w-full h-1.5 rounded-full mb-1 ${formDotColor(r)}`}
                  />
                  <p className="text-xs text-gray-400">{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career clubs */}
          {player.trophies && player.trophies.length > 0 && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                Trophies
              </p>
              <div className="flex flex-wrap gap-1">
                {player.trophies.map((t) => (
                  <Badge
                    key={t}
                    className="bg-yellow-700/30 text-yellow-300 text-xs"
                  >
                    🏆 {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PAGE_SIZE = 24;

const CONFEDERATIONS = ["UEFA", "CONMEBOL", "CAF", "AFC", "CONCACAF", "OFC"];
const POSITIONS = [
  "GK",
  "CB",
  "LB",
  "RB",
  "DM",
  "CM",
  "CAM",
  "LW",
  "RW",
  "SS",
  "ST",
];

export const PlayersSection = () => {
  const [search, setSearch] = useState("");
  const [confFilter, setConfFilter] = useState("All");
  const [posFilter, setPosFilter] = useState("All");
  const [countryFilter, _setCountryFilter] = useState("");
  const [selected, setSelected] = useState<Player | null>(null);
  const [page, setPage] = useState(0);
  const [compareA, setCompareA] = useState<Player | null>(null);
  const [compareB, setCompareB] = useState<Player | null>(null);
  const [compareMode, setCompareMode] = useState(false);

  const filtered = useMemo(() => {
    return allPlayers.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.club.toLowerCase().includes(search.toLowerCase()) ||
        p.country.toLowerCase().includes(search.toLowerCase());
      const matchConf = confFilter === "All" || p.confederation === confFilter;
      const matchPos = posFilter === "All" || p.position === posFilter;
      const matchCountry =
        !countryFilter ||
        p.country.toLowerCase().includes(countryFilter.toLowerCase());
      return matchSearch && matchConf && matchPos && matchCountry;
    });
  }, [search, confFilter, posFilter, countryFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleFilter = (fn: (v: string) => void) => (v: string) => {
    fn(v);
    setPage(0);
  };

  const handleCompareSelect = (player: Player) => {
    if (!compareA) {
      setCompareA(player);
    } else if (!compareB && player.id !== compareA.id) {
      setCompareB(player);
    } else {
      setCompareA(player);
      setCompareB(null);
    }
  };

  const clearCompare = () => {
    setCompareA(null);
    setCompareB(null);
  };

  return (
    <div>
      {selected && (
        <PlayerModal player={selected} onClose={() => setSelected(null)} />
      )}

      {/* Compare bar */}
      {compareMode && (
        <div className="mb-4 p-4 bg-blue-900/30 border border-blue-500/30 rounded-xl">
          {compareA && compareB ? (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-blue-300 font-bold">
                  Head-to-Head Comparison
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearCompare}
                  className="border-white/20 text-white text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <p className="font-bold text-white">{compareA.name}</p>
                  <p className="text-gray-400 text-xs">{compareA.club}</p>
                </div>
                <div className="text-center text-gray-400 text-xs">vs</div>
                <div className="text-center">
                  <p className="font-bold text-white">{compareB.name}</p>
                  <p className="text-gray-400 text-xs">{compareB.club}</p>
                </div>
                {[
                  { label: "Goals", a: compareA.goals, b: compareB.goals },
                  {
                    label: "Assists",
                    a: compareA.assists,
                    b: compareB.assists,
                  },
                  {
                    label: "Matches",
                    a: compareA.matchesPlayed,
                    b: compareB.matchesPlayed,
                  },
                ].map((stat) => (
                  <>
                    <div
                      key={`a-${stat.label}`}
                      className={`text-center p-2 rounded ${stat.a >= stat.b ? "bg-green-500/20 text-green-300" : "bg-gray-800/50 text-white"}`}
                    >
                      {stat.a}
                    </div>
                    <div
                      key={`l-${stat.label}`}
                      className="text-center text-gray-400 text-xs flex items-center justify-center"
                    >
                      {stat.label}
                    </div>
                    <div
                      key={`b-${stat.label}`}
                      className={`text-center p-2 rounded ${stat.b > stat.a ? "bg-green-500/20 text-green-300" : "bg-gray-800/50 text-white"}`}
                    >
                      {stat.b}
                    </div>
                  </>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-blue-300 text-sm">
              👆 Select {compareA ? "one more player" : "two players"} to
              compare head-to-head
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          data-ocid="players.search_input"
          placeholder="Search player, club, country..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="bg-gray-800 border-gray-600 text-white"
        />
        <Select value={confFilter} onValueChange={handleFilter(setConfFilter)}>
          <SelectTrigger
            data-ocid="players.confederation.select"
            className="bg-gray-800 border-gray-600 text-white w-full sm:w-44"
          >
            <SelectValue placeholder="Confederation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Confederations</SelectItem>
            {CONFEDERATIONS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={posFilter} onValueChange={handleFilter(setPosFilter)}>
          <SelectTrigger
            data-ocid="players.position.select"
            className="bg-gray-800 border-gray-600 text-white w-full sm:w-36"
          >
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Positions</SelectItem>
            {POSITIONS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          data-ocid="players.compare.toggle"
          variant={compareMode ? "default" : "outline"}
          onClick={() => {
            setCompareMode((m) => !m);
            clearCompare();
          }}
          className={
            compareMode
              ? "bg-blue-600 hover:bg-blue-500"
              : "border-white/20 text-white hover:bg-white/10"
          }
        >
          ⚖️ Compare
        </Button>
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Showing {paginated.length} of {filtered.length} real players
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {paginated.map((player) => (
          <div key={player.id} className={compareMode ? "relative" : ""}>
            {compareMode && (
              <button
                type="button"
                onClick={() => handleCompareSelect(player)}
                className={`absolute top-2 right-2 z-10 w-6 h-6 rounded-full border text-xs ${
                  compareA?.id === player.id || compareB?.id === player.id
                    ? "bg-blue-500 border-blue-400 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-blue-500/50"
                }`}
              >
                +
              </button>
            )}
            <PlayerCard
              player={player}
              onClick={() => !compareMode && setSelected(player)}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3">
          <Button
            data-ocid="players.pagination_prev"
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className="border-gray-600 text-white"
          >
            ← Prev
          </Button>
          <span className="text-gray-400 text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            data-ocid="players.pagination_next"
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            className="border-gray-600 text-white"
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlayersSection;
