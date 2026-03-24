import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const { actor } = useActor();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpLoading, setSignUpLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSignInError("");
    setSignInLoading(true);
    try {
      const result = await actor.loginUser(signInEmail.trim(), signInPassword);
      if (result.__kind__ === "ok") {
        localStorage.setItem("ftg_user_email", signInEmail.trim());
        onLogin(signInEmail.trim());
      } else {
        setSignInError(result.err);
      }
    } catch {
      setSignInError("Something went wrong. Please try again.");
    } finally {
      setSignInLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    if (signUpPassword !== signUpConfirm) {
      setSignUpError("Passwords do not match.");
      return;
    }
    if (signUpPassword.length < 6) {
      setSignUpError("Password must be at least 6 characters.");
      return;
    }
    setSignUpError("");
    setSignUpLoading(true);
    try {
      const result = await actor.registerUser(
        signUpEmail.trim(),
        signUpPassword,
      );
      if (result.__kind__ === "ok") {
        localStorage.setItem("ftg_user_email", signUpEmail.trim());
        onLogin(signUpEmail.trim());
      } else {
        setSignUpError(result.err);
      }
    } catch {
      setSignUpError("Something went wrong. Please try again.");
    } finally {
      setSignUpLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "oklch(0.08 0.02 148)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, oklch(0.18 0.12 148 / 0.4), transparent), radial-gradient(ellipse 50% 60% at 80% 70%, oklch(0.15 0.1 155 / 0.3), transparent)",
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, oklch(0.72 0.2 148) 0px, oklch(0.72 0.2 148) 1px, transparent 1px, transparent 60px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.72 0.2 148 / 0.15)",
              border: "2px solid oklch(0.72 0.2 148 / 0.5)",
              boxShadow: "0 0 40px oklch(0.72 0.2 148 / 0.2)",
            }}
          >
            <Trophy
              className="w-9 h-9"
              style={{ color: "oklch(0.72 0.2 148)" }}
            />
          </div>
          <h1
            className="text-4xl font-bold text-center tracking-tight"
            style={{ color: "oklch(0.92 0.05 148)" }}
          >
            Football{" "}
            <span style={{ color: "oklch(0.72 0.2 148)" }}>to Glory</span>
          </h1>
          <p
            className="text-sm text-center"
            style={{ color: "oklch(0.55 0.07 148)" }}
          >
            Complete world football history 1950–2026
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "oklch(0.11 0.03 148 / 0.95)",
            border: "1px solid oklch(0.72 0.2 148 / 0.2)",
            boxShadow: "0 24px 64px oklch(0 0 0 / 0.5)",
          }}
        >
          <Tabs defaultValue="signin">
            <TabsList
              className="w-full mb-6"
              style={{
                background: "oklch(0.08 0.02 148)",
                border: "1px solid oklch(0.72 0.2 148 / 0.15)",
              }}
            >
              <TabsTrigger
                value="signin"
                className="flex-1 data-[state=active]:text-black font-semibold"
                style={{}}
                data-ocid="login.signin.tab"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 data-[state=active]:text-black font-semibold"
                data-ocid="login.signup.tab"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Email</Label>
                  <Input
                    data-ocid="login.signin_email.input"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-emerald-500/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Password</Label>
                  <Input
                    data-ocid="login.signin_password.input"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-emerald-500/60"
                  />
                </div>
                {signInError && (
                  <p
                    data-ocid="login.signin.error_state"
                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                  >
                    {signInError}
                  </p>
                )}
                <Button
                  data-ocid="login.signin.submit_button"
                  type="submit"
                  disabled={signInLoading || !actor}
                  className="w-full py-5 text-base font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(0.72 0.2 148)",
                    color: "oklch(0.08 0.02 148)",
                    boxShadow: "0 0 24px oklch(0.72 0.2 148 / 0.3)",
                  }}
                >
                  {signInLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing
                      In...
                    </>
                  ) : (
                    "Sign In ⚽"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Email</Label>
                  <Input
                    data-ocid="login.signup_email.input"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-emerald-500/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">Password</Label>
                  <Input
                    data-ocid="login.signup_password.input"
                    type="password"
                    placeholder="Min 6 characters"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-emerald-500/60"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">
                    Confirm Password
                  </Label>
                  <Input
                    data-ocid="login.signup_confirm.input"
                    type="password"
                    placeholder="Repeat password"
                    value={signUpConfirm}
                    onChange={(e) => setSignUpConfirm(e.target.value)}
                    required
                    className="bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-emerald-500/60"
                  />
                </div>
                {signUpError && (
                  <p
                    data-ocid="login.signup.error_state"
                    className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                  >
                    {signUpError}
                  </p>
                )}
                <Button
                  data-ocid="login.signup.submit_button"
                  type="submit"
                  disabled={signUpLoading || !actor}
                  className="w-full py-5 text-base font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "oklch(0.72 0.2 148)",
                    color: "oklch(0.08 0.02 148)",
                    boxShadow: "0 0 24px oklch(0.72 0.2 148 / 0.3)",
                  }}
                >
                  {signUpLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating
                      Account...
                    </>
                  ) : (
                    "Create Account 🏆"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "oklch(0.4 0.04 148)" }}
        >
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline hover:text-white transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
