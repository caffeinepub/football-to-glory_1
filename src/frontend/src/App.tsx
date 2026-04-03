import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  BookOpen,
  Globe,
  Home,
  LogOut,
  Map as MapIcon,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CountriesTab from "./components/CountriesTab";
import HomeTab from "./components/HomeTab";
import LeagueBrowser from "./components/LeagueBrowser";
import LiveScores from "./components/LiveScores";
import LoginPage from "./components/LoginPage";
import PlayersSection from "./components/PlayersSection";
import ProfilePage from "./components/ProfilePage";
import QuizPage from "./components/QuizPage";
import RandomTrivia from "./components/RandomTrivia";
import RecordsPage from "./components/RecordsPage";
import UCLSeasons from "./components/UCLSeasons";

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "players", label: "Players", icon: Users },
  { id: "countries", label: "Countries", icon: Globe },
  { id: "ucl", label: "UCL Seasons", icon: Trophy },
  { id: "live", label: "Live Scores", icon: Activity },
  { id: "quiz", label: "Quiz", icon: Star },
  { id: "trivia", label: "Trivia", icon: Zap },
  { id: "records", label: "Fun Records", icon: BookOpen },
  { id: "leagues", label: "Leagues", icon: MapIcon },
  { id: "profile", label: "Profile", icon: Users },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(
    () => {
      const saved = localStorage.getItem("ftg_user_email");
      return saved ? { email: saved } : null;
    },
  );
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeEl = navRef.current?.querySelector(
      `[data-tab="${activeTab}"]`,
    ) as HTMLElement | null;
    activeEl?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeTab]);

  const handleLogin = (email: string) => {
    setCurrentUser({ email });
    localStorage.setItem("ftg_user_email", email);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ftg_user_email");
    setActiveTab("home");
  };

  if (!currentUser) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.09 0.025 148)" }}
    >
      {/* Top Header */}
      <header
        className="sticky top-0 z-40 flex-shrink-0"
        style={{
          background: "oklch(0.11 0.04 148 / 0.96)",
          borderBottom: "1px solid oklch(0.72 0.2 148 / 0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.72 0.2 148 / 0.2)" }}
            >
              <Trophy
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.2 148)" }}
              />
            </div>
            <span
              className="font-heading font-bold text-base hidden sm:block"
              style={{ color: "oklch(0.82 0.1 148)" }}
            >
              Football{" "}
              <span style={{ color: "oklch(0.85 0.18 82)" }}>to Glory</span>
            </span>
          </div>

          {/* Nav Tabs - scrollable */}
          <nav
            ref={navRef}
            className="flex items-center gap-1 overflow-x-auto scroll-hide flex-1 mx-2"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  data-tab={tab.id}
                  data-ocid={`nav.${tab.id}.link`}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: isActive
                      ? "oklch(0.72 0.2 148 / 0.15)"
                      : "transparent",
                    color: isActive
                      ? "oklch(0.72 0.2 148)"
                      : "oklch(0.6 0.04 148)",
                    borderBottom: isActive
                      ? "2px solid oklch(0.72 0.2 148)"
                      : "2px solid transparent",
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:block">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User + Logout */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              className="hidden sm:flex text-xs"
              style={{
                background: "oklch(0.72 0.2 148 / 0.15)",
                color: "oklch(0.72 0.2 148)",
                border: "1px solid oklch(0.72 0.2 148 / 0.3)",
              }}
            >
              {currentUser.email.split("@")[0]}
            </Badge>
            <Button
              data-ocid="nav.logout.button"
              size="sm"
              variant="outline"
              onClick={handleLogout}
              className="text-xs border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 h-7 px-2"
            >
              <LogOut className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "home" && <HomeTab onTabChange={setActiveTab} />}
            {activeTab === "players" && <PlayersSection />}
            {activeTab === "countries" && (
              <CountriesTab userEmail={currentUser.email} />
            )}
            {activeTab === "ucl" && <UCLSeasons />}
            {activeTab === "live" && <LiveScores />}
            {activeTab === "quiz" && <QuizPage userEmail={currentUser.email} />}
            {activeTab === "trivia" && (
              <RandomTrivia userEmail={currentUser.email} />
            )}
            {activeTab === "records" && <RecordsPage />}
            {activeTab === "leagues" && <LeagueBrowser />}
            {activeTab === "profile" && (
              <div>
                <ProfilePage userEmail={currentUser.email} />
                <div className="mt-6 text-center">
                  <Button
                    data-ocid="profile.logout.button"
                    variant="outline"
                    onClick={handleLogout}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs"
        style={{ color: "oklch(0.4 0.04 148)" }}
      >
        © {new Date().getFullYear()} Football to Glory. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="underline hover:text-white transition-colors"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>

      <Toaster />
    </div>
  );
}
