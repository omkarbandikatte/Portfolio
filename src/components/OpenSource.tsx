"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import {
  GitMerge,
  GitPullRequest,
  GitPullRequestArrow,
  CircleDot,
  CheckCircle2,
  ArrowUpRight,
  Quote,
  Bug,
  Wrench,
  FlaskConical,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

type PRStatus = "merged" | "approved" | "review";

type Contribution = {
  org: string;
  repo: string;
  pr: number;
  issue?: number;
  status: PRStatus;
  lang: "Python" | "Go" | "TypeScript";
  summary: string;
  note?: string;
};

const GH = "https://github.com";

const CONTRIBUTIONS: Contribution[] = [
  { org: "uber", repo: "causalml", pr: 1075, issue: 1074, status: "merged", lang: "Python", summary: "TMLELearner counted other treatment groups as control rows, biasing multi-treatment ATE", note: "Merged 2026-11-27" },
  { org: "microsoft", repo: "kiota-python", pr: 925, issue: 924, status: "merged", lang: "Python", summary: "RequestInformation.url crashed on timedelta path or query parameters", note: "Merged 2026-11-27" },
  { org: "microsoft", repo: "kiota-serialization-json-go", pr: 247, status: "merged", lang: "Go", summary: "WriteTimeValue dropped fractional seconds, so round trips lost precision", note: "Merged 2026-11-27" },
  { org: "microsoft", repo: "kiota-typescript", pr: 2243, status: "merged", lang: "TypeScript", summary: "RedirectHandler treated relative URLs containing :// as absolute", note: "Merged 2026-11-27" },
  { org: "google", repo: "go-github", pr: 4738, issue: 4737, status: "approved", lang: "Go", summary: "Invitation teams URL never decoded because of a wrong JSON tag", note: "Approved, waiting on a 2nd LGTM" },
  { org: "slackapi", repo: "python-slack-sdk", pr: 2082, issue: 2081, status: "approved", lang: "Python", summary: "AuthorizeUrlGenerator didn't URL-encode redirect_uri, state and other query values", note: "Milestone 3.48.1" },
  { org: "slackapi", repo: "bolt-python", pr: 1629, issue: 1628, status: "review", lang: "Python", summary: "Form bodies containing the word \"payload\" were parsed as empty", note: "Milestone \"next\"" },
  { org: "meta", repo: "prophet", pr: 2796, status: "review", lang: "Python", summary: "plot_plotly raised ValueError on every call because of DataFrame truthiness" },
  { org: "py-why", repo: "EconML", pr: 1090, status: "review", lang: "Python", summary: "individualized_policy didn't scale treatment costs for continuous treatments" },
  { org: "Netflix", repo: "metaflow", pr: 3459, issue: 3458, status: "review", lang: "Python", summary: "Card tables added \"...\" to every value in a column with one long value" },
  { org: "google", repo: "adk-js", pr: 1406, issue: 1405, status: "review", lang: "TypeScript", summary: "genaiSchemaToJsonSchema now admits null for nullable schemas" },
  { org: "google", repo: "adk-js", pr: 1409, issue: 1407, status: "review", lang: "TypeScript", summary: "toGeminiSchema kept description and constraints beside an optional anyOf" },
  { org: "google", repo: "adk-js", pr: 1410, issue: 1408, status: "review", lang: "TypeScript", summary: "deleteArtifact no longer deletes artifacts nested under the deleted name" },
];

const ORGS = ["Uber", "Meta", "Google", "Microsoft", "Netflix", "Slack", "py-why", "AWS"];

const ACTIVITY = [
  { date: "11-23", text: "google/adk-js: 3 issues + PRs #1406, #1409, #1410" },
  { date: "11-24", text: "slackapi/python-slack-sdk: issue #2081 + PR #2082" },
  { date: "11-25", text: "slackapi/bolt-python #1629 · uber/causalml issue #1074" },
  { date: "11-26", text: "PRs to Uber, Meta, py-why, Netflix, Microsoft, Google" },
  { date: "11-27", text: "uber/causalml #1075 MERGED · go-github approved", highlight: true },
  { date: "11-27", text: "microsoft kiota-python, kiota-json-go, kiota-typescript MERGED", highlight: true },
];

const STATUS_META: Record<PRStatus, { label: string; className: string; Icon: typeof GitMerge }> = {
  merged: { label: "Merged", className: "oss-status-merged", Icon: GitMerge },
  approved: { label: "Approved", className: "oss-status-approved", Icon: CheckCircle2 },
  review: { label: "In review", className: "oss-status-review", Icon: GitPullRequestArrow },
};

const STAGE_INDEX: Record<PRStatus, number> = { review: 1, approved: 2, merged: 3 };

const FILTERS: { key: "all" | PRStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "merged", label: "Merged" },
  { key: "approved", label: "Approved" },
  { key: "review", label: "In review" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ───────────────────────── PIECES ───────────────────────── */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

type MergedPR = {
  org: string;
  repo: string;
  pr: number;
  issue?: number;
  commit?: string;
  lang: "Python" | "Go" | "TypeScript";
  area: string;
  mergedBy: string;
  quote?: string;
  tag?: string;
  title: string;
  story: React.ReactNode;
  diffHead: string;
  diffTag: string;
  before: string;
  after: string;
  chips: [string, string, string];
};

const MERGED: MergedPR[] = [
  {
    org: "uber",
    repo: "causalml",
    pr: 1075,
    issue: 1074,
    commit: "01f4b60",
    lang: "Python",
    area: "Uber · causal inference",
    mergedBy: "jeongyoonlee",
    quote: "LGTM. Thanks for your contribution!",
    tag: "First upstream merge",
    title: "The treatment groups that leaked into the control",
    story: (
      <>
        <code className="oss-code">TMLELearner.estimate_ate</code> counted the <em>other</em> treatment groups as control
        rows when there were several treatments, biasing the ATE and its confidence interval. A true effect of{" "}
        <span className="text-white">+1</span> came out as <span className="oss-bad">−1.41</span>.
      </>
    ),
    diffHead: "causalml/inference/meta/tmle.py",
    diffTag: "+ regression test",
    before: "control rows = every row that isn't this treatment group",
    after: "control rows = the control group only, per treatment group",
    chips: ["Biased ATE + CI", "Masked per group", "Multi-treatment test"],
  },
  {
    org: "microsoft",
    repo: "kiota-python",
    pr: 925,
    issue: 924,
    lang: "Python",
    area: "Microsoft · API client generator",
    mergedBy: "baywet",
    title: "The timedelta that crashed every URL",
    story: (
      <>
        <code className="oss-code">RequestInformation.url</code> raised{" "}
        <span className="oss-bad">ValueError: Illegal class passed as substitution</span> whenever a path or query
        parameter was a <code className="oss-code">timedelta</code>.
      </>
    ),
    diffHead: "RequestInformation._get_sanitized_value",
    diffTag: "+ 2 tests · 280 pass",
    before: "timedelta → ValueError",
    after: "timedelta → ISO 8601 duration P{d}DT{s}.{us}S",
    chips: ["URL build crash", "ISO 8601 durations", "Matches serializers"],
  },
  {
    org: "microsoft",
    repo: "kiota-serialization-json-go",
    pr: 247,
    lang: "Go",
    area: "Microsoft · JSON serialization",
    mergedBy: "baywet",
    title: "The fractional seconds that went missing",
    story: (
      <>
        <code className="oss-code">WriteTimeValue</code> formatted times with{" "}
        <code className="oss-code">time.RFC3339</code>, which drops fractional seconds, so every serialize and
        deserialize round trip <span className="oss-bad">lost precision</span>.
      </>
    ),
    diffHead: "WriteTimeValue",
    diffTag: "+ round-trip tests",
    before: "time.RFC3339      // 12:00:00Z",
    after: "time.RFC3339Nano  // 12:00:00.123456789Z",
    chips: ["Lost precision", "RFC3339Nano", "Round-trip test"],
  },
  {
    org: "microsoft",
    repo: "kiota-typescript",
    pr: 2243,
    lang: "TypeScript",
    area: "Microsoft · HTTP middleware",
    mergedBy: "baywet",
    title: "The redirect that looked absolute",
    story: (
      <>
        <code className="oss-code">RedirectHandler.isRelativeURL</code> treated any <code className="oss-code">Location</code>{" "}
        containing <code className="oss-code">://</code> as absolute, so{" "}
        <code className="oss-code">/login?returnUrl=https://…</code> wasn&apos;t resolved, the fetch failed and{" "}
        <span className="oss-bad">sensitive headers weren&apos;t scrubbed</span>.
      </>
    ),
    diffHead: "RedirectHandler.isRelativeURL",
    diffTag: "+ 4 tests · 277 pass",
    before: "absolute if the value contains ://",
    after: "absolute only if it starts with a scheme://",
    chips: ["Broken redirects", "Scheme-anchored check", "End-to-end test"],
  },
];

const CHIP_ICONS = [Bug, Wrench, FlaskConical];

/** Animated git graph: a fix branch forks off master, gets commits, and merges back. */
function MergeGraph({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const draw = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration: 1, delay, ease: "easeInOut" as const },
  });
  const pop = (delay: number) => ({
    initial: { scale: 0 },
    animate: inView ? { scale: 1 } : { scale: 0 },
    transition: { type: "spring" as const, stiffness: 260, damping: 16, delay },
  });

  return (
    <svg ref={ref} viewBox="0 0 320 150" className="oss-graph" role="img" aria-label="Fix branch merged into the main branch">
      <motion.path d="M10 105 H310" className="oss-graph-master" {...draw(0)} />
      <motion.path d="M60 105 C90 105 90 45 120 45 H200 C230 45 230 105 260 105" className="oss-graph-branch" {...draw(0.5)} />
      {[30, 60, 170].map((x, i) => (
        <motion.circle key={`m${x}`} cx={x} cy={105} r={5} className="oss-graph-node-master" {...pop(0.2 + i * 0.15)} />
      ))}
      {[125, 160, 195].map((x, i) => (
        <motion.circle key={`b${x}`} cx={x} cy={45} r={5.5} className="oss-graph-node-branch" {...pop(0.9 + i * 0.15)} />
      ))}
      <motion.g {...pop(1.6)} style={{ transformOrigin: "260px 105px" }}>
        <circle cx={260} cy={105} r={16} className="oss-graph-merge-glow" />
        <circle cx={260} cy={105} r={9} className="oss-graph-merge" />
      </motion.g>
      <text x={125} y={28} className="oss-graph-label">repro → test → fix</text>
      <text x={10} y={132} className="oss-graph-label">main</text>
      <text x={236} y={140} className="oss-graph-label oss-graph-label-hot">{label}</text>
    </svg>
  );
}

function LeftPage({ m, index }: { m: MergedPR; index: number }) {
  return (
    <div className="oss-page-content">
      <div className="flex items-center justify-between gap-3">
        <span className="oss-merged-badge">
          <GitMerge className="h-3.5 w-3.5" /> Merged
        </span>
        {m.tag && <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">{m.tag}</span>}
      </div>
      <div className="oss-chapter">
        <span>Chapter {String(index + 1).padStart(2, "0")}</span>
        <h4>{m.title}</h4>
      </div>
      <MergeGraph label={m.commit ?? "merged"} />
      <div className="oss-quote">
        <Quote className="h-4 w-4 shrink-0 text-green-400" />
        <div>
          <p>{m.quote ? <>&ldquo;{m.quote}&rdquo;</> : <>Reviewed and merged upstream.</>}</p>
          <span>
            merged by {m.mergedBy} · {m.org}/{m.repo}
          </span>
        </div>
      </div>
      <span className="oss-folio oss-folio-left">{index * 2 + 1}</span>
    </div>
  );
}

function RightPage({ m, index }: { m: MergedPR; index: number }) {
  const base = `${GH}/${m.org}/${m.repo}`;
  return (
    <div className="oss-page-content">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-400">
        {m.area} · {m.lang}
      </div>
      <h3 className="mt-3 break-words text-3xl font-black tracking-[-0.04em] text-white sm:text-[2.1rem]">
        {m.org}/{m.repo} <span className="text-green-400">#{m.pr}</span>
      </h3>
      <p className="mt-4 text-sm leading-7 text-gray-400">{m.story}</p>

      <div className="oss-diff" aria-label="Summary of the change">
        <div className="oss-diff-head">
          <span>{m.diffHead}</span>
          <span className="text-green-400">{m.diffTag}</span>
        </div>
        <div className="oss-diff-line oss-diff-del">− {m.before}</div>
        <div className="oss-diff-line oss-diff-add">+ {m.after}</div>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
        {m.chips.map((label, i) => {
          const Icon = CHIP_ICONS[i];
          return (
            <div key={label} className="oss-chip">
              <Icon className="h-3.5 w-3.5 shrink-0 text-green-400" />
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`${base}/pull/${m.pr}`} target="_blank" rel="noopener noreferrer" className="project-link project-link-primary">
          <GitPullRequest className="h-4 w-4" /> View PR
        </a>
        {m.issue && (
          <a href={`${base}/issues/${m.issue}`} target="_blank" rel="noopener noreferrer" className="project-link">
            <CircleDot className="h-4 w-4" /> Issue #{m.issue}
          </a>
        )}
        {m.commit && (
          <a href={`${base}/commit/${m.commit}`} target="_blank" rel="noopener noreferrer" className="project-link">
            <ArrowUpRight className="h-4 w-4" /> Commit
          </a>
        )}
      </div>
      <span className="oss-folio oss-folio-right">{index * 2 + 2}</span>
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

type Turn = { from: number; to: number; dir: 1 | -1 };

/** All merged PRs as a book: each PR is a chapter, pages turn in 3D on wide screens. */
function MergedBook() {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const isWide = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  const total = MERGED.length;
  const tocRef = useRef<HTMLDivElement>(null);

  const go = (to: number) => {
    if (turn || to === page || to < 0 || to >= total) return;
    const d: 1 | -1 = to > page ? 1 : -1;
    setDir(d);
    if (!isWide || reduceMotion) {
      setPage(to);
      return;
    }
    setTurn({ from: page, to, dir: d });
  };

  const finishTurn = () => {
    if (!turn) return;
    setPage(turn.to);
    setTurn(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(page + 1);
    if (e.key === "ArrowLeft") go(page - 1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(page + 1);
    else if (info.offset.x > 60) go(page - 1);
  };

  const activeTab = turn ? turn.to : page;
  useEffect(() => {
    const toc = tocRef.current;
    const item = toc?.children[activeTab] as HTMLElement | undefined;
    if (!toc || !item) return;
    toc.scrollTo({ left: item.offsetLeft - (toc.clientWidth - item.clientWidth) / 2, behavior: "smooth" });
  }, [activeTab]);

  const leftIdx = turn ? (turn.dir === 1 ? turn.from : turn.to) : page;
  const rightIdx = turn ? (turn.dir === 1 ? turn.to : turn.from) : page;
  const shown = activeTab;

  return (
    <motion.div variants={fadeUp} className="oss-book-wrap">
      <div className="oss-book-head">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-green-400/80">The merged collection</span>
          <h3 className="oss-book-title">
            {total} pull requests, merged upstream<span className="text-green-400">.</span>
          </h3>
        </div>
        <span className="oss-book-count">
          Chapter {shown + 1} <i>of</i> {total}
        </span>
      </div>

      <motion.div
        className="oss-book"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Merged pull requests. Use the arrow keys to turn pages."
        onKeyDown={onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        dragSnapToOrigin
        onDragEnd={onDragEnd}
      >
        {isWide ? (
          <div className="oss-spread">
            <div className="oss-page oss-page-left">
              <LeftPage m={MERGED[leftIdx]} index={leftIdx} />
            </div>
            <div className="oss-page oss-page-right">
              <RightPage m={MERGED[rightIdx]} index={rightIdx} />
            </div>
            {turn && (
              <motion.div
                className={`oss-leaf ${turn.dir === 1 ? "oss-leaf-right" : "oss-leaf-left"}`}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: turn.dir === 1 ? -180 : 180 }}
                transition={{ duration: 0.95, ease: [0.645, 0.045, 0.355, 1] }}
                onAnimationComplete={finishTurn}
              >
                <div className={`oss-leaf-face oss-page ${turn.dir === 1 ? "oss-page-right" : "oss-page-left"}`}>
                  {turn.dir === 1 ? <RightPage m={MERGED[turn.from]} index={turn.from} /> : <LeftPage m={MERGED[turn.from]} index={turn.from} />}
                </div>
                <div className={`oss-leaf-face oss-leaf-back oss-page ${turn.dir === 1 ? "oss-page-left" : "oss-page-right"}`}>
                  {turn.dir === 1 ? <LeftPage m={MERGED[turn.to]} index={turn.to} /> : <RightPage m={MERGED[turn.to]} index={turn.to} />}
                </div>
              </motion.div>
            )}
            <div className="oss-spine" aria-hidden />
          </div>
        ) : (
          <div className="oss-single">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                className="oss-page oss-page-single"
                initial={reduceMotion ? { opacity: 0 } : { rotateY: dir * 75, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { rotateY: dir * -75, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ transformOrigin: dir === 1 ? "left center" : "right center" }}
              >
                <LeftPage m={MERGED[page]} index={page} />
                <div className="oss-page-divider" />
                <RightPage m={MERGED[page]} index={page} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      <div className="oss-book-nav">
        <button type="button" className="oss-turn" onClick={() => go(page - 1)} disabled={page === 0 || !!turn} aria-label="Previous chapter">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div ref={tocRef} className="oss-toc" role="tablist" aria-label="Chapters">
          {MERGED.map((m, i) => (
            <button
              key={m.repo}
              type="button"
              role="tab"
              aria-selected={shown === i}
              onClick={() => go(i)}
              className={`oss-toc-item ${shown === i ? "oss-toc-active" : ""}`}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {m.repo}
            </button>
          ))}
        </div>
        <button type="button" className="oss-turn" onClick={() => go(page + 1)} disabled={page === total - 1 || !!turn} aria-label="Next chapter">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function StatsRow() {
  const opened = CONTRIBUTIONS.length;
  const merged = CONTRIBUTIONS.filter((c) => c.status === "merged").length;
  const approved = CONTRIBUTIONS.filter((c) => c.status === "approved").length;
  const stats = [
    { value: opened, label: "PRs opened" },
    { value: merged, label: "merged", hot: true },
    { value: approved, label: "approved" },
    { value: ORGS.length, label: "organisations" },
    { value: 10, label: "issues filed" },
  ];
  return (
    <motion.div variants={fadeUp} className="oss-stats">
      {stats.map((s) => (
        <div key={s.label} className={`oss-stat ${s.hot ? "oss-stat-hot" : ""}`}>
          <strong>
            <CountUp to={s.value} />
          </strong>
          <span>{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
}

function OrgMarquee() {
  const row = [...ORGS, ...ORGS];
  return (
    <motion.div variants={fadeUp} className="oss-marquee" aria-label={`Organisations: ${ORGS.join(", ")}`}>
      <div className="oss-marquee-track">
        {row.map((org, i) => (
          <span key={`${org}-${i}`} className="oss-marquee-item" aria-hidden={i >= ORGS.length}>
            <span className="oss-marquee-mono">{org[0]}</span>
            {org}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function PRTracker() {
  const [filter, setFilter] = useState<"all" | PRStatus>("all");
  const visible = CONTRIBUTIONS.filter((c) => filter === "all" || c.status === filter);

  return (
    <motion.div variants={fadeUp} className="oss-tracker">
      <div className="oss-tracker-head">
        <div className="flex items-center gap-2 font-mono text-[11px] text-gray-500">
          <GitPullRequest className="h-4 w-4 text-green-400" /> pull-requests
        </div>
        <div className="oss-filters" role="tablist" aria-label="Filter pull requests">
          {FILTERS.map((f) => {
            const count = f.key === "all" ? CONTRIBUTIONS.length : CONTRIBUTIONS.filter((c) => c.status === f.key).length;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.key)}
                className={`oss-filter ${active ? "oss-filter-active" : ""}`}
              >
                {active && <motion.span layoutId="oss-filter-pill" className="oss-filter-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">
                  {f.label} <em>{count}</em>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul layout className="oss-pr-list">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((c) => {
            const meta = STATUS_META[c.status];
            const stage = STAGE_INDEX[c.status];
            return (
              <motion.li
                key={`${c.org}/${c.repo}#${c.pr}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <a href={`${GH}/${c.org}/${c.repo}/pull/${c.pr}`} target="_blank" rel="noopener noreferrer" className="oss-pr">
                  <span className={`oss-pr-icon ${meta.className}`}>
                    <meta.Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="oss-pr-repo">
                        {c.org}/<b>{c.repo}</b>
                      </span>
                      <span className="font-mono text-[11px] text-gray-500">#{c.pr}</span>
                      <span className={`oss-lang oss-lang-${c.lang.toLowerCase()}`}>{c.lang}</span>
                    </div>
                    <p className="oss-pr-summary">{c.summary}</p>
                  </div>
                  <div className="oss-pr-side">
                    <span className={`oss-pill ${meta.className}`}>{meta.label}</span>
                    <div className="oss-stages" aria-label={`Stage ${stage} of 3`}>
                      {[1, 2, 3].map((s) => (
                        <i key={s} className={s <= stage ? `on ${meta.className}` : ""} />
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="oss-pr-arrow h-4 w-4" />
                </a>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  );
}

function ActivityLog() {
  return (
    <motion.div variants={fadeUp} className="oss-log theme-panel">
      <div className="oss-log-head theme-panel-header">
        <div className="flex gap-1.5">
          <i className="bg-[#ff5f57]" />
          <i className="bg-[#febc2e]" />
          <i className="bg-[#28c840]" />
        </div>
        <span>
          <Terminal className="mr-1.5 inline h-3 w-3" />
          git log --since=2026-11-23
        </span>
      </div>
      <ol className="oss-log-body">
        {ACTIVITY.map((a, i) => (
          <motion.li
            key={`${a.date}-${i}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className={a.highlight ? "oss-log-hot" : ""}
          >
            <span className="oss-log-dot" />
            <span className="oss-log-date">{a.date}</span>
            <span className="oss-log-text">{a.text}</span>
          </motion.li>
        ))}
      </ol>
      <div className="oss-log-foot">
        <span className="oss-cursor">▍</span> reproduce → regression test → fix → upstream
      </div>
    </motion.div>
  );
}

/* ───────────────────────── SECTION BODY ───────────────────────── */

export default function OpenSource() {
  return (
    <div className="space-y-6">
      <MergedBook />
      <StatsRow />
      <OrgMarquee />
      <div className="oss-bottom-grid">
        <PRTracker />
        <ActivityLog />
      </div>
      <motion.a
        variants={fadeUp}
        href={`${GH}/omkarbandikatte`}
        target="_blank"
        rel="noopener noreferrer"
        className="oss-profile-link"
      >
        Follow the rest on GitHub <ArrowUpRight className="h-4 w-4" />
      </motion.a>
    </div>
  );
}
