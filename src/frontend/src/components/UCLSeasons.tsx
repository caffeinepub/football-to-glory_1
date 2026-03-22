import { useState } from "react";
import { type UCLMatch, type UCLSeason, uclSeasons } from "../data/uclSeasons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const MatchRow = ({ match, label }: { match: UCLMatch; label?: string }) => (
  <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
    {label && (
      <span className="text-xs text-yellow-400 font-bold w-24 shrink-0">
        {label}
      </span>
    )}
    <div className="flex items-center gap-2 flex-1 justify-end">
      <span className="text-white font-medium text-sm text-right">
        {match.home}
      </span>
      <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded font-mono text-white font-bold text-sm min-w-[60px] justify-center">
        <span>{match.homeScore}</span>
        <span className="text-gray-400">-</span>
        <span>{match.awayScore}</span>
      </div>
      <span className="text-white font-medium text-sm">{match.away}</span>
    </div>
    {match.agg && (
      <span className="text-xs text-gray-400 ml-2">(Agg: {match.agg})</span>
    )}
    {match.date && (
      <span className="text-xs text-gray-500 ml-2">{match.date}</span>
    )}
  </div>
);

const SeasonDetail = ({
  season,
  onBack,
}: { season: UCLSeason; onBack: () => void }) => (
  <div className="text-white">
    <div className="flex items-center gap-4 mb-6">
      <Button
        onClick={onBack}
        variant="outline"
        className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 text-sm"
      >
        ← Back to Seasons
      </Button>
      <div>
        <h2 className="text-2xl font-bold text-yellow-400">
          UCL {season.season}
        </h2>
        <p className="text-gray-400 text-sm">{season.venue}</p>
      </div>
      {season.finalScore === "In Progress" && (
        <Badge className="bg-green-500/20 text-green-400 border-green-500/40 animate-pulse">
          Live Season
        </Badge>
      )}
    </div>

    {season.finalScore !== "In Progress" && (
      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Winner
            </p>
            <p className="text-xl font-bold text-yellow-400">{season.winner}</p>
          </div>
          <div className="text-gray-500">vs</div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Runner-up
            </p>
            <p className="text-xl font-bold text-white">{season.runnerUp}</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg text-center">
            <p className="text-gray-400 text-xs">Final Score</p>
            <p className="text-yellow-400 font-bold text-lg">
              {season.finalScore}
            </p>
          </div>
          {season.topScorer !== "TBD" && (
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                Top Scorer
              </p>
              <p className="text-white font-semibold">
                {season.topScorer}{" "}
                <span className="text-yellow-400">
                  ({season.topScorerGoals} goals)
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    )}

    <ScrollArea className="h-[60vh]">
      <div className="space-y-6 pr-4">
        {season.leaguePhaseMatches && season.leaguePhaseMatches.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              League Phase
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              New format: all 36 teams play 8 matches each in a single league
              table
            </p>
            <div className="space-y-1">
              {season.leaguePhaseMatches.map((m) => (
                <MatchRow key={m.home + m.away + m.date} match={m} />
              ))}
            </div>
          </section>
        )}

        {season.groups.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              Group Stage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {season.groups.map((group) => (
                <div key={group.name} className="bg-gray-800/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">{group.name}</h4>
                    <div className="flex gap-1">
                      {group.standings.slice(0, 2).map((team, i) => (
                        <Badge
                          key={team}
                          className={
                            i === 0
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                              : "bg-gray-600/40 text-gray-300"
                          }
                        >
                          {team.split(" ")[0]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    {group.matches.map((m) => (
                      <MatchRow key={m.home + m.away + group.name} match={m} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {season.knockoutPlayoffs && season.knockoutPlayoffs.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              Knockout Playoffs
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Teams ranked 9-24 compete for 8 spots in the Round of 16
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {season.knockoutPlayoffs.map((m) => (
                <MatchRow key={`${m.home}${m.away}kp`} match={m} />
              ))}
            </div>
          </section>
        )}

        {season.roundOf16.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              Round of 16
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {season.roundOf16.map((m) => (
                <MatchRow key={`${m.home}${m.away}r16`} match={m} />
              ))}
            </div>
          </section>
        )}

        {season.quarterFinals.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              Quarter Finals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {season.quarterFinals.map((m) => (
                <MatchRow key={`${m.home}${m.away}qf`} match={m} />
              ))}
            </div>
          </section>
        )}

        {season.semiFinals.length > 0 && (
          <section>
            <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
              Semi Finals
            </h3>
            <div className="space-y-2">
              {season.semiFinals.map((m) => (
                <MatchRow key={`${m.home}${m.away}sf`} match={m} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-lg font-bold text-yellow-400 mb-3 border-b border-yellow-500/30 pb-2">
            Final
          </h3>
          <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-4">
            {season.final.date && (
              <p className="text-gray-400 text-xs mb-2">{season.final.date}</p>
            )}
            {season.finalScore === "In Progress" ? (
              <div className="text-center py-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-sm">
                  Final not yet played
                </Badge>
                <p className="text-gray-400 text-xs mt-2">
                  Scheduled: {season.final.date}
                </p>
              </div>
            ) : (
              <MatchRow match={season.final} />
            )}
          </div>
        </section>
      </div>
    </ScrollArea>
  </div>
);

export const UCLSeasons = () => {
  const [selected, setSelected] = useState<UCLSeason | null>(null);

  if (selected) {
    return <SeasonDetail season={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
          UCL
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Champions League Seasons
          </h2>
          <p className="text-gray-400 text-sm">
            Click a season to view all matches
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {uclSeasons.map((season) => (
          <button
            type="button"
            key={season.season}
            onClick={() => setSelected(season)}
            className="w-full text-left bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-yellow-500/60 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/40 font-bold">
                {season.season}
              </Badge>
              {season.finalScore === "In Progress" && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs animate-pulse">
                  Live
                </Badge>
              )}
            </div>
            <div className="mb-3">
              <p className="text-xs text-gray-400 mb-1">Winner</p>
              <p className="text-white font-bold text-sm truncate">
                {season.winner === "TBD" ? "In Progress" : season.winner}
              </p>
            </div>
            {season.finalScore !== "In Progress" && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 truncate">
                  {season.runnerUp}
                </span>
                <Badge className="bg-gray-700 text-white text-xs shrink-0 ml-1">
                  {season.finalScore}
                </Badge>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2 truncate">
              {season.venue.split(",")[1]?.trim() || season.venue}
            </p>
            {season.topScorer !== "TBD" && (
              <p className="text-xs text-yellow-400/70 mt-1 truncate">
                ⚽ {season.topScorer} ({season.topScorerGoals})
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UCLSeasons;
