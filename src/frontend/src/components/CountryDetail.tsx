import type { Country } from "../data/countries";
import { getCountryDetail } from "../data/countryDetails";
import { allPlayers } from "../data/players";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const StatCard = ({
  label,
  value,
}: { label: string; value: string | number }) => (
  <div className="bg-gray-800/80 rounded-xl p-4 text-center">
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

interface CountryDetailModalProps {
  country: Country;
  onClose: () => void;
}

export const CountryDetailModal = ({
  country,
  onClose,
}: CountryDetailModalProps) => {
  const detail = getCountryDetail(country.name);
  const players = allPlayers
    .filter((p) => p.country.toLowerCase() === country.name.toLowerCase())
    .slice(0, 20);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-5xl">{country.flag}</span>
            <div>
              <p className="text-2xl font-bold text-white">{country.name}</p>
              <Badge
                className={`text-xs mt-1 ${confColors[country.confederation] || "bg-gray-700"}`}
              >
                {country.confederation}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        {detail ? (
          <div className="space-y-6">
            {/* Key stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="FIFA Ranking" value={`#${detail.fifaRanking}`} />
              <StatCard
                label="World Cup Titles"
                value={detail.worldCupTitles}
              />
              <StatCard
                label="Continental Titles"
                value={detail.continentalTitles}
              />
              <StatCard
                label="Known Players"
                value={`${allPlayers.filter((p) => p.country === country.name).length}+`}
              />
            </div>

            {/* Tournament bests */}
            <div className="bg-gray-800/50 rounded-xl p-4 space-y-2">
              <h3 className="text-yellow-400 font-bold text-sm mb-3">
                Tournament History
              </h3>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">World Cup Best</span>
                <span className="text-white text-sm font-medium">
                  {detail.worldCupBest}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Continental Best</span>
                <span className="text-white text-sm font-medium">
                  {detail.continentalBest}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Confederation</span>
                <span className="text-white text-sm font-medium">
                  {detail.confederation}
                </span>
              </div>
            </div>

            {/* Top Scorers */}
            <div>
              <h3 className="text-yellow-400 font-bold mb-3">
                All-Time Top Scorers
              </h3>
              <div className="space-y-2">
                {detail.topScorers.map((scorer) => (
                  <div
                    key={scorer.rank}
                    className="flex items-center gap-3 bg-gray-800/40 rounded-lg p-3"
                  >
                    <span className="text-yellow-400 font-bold w-6 text-center text-sm">
                      {scorer.rank}
                    </span>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">
                        {scorer.name}
                      </p>
                      <p className="text-gray-400 text-xs">{scorer.era}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-400 font-bold">
                        {scorer.goals}{" "}
                        <span className="text-xs text-gray-400">goals</span>
                      </p>
                      <p className="text-gray-400 text-xs">
                        {scorer.caps} caps
                      </p>
                    </div>
                    <Badge
                      className={`text-xs ml-2 ${
                        scorer.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-600/40 text-gray-400"
                      }`}
                    >
                      {scorer.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Squad */}
            <div>
              <h3 className="text-yellow-400 font-bold mb-3">Current Squad</h3>
              {(
                [
                  { key: "GK", label: "Goalkeepers", color: "text-yellow-300" },
                  { key: "DEF", label: "Defenders", color: "text-blue-300" },
                  { key: "MID", label: "Midfielders", color: "text-green-300" },
                  { key: "FWD", label: "Forwards", color: "text-red-300" },
                ] as const
              ).map(({ key, label, color }) => {
                const group = detail.squad[key];
                if (!group || group.length === 0) return null;
                return (
                  <div key={key} className="mb-3">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider mb-2 ${color}`}
                    >
                      {label}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {group.map((player) => (
                        <div
                          key={player.name}
                          className="flex items-center justify-between bg-gray-800/40 rounded-lg px-3 py-2"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-white text-sm font-medium">
                                {player.name}
                              </p>
                              {player.position && (
                                <Badge className="text-xs px-1 py-0 bg-indigo-500/20 text-indigo-300 border-indigo-500/40">
                                  {player.position}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-400 text-xs">
                              {player.club}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-300 text-xs">
                              {player.caps} caps
                            </p>
                            <p className="text-gray-500 text-xs">
                              Age {player.age}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legendary Players */}
            {detail.legendaryPlayers.length > 0 && (
              <div>
                <h3 className="text-yellow-400 font-bold mb-3">
                  Legendary Players
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detail.legendaryPlayers.map((legend) => (
                    <Badge
                      key={legend}
                      className="bg-yellow-700/30 text-yellow-300 text-xs"
                    >
                      ⭐ {legend}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* League */}
            {detail.leagues.length > 0 && (
              <div className="bg-gray-800/40 rounded-xl p-3">
                <p className="text-gray-400 text-xs mb-2">Domestic Leagues</p>
                <div className="flex flex-wrap gap-2">
                  {detail.leagues.map((l) => (
                    <Badge
                      key={l}
                      className="bg-blue-700/30 text-blue-300 text-xs"
                    >
                      ⚽ {l}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Fallback for countries without detailed data
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Confederation" value={country.confederation} />
              <StatCard label="Players in DB" value={`${players.length}+`} />
            </div>

            {players.length > 0 && (
              <div>
                <h3 className="text-yellow-400 font-bold mb-3">
                  Known Players
                </h3>
                <div className="space-y-2">
                  {players.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between bg-gray-800/40 rounded-lg px-3 py-2"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">
                          {p.name}
                        </p>
                        <p className="text-gray-400 text-xs">{p.club}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 text-xs">
                          {p.goals}G / {p.assists}A
                        </p>
                        <p className="text-gray-500 text-xs">{p.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {players.length === 0 && (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">{country.flag}</p>
                <p className="text-gray-400 text-sm">
                  Detailed player data for {country.name} coming soon.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {country.confederation} member nation
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={onClose}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryDetailModal;
