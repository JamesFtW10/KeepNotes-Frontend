import { Link } from "react-router-dom";

import {
	ArrowRight,
	CheckCircle2,
	Grid2x2,
	LayoutPanelLeft,
	NotebookPen,
	Search,
	Sparkles,
	ShieldCheck,
	Star,
} from "lucide-react";
import NoteKeep from "../../../assets/noteLogo.png";

const highlights = [
	"Quick note capture",
	"Labels and reminders",
	"Archive and trash management",
];

const features = [
	{
		icon: NotebookPen,
		title: "Fast note-taking",
		description: "Write ideas the moment they land, with a clean canvas and zero friction.",
	},
	{
		icon: Search,
		title: "Easy retrieval",
		description: "Find anything later through search-friendly organization and labels.",
	},
	{
		icon: ShieldCheck,
		title: "Safe by design",
		description: "Keep important notes in one place with a simple archive and trash flow.",
	},
	{
		icon: Grid2x2,
		title: "Structured workspace",
		description: "Move between notes, reminders, archive, and labels without breaking focus.",
	},
];

function LandingPageLayout() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-[#f6efe3] text-slate-900">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.24),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.16),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.38),_rgba(255,255,255,0))]" />
			<div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
			<div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

			<div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
				<header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-1 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
					<div className="flex items-center gap-3">
						<img src={NoteKeep} alt="Keep logo" className="h-14 w-14 rounded-2xl object-cover" />
						<div>
							<p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700"> Nota</p>
							<p className="text-sm text-slate-500">A calmer place for your ideas</p>
						</div>
					</div>

					<nav className="hidden items-center gap-6 md:flex">
						<a href="#features" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
							Features
						</a>
						<a href="#workflow" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
							Workflow
						</a>
						<a href="#cta" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
							Get started
						</a>
					</nav>

					<div className="flex items-center gap-2">
						
						<Link
							to="/signIn"
							className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
						>
							Start now
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</header>

				<main className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
					<section className="max-w-2xl">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 shadow-sm">
							<Sparkles className="h-4 w-4" />
							Notes, reminders, and labels in one calm workspace
						</div>

						<h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
							Capture ideas faster, organize them cleaner.
						</h1>

						<p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
							Keep helps you collect thoughts, turn them into notes, and move them through archive,
							reminders, and trash without losing momentum.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								to="/app"
								className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(245,158,11,0.28)] transition hover:-translate-y-0.5 hover:bg-amber-400"
							>
								Open the app
								<ArrowRight className="h-4 w-4" />
							</Link>
							<a
								href="#features"
								className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
							>
								See features
							</a>
						</div>

						<div className="mt-8 flex flex-wrap gap-3">
							{highlights.map((item) => (
								<div
									key={item}
									className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur"
								>
									<CheckCircle2 className="h-4 w-4 text-emerald-500" />
									{item}
								</div>
							))}
						</div>
                            
						<div id="workflow" className="mt-10 grid gap-4 sm:grid-cols-3">
							{[
								["01", "Write quickly"],
								["02", "Tag and sort"],
								["03", "Review later"],
							].map(([step, label]) => (
								<div key={step} className="rounded-3xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
									<p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-700">{step}</p>
									<p className="mt-3 text-sm font-semibold text-slate-800">{label}</p>
								</div>
							))}
						</div>
					</section>

					<section className="relative">
						<div className="absolute inset-x-8 top-8 h-24 rounded-full bg-slate-900/10 blur-2xl" />

						<div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-slate-950 p-5 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
							<div className="flex items-center justify-between border-b border-white/10 pb-4">
								<div>
									<p className="text-xs uppercase tracking-[0.3em] text-amber-300">Dashboard preview</p>
									<h2 className="mt-2 text-2xl font-bold">Your notes, organized</h2>
								</div>
								<div className="rounded-full bg-white/10 p-3 text-amber-300">
									<LayoutPanelLeft className="h-5 w-5" />
								</div>
							</div>

							<div className="mt-5 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
								<div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5 backdrop-blur-sm">
									<div className="flex items-center justify-between text-sm text-slate-300">
										<span>Today</span>
										<span>4 notes</span>
									</div>
									<div className="mt-4 space-y-3">
										<div className="rounded-2xl bg-white/10 p-4">
											<p className="text-sm font-semibold text-white">Launch checklist</p>
											<p className="mt-2 text-sm leading-6 text-slate-300">
												Review hero copy, wire up notes, and prepare the reminder workflow.
											</p>
										</div>
										<div className="rounded-2xl bg-amber-400/15 p-4">
											<p className="text-sm font-semibold text-amber-200">Design idea</p>
											<p className="mt-2 text-sm leading-6 text-slate-300">
												Keep the interface warm, minimal, and easy to scan on small screens.
											</p>
										</div>
									</div>
								</div>

								<div className="grid gap-4">
									<div className="rounded-[1.5rem] border border-white/10 bg-white/8 p-5">
										<p className="text-xs uppercase tracking-[0.3em] text-teal-300">Pinned</p>
										<p className="mt-3 text-lg font-semibold">Capture thoughts before they disappear.</p>
										<p className="mt-2 text-sm leading-6 text-slate-300">
											This layout keeps the call to action visible while still leaving room for the product story.
										</p>
									</div>
									<div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-amber-400/20 to-teal-400/10 p-5">
										<div className="flex items-center gap-2 text-sm font-semibold text-amber-100">
											<Star className="h-4 w-4 text-amber-300" />
											Clean by default
										</div>
										<p className="mt-3 text-sm leading-6 text-slate-200">
											A focused visual hierarchy helps users start writing immediately instead of hunting for controls.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div id="features" className="mt-6 grid gap-4 sm:grid-cols-2">
							{features.map(({ icon: Icon, title, description }) => (
								<article
									key={title}
									className="rounded-[1.5rem] border border-white/70 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur"
								>
									<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-amber-300">
										<Icon className="h-5 w-5" />
									</div>
									<h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
								</article>
							))}
						</div>
					</section>
				</main>

				<section
					id="cta"
					className="mb-6 flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-white/70 bg-white/75 px-6 py-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur sm:flex-row sm:items-center"
				>
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">Ready to begin</p>
						<h2 className="mt-2 text-2xl font-bold text-slate-900">Open the workspace and start writing.</h2>
					</div>
					<Link
						to="/app"
						className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
					>
						Launch app
						<ArrowRight className="h-4 w-4" />
					</Link>
				</section>
			</div>
		</div>
	);
}

export default LandingPageLayout;
