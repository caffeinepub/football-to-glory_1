import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { type Country, allCountries } from "../data/countries";
import { getCountryDetail } from "../data/countryDetails";
import { allPlayersExtended as allPlayers } from "../data/players";
import { useActor } from "../hooks/useActor";

const CONF_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  UEFA: {
    bg: "oklch(0.25 0.1 230 / 0.3)",
    text: "oklch(0.75 0.12 230)",
    border: "oklch(0.5 0.1 230 / 0.4)",
  },
  CONMEBOL: {
    bg: "oklch(0.22 0.12 148 / 0.3)",
    text: "oklch(0.72 0.18 148)",
    border: "oklch(0.5 0.15 148 / 0.4)",
  },
  CAF: {
    bg: "oklch(0.25 0.12 35 / 0.3)",
    text: "oklch(0.75 0.15 35)",
    border: "oklch(0.55 0.12 35 / 0.4)",
  },
  AFC: {
    bg: "oklch(0.25 0.1 15 / 0.3)",
    text: "oklch(0.75 0.12 15)",
    border: "oklch(0.55 0.1 15 / 0.4)",
  },
  CONCACAF: {
    bg: "oklch(0.22 0.1 280 / 0.3)",
    text: "oklch(0.72 0.12 280)",
    border: "oklch(0.5 0.1 280 / 0.4)",
  },
  OFC: {
    bg: "oklch(0.22 0.1 195 / 0.3)",
    text: "oklch(0.72 0.12 195)",
    border: "oklch(0.5 0.1 195 / 0.4)",
  },
};

const StatBlock = ({
  label,
  value,
}: { label: string; value: string | number }) => (
  <div
    className="rounded-xl p-4 text-center"
    style={{
      background: "oklch(0.15 0.04 148)",
      border: "1px solid oklch(0.25 0.04 148)",
    }}
  >
    <p
      className="text-xl font-bold font-heading"
      style={{ color: "oklch(0.85 0.18 82)" }}
    >
      {value}
    </p>
    <p className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.04 148)" }}>
      {label}
    </p>
  </div>
);

interface CountryDetailPanelProps {
  country: Country;
  onClose: () => void;
}

function CountryDetailPanel({ country, onClose }: CountryDetailPanelProps) {
  const detail = getCountryDetail(country.name);
  const players = allPlayers
    .filter((p) => p.country.toLowerCase() === country.name.toLowerCase())
    .slice(0, 20);
  const colors = CONF_COLORS[country.confederation] || CONF_COLORS.UEFA;

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent
        data-ocid="countries.country.modal"
        className="max-w-2xl max-h-[90vh] text-white border-white/10 p-0"
        style={{ background: "oklch(0.11 0.035 148)" }}
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{country.flag}</span>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white">
                    {country.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {country.confederation}
                    </span>
                    {detail && (
                      <span
                        className="text-xs"
                        style={{ color: "oklch(0.55 0.04 148)" }}
                      >
                        FIFA #{detail.fifaRanking}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                data-ocid="countries.country.close_button"
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {detail ? (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <StatBlock
                    label="FIFA Ranking"
                    value={`#${detail.fifaRanking}`}
                  />
                  <StatBlock
                    label="World Cup Titles"
                    value={detail.worldCupTitles}
                  />
                  <StatBlock
                    label="Continental Titles"
                    value={detail.continentalTitles}
                  />
                  <StatBlock
                    label="Players in DB"
                    value={`${players.length}+`}
                  />
                </div>

                {/* Tournament history */}
                <div
                  className="rounded-xl p-4 space-y-2"
                  style={{
                    background: "oklch(0.14 0.04 148)",
                    border: "1px solid oklch(0.24 0.04 148)",
                  }}
                >
                  <h3
                    className="font-bold text-sm mb-3"
                    style={{ color: "oklch(0.85 0.18 82)" }}
                  >
                    🏆 Tournament History
                  </h3>
                  {[
                    { label: "World Cup Best", value: detail.worldCupBest },
                    {
                      label: "Continental Best",
                      value: detail.continentalBest,
                    },
                    { label: "Confederation", value: detail.confederation },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-1 border-b border-white/5"
                    >
                      <span
                        className="text-sm"
                        style={{ color: "oklch(0.55 0.04 148)" }}
                      >
                        {label}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Top Scorers */}
                {detail.topScorers.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-base text-white mb-3">
                      ⚽ All-Time Top Scorers
                    </h3>
                    <div className="space-y-2">
                      {detail.topScorers.map((scorer) => (
                        <div
                          key={scorer.rank}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                          style={{ background: "oklch(0.15 0.04 148)" }}
                        >
                          <span
                            className="text-sm font-bold w-6 text-center"
                            style={{ color: "oklch(0.85 0.18 82)" }}
                          >
                            {scorer.rank}
                          </span>
                          <div className="flex-1">
                            <p className="text-white font-semibold text-sm">
                              {scorer.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "oklch(0.55 0.04 148)" }}
                            >
                              {scorer.era}
                            </p>
                          </div>
                          <div className="text-right">
                            <p
                              className="font-bold text-sm"
                              style={{ color: "oklch(0.85 0.18 82)" }}
                            >
                              {scorer.goals}g
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "oklch(0.55 0.04 148)" }}
                            >
                              {scorer.caps} caps
                            </p>
                          </div>
                          <Badge
                            className="text-xs"
                            style={{
                              background:
                                scorer.status === "Active"
                                  ? "oklch(0.25 0.12 148 / 0.5)"
                                  : "oklch(0.2 0.02 148)",
                              color:
                                scorer.status === "Active"
                                  ? "oklch(0.72 0.2 148)"
                                  : "oklch(0.5 0.04 148)",
                            }}
                          >
                            {scorer.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Current Squad */}
                <div>
                  <h3 className="font-heading font-bold text-base text-white mb-3">
                    👥 Current Squad
                  </h3>
                  {(
                    [
                      {
                        key: "GK",
                        label: "Goalkeepers",
                        color: "oklch(0.85 0.18 82)",
                      },
                      {
                        key: "DEF",
                        label: "Defenders",
                        color: "oklch(0.72 0.14 230)",
                      },
                      {
                        key: "MID",
                        label: "Midfielders",
                        color: "oklch(0.72 0.2 148)",
                      },
                      {
                        key: "FWD",
                        label: "Forwards",
                        color: "oklch(0.72 0.18 27)",
                      },
                    ] as const
                  ).map(({ key, label, color }) => {
                    const group = detail.squad[key];
                    if (!group || group.length === 0) return null;
                    return (
                      <div key={key} className="mb-4">
                        <p
                          className="text-xs font-bold uppercase tracking-wider mb-2"
                          style={{ color }}
                        >
                          {label}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {group.map((p) => (
                            <div
                              key={p.name}
                              className="flex items-center justify-between rounded-lg px-3 py-2"
                              style={{ background: "oklch(0.15 0.04 148)" }}
                            >
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm font-medium text-white">
                                    {p.name}
                                  </span>
                                  {p.position && (
                                    <span
                                      className="text-xs px-1.5 py-0 rounded font-bold"
                                      style={{
                                        background: "oklch(0.3 0.1 280 / 0.5)",
                                        color: "oklch(0.75 0.12 280)",
                                      }}
                                    >
                                      {p.position}
                                    </span>
                                  )}
                                </div>
                                <p
                                  className="text-xs"
                                  style={{ color: "oklch(0.55 0.04 148)" }}
                                >
                                  {p.club}
                                </p>
                              </div>
                              <div className="text-right">
                                <p
                                  className="text-xs"
                                  style={{ color: "oklch(0.65 0.08 148)" }}
                                >
                                  {p.caps} caps
                                </p>
                                <p
                                  className="text-xs"
                                  style={{ color: "oklch(0.5 0.04 148)" }}
                                >
                                  Age {p.age}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legends */}
                {detail.legendaryPlayers.length > 0 && (
                  <div>
                    <h3 className="font-heading font-bold text-base text-white mb-3">
                      ⭐ Legendary Players
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {detail.legendaryPlayers.map((legend) => (
                        <span
                          key={legend}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: "oklch(0.22 0.08 82 / 0.3)",
                            color: "oklch(0.85 0.15 82)",
                            border: "1px solid oklch(0.4 0.1 82 / 0.3)",
                          }}
                        >
                          ⭐ {legend}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domestic leagues */}
                {detail.leagues.length > 0 && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      background: "oklch(0.14 0.04 148)",
                      border: "1px solid oklch(0.24 0.04 148)",
                    }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "oklch(0.55 0.04 148)" }}
                    >
                      Domestic Leagues
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {detail.leagues.map((l) => (
                        <Badge
                          key={l}
                          className="text-xs"
                          style={{
                            background: "oklch(0.25 0.1 230 / 0.3)",
                            color: "oklch(0.75 0.12 230)",
                          }}
                        >
                          ⚽ {l}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Fallback
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <StatBlock
                    label="Confederation"
                    value={country.confederation}
                  />
                  <StatBlock
                    label="Players in DB"
                    value={`${players.length}+`}
                  />
                </div>
                {players.length > 0 ? (
                  <div>
                    <h3 className="font-bold text-white mb-3">Known Players</h3>
                    <div className="space-y-2">
                      {players.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between rounded-lg px-3 py-2"
                          style={{ background: "oklch(0.15 0.04 148)" }}
                        >
                          <div>
                            <p className="text-sm font-medium text-white">
                              {p.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "oklch(0.55 0.04 148)" }}
                            >
                              {p.club}
                            </p>
                          </div>
                          <Badge className="text-xs">{p.position}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-4xl mb-3">{country.flag}</p>
                    <p
                      className="text-sm"
                      style={{ color: "oklch(0.55 0.04 148)" }}
                    >
                      {country.confederation} member nation
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

const CONFEDERATIONS = [
  "All",
  "UEFA",
  "CONMEBOL",
  "CAF",
  "AFC",
  "CONCACAF",
  "OFC",
];

interface CountriesTabProps {
  userEmail: string;
}

export default function CountriesTab({
  userEmail: _userEmail,
}: CountriesTabProps) {
  const [search, setSearch] = useState("");
  const [selectedConf, setSelectedConf] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { actor } = useActor();

  const filtered = useMemo(() => {
    return allCountries.filter((c) => {
      const matchSearch =
        !search || c.name.toLowerCase().includes(search.toLowerCase());
      const matchConf =
        selectedConf === "All" || c.confederation === selectedConf;
      return matchSearch && matchConf;
    });
  }, [search, selectedConf]);

  const grouped = useMemo(() => {
    const groups: Record<string, Country[]> = {};
    for (const c of filtered) {
      if (!groups[c.confederation]) groups[c.confederation] = [];
      groups[c.confederation].push(c);
    }
    return groups;
  }, [filtered]);

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
    if (actor) {
      actor.trackCountryView(_userEmail, country.name).catch(() => {});
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">
            🌍 All FIFA Nations
          </h2>
          <p className="text-sm mt-1" style={{ color: "oklch(0.55 0.04 148)" }}>
            {allCountries.length} member nations · Click any country for details
          </p>
        </div>
        <Badge
          className="text-sm font-bold"
          style={{
            background: "oklch(0.72 0.2 148 / 0.15)",
            color: "oklch(0.72 0.2 148)",
          }}
        >
          {filtered.length} shown
        </Badge>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "oklch(0.55 0.04 148)" }}
          />
          <Input
            data-ocid="countries.search_input"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-white/15 text-white placeholder:text-white/30"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CONFEDERATIONS.map((conf) => (
            <button
              key={conf}
              type="button"
              data-ocid={`countries.${conf.toLowerCase()}.tab`}
              onClick={() => setSelectedConf(conf)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background:
                  selectedConf === conf
                    ? "oklch(0.72 0.2 148 / 0.2)"
                    : "oklch(0.15 0.03 148)",
                color:
                  selectedConf === conf
                    ? "oklch(0.72 0.2 148)"
                    : "oklch(0.55 0.04 148)",
                border:
                  selectedConf === conf
                    ? "1px solid oklch(0.72 0.2 148 / 0.4)"
                    : "1px solid oklch(0.22 0.03 148)",
              }}
            >
              {conf}
            </button>
          ))}
        </div>
      </div>

      {/* Country Grid */}
      {filtered.length === 0 ? (
        <div data-ocid="countries.empty_state" className="text-center py-16">
          <p className="text-4xl mb-3">🔍</p>
          <p style={{ color: "oklch(0.55 0.04 148)" }}>No countries found</p>
        </div>
      ) : selectedConf !== "All" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((country, i) => (
            <CountryCard
              key={country.code}
              country={country}
              index={i}
              onClick={() => handleCountryClick(country)}
            />
          ))}
        </div>
      ) : (
        Object.entries(grouped).map(([conf, countries]) => (
          <div key={conf} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <h3
                className="font-heading font-bold text-base"
                style={{
                  color: CONF_COLORS[conf]?.text || "oklch(0.72 0.2 148)",
                }}
              >
                {conf}
              </h3>
              <span
                className="text-xs"
                style={{ color: "oklch(0.5 0.04 148)" }}
              >
                ({countries.length} nations)
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {countries.map((country, i) => (
                <CountryCard
                  key={country.code}
                  country={country}
                  index={i}
                  onClick={() => handleCountryClick(country)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedCountry && (
          <CountryDetailPanel
            key={selectedCountry.code}
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CountryCard({
  country,
  index,
  onClick,
}: { country: Country; index: number; onClick: () => void }) {
  const colors = CONF_COLORS[country.confederation] || CONF_COLORS.UEFA;
  return (
    <motion.button
      type="button"
      data-ocid={`countries.item.${(index % 20) + 1}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.02, 0.5) }}
      className="rounded-xl p-3 text-center card-glow transition-all hover:scale-[1.04] active:scale-[0.97] w-full"
      style={{
        background: "oklch(0.13 0.04 148)",
        border: "1px solid oklch(0.22 0.03 148)",
      }}
    >
      <p className="text-3xl mb-1.5">{country.flag}</p>
      <p className="text-white text-xs font-semibold leading-tight">
        {country.name}
      </p>
      <p className="text-xs mt-1" style={{ color: colors.text }}>
        {country.confederation}
      </p>
    </motion.button>
  );
}
