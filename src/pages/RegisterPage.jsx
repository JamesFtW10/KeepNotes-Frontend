import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const AddInfo = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
         
      const data = await response.json();
      setUsername('');
      setPassword('');
      if (!response.ok) {
        alert(`Registration failed: ${data.message}`);
        return;
      } } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6efe3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(251,191,36,0.24),_transparent_32%),radial-gradient(circle_at_100%_0%,_rgba(20,184,166,0.18),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.35),_rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-center rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">Welcome back</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Register to your notes workspace.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600">
            Keep your ideas synced in one place. Continue writing, organizing, and reviewing everything you captured.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
              Clean and focused writing flow
            </div>
            <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
              Labels, reminders, archive ready
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>New here?</span>
            <Link
              to="/signIn"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Back to landing
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-900/5 bg-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.24)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Account access</p>
          <h2 className="mt-2 text-2xl font-bold">Register Account</h2>

          <form onSubmit={AddInfo} className="mt-6 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-200">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300/80 outline-none transition focus:border-amber-300 focus:bg-white/15"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300/80 outline-none transition focus:border-amber-300 focus:bg-white/15"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-bold text-slate-900 shadow-[0_12px_30px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              Register
            </button>
          </form>

          <p className="mt-5 text-sm text-slate-300">
            Need an account?{' '}
            <Link to="/signIn" className="font-semibold text-amber-300 hover:text-amber-200">
              Signin Here
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default RegisterPage;