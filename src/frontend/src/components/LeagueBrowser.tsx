import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search, Shield, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LEAGUES, type League, type LeagueClub } from "../data/leagueData";

const confColor: Record<string, string> = {
  UEFA: "bg-blue-500/20 text-blue-400 border-blue-500/40",
  CONMEBOL: "bg-green-500/20 text-green-400 border-green-500/40",
  CAF: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  AFC: "bg-red-500/20 text-red-400 border-red-500/40",
  CONCACAF: "bg-purple-500/20 text-purple-400 border-purple-500/40",
  OFC: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
};

const posColor: Record<string, string> = {
  GK: "bg-yellow-500/20 text-yellow-400",
  DEF: "bg-blue-500/20 text-blue-400",
  MID: "bg-green-500/20 text-green-400",
  FWD: "bg-red-500/20 text-red-400",
};

export default function LeagueBrowser() {
  const [search, setSearch] = useState("");
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedClub, setSelectedClub] = useState<LeagueClub | null>(null);
  const [playerSearch, setPlayerSearch] = useState("");
  const [clubSearch, setClubSearch] = useState("");

  const filteredLeagues = LEAGUES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.country.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredClubs =
    selectedLeague?.clubs.filter((c) =>
      c.name.toLowerCase().includes(clubSearch.toLowerCase()),
    ) ?? [];

  const filteredPlayers =
    selectedClub?.players.filter(
      (p) =>
        p.name.toLowerCase().includes(playerSearch.toLowerCase()) ||
        p.nationality.toLowerCase().includes(playerSearch.toLowerCase()) ||
        p.position.toLowerCase().includes(playerSearch.toLowerCase()),
    ) ?? [];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <AnimatePresence mode="wait">
        {!selectedLeague && (
          <motion.div
            key="leagues"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-yellow-400 flex items-center gap-2 mb-2">
                <Shield className="w-7 h-7" /> League Browser
              </h2>
              <p className="text-gray-400 text-sm">
                {LEAGUES.length} leagues across all confederations
              </p>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search leagues or countries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLeagues.map((league) => (
                <motion.div
                  key={league.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedLeague(league);
                    setClubSearch("");
                  }}
                  className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-yellow-500/50 hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{league.flag}</span>
                    <Badge
                      className={`text-xs border ${confColor[league.confederation] ?? "bg-gray-700"}`}
                    >
                      {league.confederation}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-white text-base leading-tight">
                    {league.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">{league.country}</p>
                  <div className="flex items-center gap-1 mt-3 text-gray-500 text-xs">
                    <Users className="w-3 h-3" />
                    <span>{league.clubs.length} clubs</span>
                    <span className="ml-2 text-gray-600">{league.season}</span>
                  </div>
                </motion.div>
              ))}
              {filteredLeagues.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-12">
                  No leagues found
                </p>
              )}
            </div>
          </motion.div>
        )}

        {selectedLeague && !selectedClub && (
          <motion.div
            key="clubs"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedLeague(null);
                  setSearch("");
                }}
                className="text-gray-400 hover:text-white mb-4 -ml-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> All Leagues
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedLeague.flag}</span>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {selectedLeague.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {selectedLeague.country} · {selectedLeague.season} ·{" "}
                    {selectedLeague.clubs.length} clubs
                  </p>
                </div>
              </div>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search clubs..."
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedClub(club);
                    setPlayerSearch("");
                  }}
                  className="bg-gray-800/80 border border-gray-700 rounded-xl p-5 cursor-pointer hover:border-green-500/50 hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-700/50 overflow-hidden flex-shrink-0">
                      {club.logoUrl ? (
                        <img
                          src={club.logoUrl}
                          alt={club.name}
                          className="w-10 h-10 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <span className="text-2xl">{club.badge}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{club.name}</h3>
                      <p className="text-gray-400 text-xs">{club.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Users className="w-3 h-3" />
                    <span>{club.players.length} players in database</span>
                  </div>
                </motion.div>
              ))}
              {filteredClubs.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-12">
                  No clubs found
                </p>
              )}
            </div>
          </motion.div>
        )}

        {selectedClub && (
          <motion.div
            key="players"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setSelectedClub(null)}
                className="text-gray-400 hover:text-white mb-4 -ml-2"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to{" "}
                {selectedLeague?.name}
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-700/50 overflow-hidden">
                  {selectedClub.logoUrl ? (
                    <img
                      src={selectedClub.logoUrl}
                      alt={selectedClub.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-3xl">{selectedClub.badge}</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    {selectedClub.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {selectedClub.city} · {selectedLeague?.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, nationality, position..."
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPlayers.map((player) => (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-800/80 border border-gray-700 rounded-xl p-4 hover:border-yellow-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={`text-xs ${posColor[player.position] ?? "bg-gray-700"}`}
                    >
                      {player.position}
                    </Badge>
                    <span className="text-gray-400 text-xs">
                      Age {player.age}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-sm leading-tight">
                    {player.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    {player.nationality}
                  </p>
                  <div className="flex gap-3 mt-3 text-xs text-gray-500">
                    <span>📏 {player.heightFt}</span>
                    <span>⚖️ {player.weightKg} kg</span>
                  </div>
                </motion.div>
              ))}
              {filteredPlayers.length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-12">
                  No players found
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
