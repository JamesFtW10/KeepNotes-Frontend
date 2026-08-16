import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  User,
} from "lucide-react";
import { setTokens } from "../shared/auth/auth";

function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
  };

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      const data = await response.json();
      setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
      alert(`Sign-in successful! Welcome, ${data.user.username}.`);
      setUsername("");
      setPassword("");
      navigate("/app");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6efe3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(251,191,36,0.24),_transparent_32%),radial-gradient(circle_at_100%_0%,_rgba(20,184,166,0.18),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.35),_rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex flex-col justify-center rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
            Welcome back
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Sign in to your notes workspace.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600">
            Continue where you left off, keep your notes organized, and get back
            to writing without friction.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              Quick access to your saved notes
            </div>
            <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
              Archive, reminders, and labels in one place
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {[
              "Secure account access",
              "Fast note retrieval",
              "Smooth mobile-friendly layout",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>No account yet?</span>
            <Link
              to="/register"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Create one
            </Link>
            <Link
              to="/"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to landing
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-900/5 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Account access
              </p>
              <h2 className="mt-2 text-2xl font-bold">Sign in</h2>
            </div>
            <div className="rounded-full bg-white/10 p-3 text-amber-300">
              <LockKeyhole className="h-5 w-5" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Username or email
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-300/80 outline-none transition focus:border-amber-300 focus:bg-white/15"
                  placeholder="Enter your username or email"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-11 pr-12 text-sm text-white placeholder:text-slate-300/80 outline-none transition focus:border-amber-300 focus:bg-white/15"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/30 bg-white/10 text-amber-400 focus:ring-amber-300"
                />
                Remember me
              </label>

              <a
                href="mailto:support@keepnotes.local"
                className="font-semibold text-amber-300 hover:text-amber-200"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-900 shadow-[0_12px_30px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SignInPage;
