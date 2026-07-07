import { useState, useRef, useEffect } from "react";
import {
  Home, Search, Bookmark, User, Play, Heart, Download, Bell,
  Settings, ChevronRight, ChevronLeft, Star, Clock, Film, Tv,
  LogOut, Share2, ThumbsUp, MessageCircle, Volume2, VolumeX,
  Maximize, SkipBack, SkipForward, Pause, X, Filter, Mic,
  Globe, CheckCircle, Info, Lock, Mail, Camera, Edit, Trash2,
  Plus, RefreshCw, Moon, Sun, Shield, FileText, ArrowLeft,
  MoreHorizontal, PlayCircle, RotateCcw, ChevronDown, Copy,
  TrendingUp, Zap, Award, Eye, Flag, List, WifiOff, Cast,
  Timer, Gauge, Languages, Check, Grid, Repeat, MoreVertical,
  SlidersHorizontal, Phone, AlertCircle, FastForward, Calendar,
  MapPin, Trophy, ChevronUp, Flame
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Screen =
  | "splash" | "login" | "signup" | "forgot-password" | "email-verification"
  | "home" | "search" | "categories" | "watchlist" | "profile"
  | "movie-details" | "player" | "tv-shows" | "tv-show-details"
  | "favorites" | "history" | "downloads" | "notifications"
  | "settings" | "reviews" | "community";

interface Movie {
  id: number; title: string; year: number; rating: number;
  imdb: number; rt: number; tmdb: number; genre: string[];
  runtime: string; description: string; director: string; cast: string[];
  country: string; language: string; budget: string; revenue: string;
  poster: string; backdrop: string; featured?: boolean; progress?: number;
}
interface TVShow {
  id: number; title: string; year: number; rating: number;
  genre: string[]; description: string; seasons: number;
  poster: string; backdrop: string;
}

// ─── Image helper ────────────────────────────────────────────────────────────
const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;

// ─── Movie Data ───────────────────────────────────────────────────────────────
const MOVIES: Movie[] = [
  {
    id: 1, title: "Dune: Part Two", year: 2024, rating: 8.5, imdb: 8.5, rt: 92, tmdb: 8.4,
    genre: ["Sci-Fi", "Adventure", "Drama"], runtime: "2h 46m",
    description: "Paul Atreides unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. He must choose between the love of his life and the fate of the known universe.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh"],
    country: "United States", language: "English", budget: "$190M", revenue: "$714M",
    poster: img("1506905925346-21bda4d32df4", 300, 450),
    backdrop: img("1506905925346-21bda4d32df4", 800, 450),
    featured: true, progress: 0,
  },
  {
    id: 2, title: "Oppenheimer", year: 2023, rating: 8.3, imdb: 8.3, rt: 93, tmdb: 8.1,
    genre: ["Drama", "History", "Thriller"], runtime: "3h 0m",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    country: "United States", language: "English", budget: "$100M", revenue: "$952M",
    poster: img("1526374965328-7f61d4dc18c5", 300, 450),
    backdrop: img("1536440136628-849c177e76a1", 800, 450),
    featured: true, progress: 45,
  },
  {
    id: 3, title: "The Batman", year: 2022, rating: 7.8, imdb: 7.8, rt: 85, tmdb: 7.6,
    genre: ["Action", "Crime", "Drama"], runtime: "2h 56m",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "Colin Farrell"],
    country: "United States", language: "English", budget: "$185M", revenue: "$769M",
    poster: img("1518780664697-55e3ad937233", 300, 450),
    backdrop: img("1518780664697-55e3ad937233", 800, 450),
    featured: true,
  },
  {
    id: 4, title: "Avatar: The Way of Water", year: 2022, rating: 7.6, imdb: 7.6, rt: 76, tmdb: 7.6,
    genre: ["Sci-Fi", "Action", "Adventure"], runtime: "3h 12m",
    description: "Jake Sully lives with his newfound family on Pandora. When an old threat returns, Jake must work with Neytiri and a sea tribe to protect their world.",
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldaña", "Sigourney Weaver", "Stephen Lang", "Kate Winslet"],
    country: "United States", language: "English", budget: "$350M", revenue: "$2.32B",
    poster: img("1419242902214-272b3f66ee7a", 300, 450),
    backdrop: img("1547700055-b61cacebece9", 800, 450),
    featured: true,
  },
  {
    id: 5, title: "Top Gun: Maverick", year: 2022, rating: 8.2, imdb: 8.2, rt: 96, tmdb: 8.0,
    genre: ["Action", "Drama"], runtime: "2h 11m",
    description: "After 30 years, Maverick is still pushing the envelope as a naval aviator, but must confront ghosts of his past when leading TOP GUN graduates on a deadly mission.",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm", "Glen Powell"],
    country: "United States", language: "English", budget: "$170M", revenue: "$1.49B",
    poster: img("1440404653325-ab127d49abc1", 300, 450),
    backdrop: img("1441974231531-c6227db76b6e", 800, 450),
  },
  {
    id: 6, title: "Spider-Man: Across the Spider-Verse", year: 2023, rating: 8.7, imdb: 8.7, rt: 96, tmdb: 8.5,
    genre: ["Animation", "Action", "Sci-Fi"], runtime: "2h 20m",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac", "Jake Johnson", "Issa Rae"],
    country: "United States", language: "English", budget: "$100M", revenue: "$690M",
    poster: img("1509347528160-9a9e33742cdb", 300, 450),
    backdrop: img("1509347528160-9a9e33742cdb", 800, 450),
  },
  {
    id: 7, title: "John Wick: Chapter 4", year: 2023, rating: 7.7, imdb: 7.7, rt: 94, tmdb: 7.8,
    genre: ["Action", "Crime", "Thriller"], runtime: "2h 49m",
    description: "John Wick uncovers a path to defeating the High Table. But before he can earn his freedom, he must face off against a new and powerful enemy.",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård", "Laurence Fishburne", "Shamier Anderson"],
    country: "United States", language: "English", budget: "$100M", revenue: "$440M",
    poster: img("1474552226712-ac0f0961a954", 300, 450),
    backdrop: img("1474552226712-ac0f0961a954", 800, 450),
  },
  {
    id: 8, title: "Guardians of the Galaxy Vol. 3", year: 2023, rating: 7.9, imdb: 7.9, rt: 82, tmdb: 8.0,
    genre: ["Action", "Sci-Fi", "Comedy"], runtime: "2h 30m",
    description: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own on a mission to save Rocket.",
    director: "James Gunn",
    cast: ["Chris Pratt", "Zoe Saldaña", "Bradley Cooper", "Vin Diesel", "Dave Bautista"],
    country: "United States", language: "English", budget: "$250M", revenue: "$845M",
    poster: img("1485846234645-a62644f84728", 300, 450),
    backdrop: img("1485846234645-a62644f84728", 800, 450),
  },
  {
    id: 9, title: "Killers of the Flower Moon", year: 2023, rating: 7.6, imdb: 7.6, rt: 93, tmdb: 7.5,
    genre: ["Crime", "Drama", "History"], runtime: "3h 26m",
    description: "Members of the Osage Nation are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation involving corruption and greed.",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone", "Jesse Plemons"],
    country: "United States", language: "English", budget: "$200M", revenue: "$157M",
    poster: img("1441974231531-c6227db76b6e", 300, 450),
    backdrop: img("1440404653325-ab127d49abc1", 800, 450),
  },
  {
    id: 10, title: "Poor Things", year: 2023, rating: 8.0, imdb: 8.0, rt: 92, tmdb: 7.9,
    genre: ["Drama", "Romance", "Sci-Fi"], runtime: "2h 21m",
    description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant surgeon Dr. Godwin Baxter.",
    director: "Yorgos Lanthimos",
    cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe", "Ramy Youssef", "Christopher Abbott"],
    country: "United Kingdom", language: "English", budget: "$35M", revenue: "$45M",
    poster: img("1486325212027-8081e485255e", 300, 450),
    backdrop: img("1486325212027-8081e485255e", 800, 450),
  },
  {
    id: 11, title: "Mission: Impossible — Dead Reckoning", year: 2023, rating: 7.7, imdb: 7.7, rt: 96, tmdb: 7.8,
    genre: ["Action", "Adventure", "Thriller"], runtime: "2h 43m",
    description: "Ethan Hunt and his IMF team must track down a terrifying new weapon before it falls into the wrong hands. No choice. No compromises.",
    director: "Christopher McQuarrie",
    cast: ["Tom Cruise", "Hayley Atwell", "Ving Rhames", "Simon Pegg", "Rebecca Ferguson"],
    country: "United States", language: "English", budget: "$291M", revenue: "$567M",
    poster: img("1478760329108-5c3ed9d495a0", 300, 450),
    backdrop: img("1547700055-b61cacebece9", 800, 450),
  },
  {
    id: 12, title: "The Zone of Interest", year: 2023, rating: 7.7, imdb: 7.7, rt: 92, tmdb: 7.3,
    genre: ["Drama", "History", "War"], runtime: "1h 45m",
    description: "The commandant of Auschwitz and his wife strive to build a dream life for their family in a house and garden next to the camp.",
    director: "Jonathan Glazer",
    cast: ["Christian Friedel", "Sandra Hüller", "Johann Karthaus", "Luis Noah Witte"],
    country: "United Kingdom", language: "German", budget: "$15M", revenue: "$9M",
    poster: img("1536440136628-849c177e76a1", 300, 450),
    backdrop: img("1526374965328-7f61d4dc18c5", 800, 450),
  },
];

const TV_SHOWS: TVShow[] = [
  {
    id: 101, title: "The Last of Us", year: 2023, rating: 8.8,
    genre: ["Drama", "Action", "Horror"],
    description: "Joel, a hardened survivor, is hired to smuggle Ellie out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey.",
    seasons: 2, poster: img("1536440136628-849c177e76a1", 300, 450),
    backdrop: img("1536440136628-849c177e76a1", 800, 450),
  },
  {
    id: 102, title: "Succession", year: 2018, rating: 9.3,
    genre: ["Drama", "Comedy"],
    description: "The Roy family controls the biggest media company in the world. But the company's future—and family—are about to change forever.",
    seasons: 4, poster: img("1518780664697-55e3ad937233", 300, 450),
    backdrop: img("1518780664697-55e3ad937233", 800, 450),
  },
  {
    id: 103, title: "House of the Dragon", year: 2022, rating: 8.5,
    genre: ["Action", "Fantasy", "Drama"],
    description: "An internal succession war within House Targaryen at the height of its power, 200 years before the events of Game of Thrones.",
    seasons: 2, poster: img("1474552226712-ac0f0961a954", 300, 450),
    backdrop: img("1441974231531-c6227db76b6e", 800, 450),
  },
  {
    id: 104, title: "The Bear", year: 2022, rating: 8.7,
    genre: ["Drama", "Comedy"],
    description: "A young chef from the fine dining world returns to Chicago to run his family's sandwich shop after a sudden tragedy.",
    seasons: 3, poster: img("1506905925346-21bda4d32df4", 300, 450),
    backdrop: img("1506905925346-21bda4d32df4", 800, 450),
  },
];

const GENRES = [
  { name: "Action", color: "#e50914", emoji: "💥" },
  { name: "Adventure", color: "#f59e0b", emoji: "🗺️" },
  { name: "Animation", color: "#10b981", emoji: "🎨" },
  { name: "Comedy", color: "#f5c518", emoji: "😂" },
  { name: "Crime", color: "#6366f1", emoji: "🔍" },
  { name: "Documentary", color: "#0ea5e9", emoji: "📹" },
  { name: "Drama", color: "#8b5cf6", emoji: "🎭" },
  { name: "Family", color: "#ec4899", emoji: "👨‍👩‍👧" },
  { name: "Fantasy", color: "#14b8a6", emoji: "🧙" },
  { name: "Horror", color: "#dc2626", emoji: "👻" },
  { name: "Mystery", color: "#7c3aed", emoji: "🕵️" },
  { name: "Romance", color: "#f43f5e", emoji: "❤️" },
  { name: "Sci-Fi", color: "#3b82f6", emoji: "🚀" },
  { name: "Thriller", color: "#059669", emoji: "😱" },
  { name: "War", color: "#78716c", emoji: "⚔️" },
  { name: "Western", color: "#d97706", emoji: "🤠" },
];

const ACTORS = [
  { name: "Timothée Chalamet", photo: img("1500648767791-00dcc994a43e", 80, 80) },
  { name: "Zendaya", photo: img("1494790108377-be9c29b29330", 80, 80) },
  { name: "Cillian Murphy", photo: img("1507003211169-0a1dd7228f2d", 80, 80) },
  { name: "Emily Blunt", photo: img("1438761681033-6461ffad8d80", 80, 80) },
  { name: "Tom Cruise", photo: img("1472099645785-5658abf4ff4e", 80, 80) },
];

// ─── Primitive Components ─────────────────────────────────────────────────────
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

function RatingBadge({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-semibold",
      size === "sm" ? "text-xs" : "text-sm"
    )} style={{ color: "#f5c518" }}>
      <Star size={size === "sm" ? 10 : 12} fill="#f5c518" />
      {rating.toFixed(1)}
    </span>
  );
}

function GenreBadge({ genre }: { genre: string }) {
  const g = GENRES.find(g => g.name === genre);
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: (g?.color || "#e50914") + "22", color: g?.color || "#e50914", border: `1px solid ${(g?.color || "#e50914")}44` }}
    >
      {genre}
    </span>
  );
}

function ProgressBar({ progress, className }: { progress: number; className?: string }) {
  return (
    <div className={cn("h-1 rounded-full overflow-hidden", className)} style={{ background: "rgba(255,255,255,0.15)" }}>
      <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "#e50914" }} />
    </div>
  );
}

function MovieCard({
  movie, onPress, size = "md"
}: { movie: Movie; onPress: () => void; size?: "sm" | "md" | "lg" }) {
  const widths = { sm: "w-28", md: "w-36", lg: "w-44" };
  const heights = { sm: "h-40", md: "h-52", lg: "h-64" };
  return (
    <button onClick={onPress} className={cn("flex-none rounded-xl overflow-hidden relative group", widths[size])}>
      <div className={cn("relative overflow-hidden rounded-xl", heights[size])} style={{ background: "#0f0f1c" }}>
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
        {movie.progress !== undefined && movie.progress > 0 && (
          <ProgressBar progress={movie.progress} className="absolute bottom-0 left-0 right-0" />
        )}
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2" style={{ fontFamily: "Outfit, sans-serif" }}>{movie.title}</p>
          <RatingBadge rating={movie.rating} />
        </div>
      </div>
    </button>
  );
}

function TVCard({ show, onPress }: { show: TVShow; onPress: () => void }) {
  return (
    <button onClick={onPress} className="flex-none w-36 rounded-xl overflow-hidden relative group">
      <div className="relative h-52 overflow-hidden rounded-xl" style={{ background: "#0f0f1c" }}>
        <img src={show.poster} alt={show.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
        <div className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "#e50914", color: "#fff", fontFamily: "DM Mono, monospace" }}>
          TV
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2" style={{ fontFamily: "Outfit, sans-serif" }}>{show.title}</p>
          <RatingBadge rating={show.rating} />
        </div>
      </div>
    </button>
  );
}

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <h2 className="text-base font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h2>
      {onSeeAll && (
        <button onClick={onSeeAll} className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "#e50914" }}>
          See All <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

function HScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 px-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {children}
    </div>
  );
}

function BackButton({ onPress, light = true }: { onPress: () => void; light?: boolean }) {
  return (
    <button
      onClick={onPress}
      className="w-9 h-9 rounded-full flex items-center justify-center"
      style={{ background: light ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.08)" }}
    >
      <ArrowLeft size={18} className="text-white" />
    </button>
  );
}

function InputField({
  label, type = "text", value, onChange, placeholder, icon
}: {
  label?: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium" style={{ color: "#c0c0d8" }}>{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#7070a0" }}>{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
          style={{
            background: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.08)",
            paddingLeft: icon ? "2.5rem" : undefined,
            fontFamily: "Inter, sans-serif",
          }}
        />
      </div>
    </div>
  );
}

function PrimaryButton({ label, onClick, icon, variant = "primary", size = "md" }: {
  label: string; onClick?: () => void; icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md" | "lg";
}) {
  const bg = variant === "primary" ? "#e50914" : variant === "secondary" ? "#1a1a2e" : "transparent";
  const border = variant === "secondary" ? "1px solid rgba(255,255,255,0.12)" : "none";
  const py = size === "sm" ? "0.5rem" : size === "lg" ? "1rem" : "0.75rem";
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold transition-opacity active:opacity-80"
      style={{ background: bg, border, color: "#fff", padding: `${py} 1rem`, fontFamily: "Outfit, sans-serif", fontSize: size === "sm" ? "0.8rem" : "0.95rem" }}
    >
      {icon}{label}
    </button>
  );
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, []);
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ background: "#08080f" }}>
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e50914, #ff6b35)" }}>
          <Film size={44} className="text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#f5c518" }}>
          <Zap size={12} color="#000" fill="#000" />
        </div>
      </div>
      <h1 className="text-3xl font-black tracking-tight text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>CineVault</h1>
      <p className="text-sm" style={{ color: "#7070a0" }}>Premium Streaming Experience</p>
      <div className="mt-12 flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full animate-pulse" style={{ background: i === 1 ? "#e50914" : "#2a2a4a", animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#08080f" }}>
      <div className="relative h-64 flex-none">
        <img src={img("1536440136628-849c177e76a1", 430, 300)} alt="Cinema" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #08080f 0%, rgba(8,8,15,0.4) 100%)" }} />
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#e50914" }}>
              <Film size={16} className="text-white" />
            </div>
            <span className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>CineVault</span>
          </div>
          <p className="text-sm" style={{ color: "#a0a0c0" }}>Welcome back</p>
        </div>
      </div>
      <div className="flex-1 px-6 pt-6 pb-8 space-y-4">
        <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" icon={<Mail size={16} />} />
        <InputField label="Password" type="password" value={pass} onChange={setPass} placeholder="••••••••" icon={<Lock size={16} />} />
        <div className="text-right">
          <button className="text-sm font-medium" style={{ color: "#e50914" }} onClick={() => navigate("forgot-password")}>Forgot Password?</button>
        </div>
        <PrimaryButton label="Sign In" onClick={() => navigate("home")} size="lg" />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs" style={{ color: "#7070a0" }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Google", icon: "G", color: "#4285F4" },
            { label: "Apple", icon: "", color: "#fff" },
          ].map(s => (
            <button key={s.label} onClick={() => navigate("home")} className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-opacity active:opacity-70" style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
              <span style={{ color: s.color, fontWeight: 800 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
        <PrimaryButton label="Continue as Guest" onClick={() => navigate("home")} variant="ghost" />
        <p className="text-center text-sm" style={{ color: "#7070a0" }}>
          Don&apos;t have an account?{" "}
          <button className="font-semibold" style={{ color: "#e50914" }} onClick={() => navigate("signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
}

// ─── Sign Up Screen ───────────────────────────────────────────────────────────
function SignupScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <BackButton onPress={() => navigate("login")} light={false} />
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Create Account</h1>
      </div>
      <div className="flex-1 px-6 pb-8 space-y-4">
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e", border: "2px dashed rgba(255,255,255,0.15)" }}>
            <Camera size={28} style={{ color: "#7070a0" }} />
          </div>
          <span className="text-sm" style={{ color: "#7070a0" }}>Add Profile Photo</span>
        </div>
        <InputField label="Full Name" value={name} onChange={setName} placeholder="John Doe" icon={<User size={16} />} />
        <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="your@email.com" icon={<Mail size={16} />} />
        <InputField label="Phone (Optional)" type="tel" value="" onChange={() => {}} placeholder="+1 (555) 000-0000" icon={<Phone size={16} />} />
        <InputField label="Password" type="password" value={pass} onChange={setPass} placeholder="Min. 8 characters" icon={<Lock size={16} />} />
        <InputField label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" icon={<Lock size={16} />} />
        <div className="flex items-start gap-2 pt-2">
          <div className="w-5 h-5 rounded flex-none flex items-center justify-center mt-0.5" style={{ background: "#e50914" }}>
            <Check size={12} className="text-white" />
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "#7070a0" }}>
            I agree to the <span style={{ color: "#e50914" }}>Terms of Service</span> and <span style={{ color: "#e50914" }}>Privacy Policy</span>
          </p>
        </div>
        <PrimaryButton label="Create Account" onClick={() => navigate("email-verification")} size="lg" />
        <p className="text-center text-sm" style={{ color: "#7070a0" }}>
          Already have an account?{" "}
          <button className="font-semibold" style={{ color: "#e50914" }} onClick={() => navigate("login")}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

// ─── Forgot Password Screen ───────────────────────────────────────────────────
function ForgotPasswordScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <BackButton onPress={() => navigate("login")} light={false} />
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Reset Password</h1>
      </div>
      <div className="flex-1 px-6 space-y-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto" style={{ background: "#1a1a2e" }}>
          <Lock size={36} style={{ color: "#e50914" }} />
        </div>
        {!sent ? (
          <>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Forgot your password?</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#7070a0" }}>Enter your email address and we&apos;ll send you a link to reset your password.</p>
            </div>
            <InputField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="your@email.com" icon={<Mail size={16} />} />
            <PrimaryButton label="Send Reset Link" onClick={() => setSent(true)} size="lg" />
          </>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle size={48} className="mx-auto" style={{ color: "#10b981" }} />
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Email Sent!</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#7070a0" }}>Check your inbox at <strong className="text-white">{email || "your email"}</strong>. The link expires in 24 hours.</p>
            <PrimaryButton label="Back to Login" onClick={() => navigate("login")} variant="secondary" />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Email Verification Screen ────────────────────────────────────────────────
function EmailVerificationScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const handleChange = (i: number, v: string) => {
    const next = [...code]; next[i] = v.slice(-1); setCode(next);
    if (v && i < 5) refs[i + 1].current?.focus();
  };
  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <BackButton onPress={() => navigate("signup")} light={false} />
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Verify Email</h1>
      </div>
      <div className="flex-1 px-6 space-y-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto" style={{ background: "#1a1a2e" }}>
          <Mail size={36} style={{ color: "#e50914" }} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Check your email</h2>
          <p className="text-sm" style={{ color: "#7070a0" }}>We sent a 6-digit code to <strong className="text-white">jo***@email.com</strong></p>
        </div>
        <div className="flex gap-2 justify-center">
          {code.map((c, i) => (
            <input
              key={i}
              ref={refs[i]}
              value={c}
              onChange={e => handleChange(i, e.target.value)}
              maxLength={1}
              className="w-11 h-14 rounded-xl text-center text-xl font-bold text-white outline-none"
              style={{ background: "#1a1a2e", border: c ? "2px solid #e50914" : "1px solid rgba(255,255,255,0.1)", fontFamily: "DM Mono, monospace" }}
            />
          ))}
        </div>
        <PrimaryButton label="Verify Email" onClick={() => navigate("home")} size="lg" />
        <p className="text-center text-sm" style={{ color: "#7070a0" }}>
          Didn&apos;t receive it?{" "}
          <button className="font-semibold" style={{ color: "#e50914" }}>Resend Code</button>
        </p>
      </div>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ navigate, setSelectedMovie, watchlist, toggleWatchlist }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
  watchlist: number[];
  toggleWatchlist: (id: number) => void;
}) {
  const [slideIdx, setSlideIdx] = useState(0);
  const featured = MOVIES.filter(m => m.featured);
  const trending = MOVIES.slice(0, 8);
  const continueWatching = MOVIES.filter(m => m.progress && m.progress > 0);
  const topRated = [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const openMovie = (m: Movie) => { setSelectedMovie(m); navigate("movie-details"); };

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20" style={{ background: "#08080f", scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div>
          <p className="text-xs" style={{ color: "#7070a0", fontFamily: "Inter, sans-serif" }}>Good Evening,</p>
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Alex Johnson 👋</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate("notifications")} className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e" }}>
            <Bell size={18} className="text-white" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#e50914" }} />
          </button>
          <button onClick={() => navigate("search")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e" }}>
            <Search size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Hero Slider */}
      <div className="relative mx-4 mb-6 rounded-2xl overflow-hidden" style={{ height: 220 }}>
        <img src={featured[slideIdx]?.backdrop} alt={featured[slideIdx]?.title} className="w-full h-full object-cover transition-all duration-500" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(8,8,15,0.95) 0%, transparent 60%)" }} />
        <div className="absolute top-3 right-3 flex gap-1">
          {featured.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} className="h-1 rounded-full transition-all" style={{ width: i === slideIdx ? "20px" : "6px", background: i === slideIdx ? "#e50914" : "rgba(255,255,255,0.4)" }} />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-16">
          <div className="flex gap-1 mb-1.5">
            {featured[slideIdx]?.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
          </div>
          <h2 className="text-lg font-black text-white leading-tight mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{featured[slideIdx]?.title}</h2>
          <div className="flex items-center gap-2">
            <RatingBadge rating={featured[slideIdx]?.imdb || 0} size="md" />
            <span className="text-xs" style={{ color: "#7070a0" }}>{featured[slideIdx]?.year} · {featured[slideIdx]?.runtime}</span>
          </div>
        </div>
        <button onClick={() => openMovie(featured[slideIdx])} className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#e50914" }}>
          <Play size={18} fill="white" className="text-white ml-0.5" />
        </button>
        <button onClick={() => setSlideIdx(i => (i + 1) % featured.length)} className="absolute top-1/2 right-3 -translate-y-1/2 opacity-0" />
      </div>

      {/* Movie of the Day */}
      <div className="mx-4 mb-6 rounded-2xl p-4 flex gap-4" style={{ background: "linear-gradient(135deg, #1a0a0c, #2a0a0f)", border: "1px solid rgba(229,9,20,0.2)" }}>
        <img src={MOVIES[0].poster} alt={MOVIES[0].title} className="w-16 h-24 rounded-xl object-cover flex-none" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <Trophy size={12} style={{ color: "#f5c518" }} />
            <span className="text-xs font-bold" style={{ color: "#f5c518", fontFamily: "DM Mono, monospace" }}>MOVIE OF THE DAY</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{MOVIES[0].title}</h3>
          <RatingBadge rating={MOVIES[0].imdb} size="md" />
          <p className="text-xs mt-1 line-clamp-2" style={{ color: "#7070a0" }}>{MOVIES[0].description}</p>
        </div>
        <button onClick={() => openMovie(MOVIES[0])} className="self-end px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#e50914", color: "#fff" }}>Watch</button>
      </div>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <div className="mb-6">
          <SectionHeader title="Continue Watching" />
          <HScrollRow>
            {continueWatching.map(m => (
              <div key={m.id} className="flex-none w-56">
                <button onClick={() => { setSelectedMovie(m); navigate("player"); }} className="relative w-full h-32 rounded-xl overflow-hidden block">
                  <img src={m.backdrop} alt={m.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(229,9,20,0.9)" }}>
                      <Play size={16} fill="white" className="text-white ml-0.5" />
                    </div>
                  </div>
                  <ProgressBar progress={m.progress!} className="absolute bottom-0 left-0 right-0" />
                </button>
                <p className="text-xs font-semibold text-white mt-1.5 px-1">{m.title}</p>
                <p className="text-xs px-1" style={{ color: "#7070a0" }}>{m.progress}% watched</p>
              </div>
            ))}
          </HScrollRow>
        </div>
      )}

      {/* Trending */}
      <div className="mb-6">
        <SectionHeader title="🔥 Trending Now" onSeeAll={() => {}} />
        <HScrollRow>{trending.map(m => <MovieCard key={m.id} movie={m} onPress={() => openMovie(m)} />)}</HScrollRow>
      </div>

      {/* Top Rated */}
      <div className="mb-6">
        <SectionHeader title="⭐ Top Rated" onSeeAll={() => {}} />
        <HScrollRow>{topRated.map(m => <MovieCard key={m.id} movie={m} onPress={() => openMovie(m)} size="sm" />)}</HScrollRow>
      </div>

      {/* TV Shows */}
      <div className="mb-6">
        <SectionHeader title="TV Shows" onSeeAll={() => navigate("tv-shows")} />
        <HScrollRow>{TV_SHOWS.map(s => <TVCard key={s.id} show={s} onPress={() => navigate("tv-shows")} />)}</HScrollRow>
      </div>

      {/* Genres */}
      <div className="mb-6">
        <SectionHeader title="Browse Genres" onSeeAll={() => navigate("categories")} />
        <div className="flex flex-wrap gap-2 px-4">
          {GENRES.slice(0, 8).map(g => (
            <button key={g.name} onClick={() => navigate("categories")} className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style={{ background: g.color + "22", color: g.color, border: `1px solid ${g.color}44` }}>
              <span>{g.emoji}</span> {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended */}
      <div className="mb-6">
        <SectionHeader title="🎯 Recommended For You" onSeeAll={() => {}} />
        <div className="px-4 space-y-3">
          {MOVIES.slice(4, 7).map(m => (
            <button key={m.id} onClick={() => openMovie(m)} className="flex gap-3 w-full">
              <img src={m.poster} alt={m.title} className="w-16 h-22 rounded-xl object-cover flex-none" style={{ height: 88 }} />
              <div className="flex-1 text-left">
                <h3 className="text-sm font-semibold text-white mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{m.title}</h3>
                <div className="flex items-center gap-2 mb-1">
                  <RatingBadge rating={m.rating} />
                  <span className="text-xs" style={{ color: "#7070a0" }}>{m.year} · {m.runtime}</span>
                </div>
                <div className="flex gap-1">
                  {m.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: "#7070a0", flexShrink: 0, alignSelf: "center" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Search Screen ────────────────────────────────────────────────────────────
function SearchScreen({ navigate, setSelectedMovie }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Movies", "TV Shows", "Genre", "Year", "Actor"];
  const results = MOVIES.filter(m =>
    m.title.toLowerCase().includes(query.toLowerCase()) ||
    m.cast.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
    m.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
  );
  const recent = ["Inception", "The Dark Knight", "Interstellar", "Tenet"];

  const openMovie = (m: Movie) => { setSelectedMovie(m); navigate("movie-details"); };

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Search</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#7070a0" }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Movies, shows, actors..."
            className="w-full rounded-xl pl-10 pr-10 py-3 text-sm text-white outline-none"
            style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "Inter, sans-serif" }}
          />
          {query ? (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={16} style={{ color: "#7070a0" }} /></button>
          ) : (
            <button className="absolute right-3 top-1/2 -translate-y-1/2"><Mic size={16} style={{ color: "#7070a0" }} /></button>
          )}
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold transition-colors" style={{
              background: activeFilter === f ? "#e50914" : "#1a1a2e",
              color: activeFilter === f ? "#fff" : "#7070a0",
            }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {!query ? (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Recent Searches</h2>
                <button className="text-xs" style={{ color: "#e50914" }}>Clear All</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.map(r => (
                  <button key={r} onClick={() => setQuery(r)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs" style={{ background: "#1a1a2e", color: "#c0c0d8" }}>
                    <Clock size={10} />{r}
                    <X size={10} style={{ color: "#7070a0" }} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Browse by Genre</h2>
              <div className="grid grid-cols-2 gap-2">
                {GENRES.slice(0, 6).map(g => (
                  <button key={g.name} className="flex items-center gap-2 p-3 rounded-xl text-left" style={{ background: g.color + "15", border: `1px solid ${g.color}33` }}>
                    <span className="text-xl">{g.emoji}</span>
                    <span className="text-sm font-semibold" style={{ color: g.color }}>{g.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Trending Searches</h2>
              <div className="space-y-2">
                {["Dune 2", "Oppenheimer", "Spider-Man", "The Bear"].map((t, i) => (
                  <button key={t} onClick={() => setQuery(t)} className="flex items-center gap-3 w-full p-2 rounded-xl" style={{ background: "#0f0f1c" }}>
                    <span className="text-sm font-bold" style={{ color: "#e50914", fontFamily: "DM Mono, monospace", minWidth: "1.2rem" }}>{i + 1}</span>
                    <TrendingUp size={14} style={{ color: "#7070a0" }} />
                    <span className="text-sm font-medium text-white flex-1 text-left">{t}</span>
                    <ChevronRight size={14} style={{ color: "#7070a0" }} />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xs mb-3" style={{ color: "#7070a0" }}>{results.length} results for &quot;{query}&quot;</p>
            {results.length === 0 ? (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto mb-3" style={{ color: "#2a2a4a" }} />
                <p className="text-white font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>No results found</p>
                <p className="text-sm" style={{ color: "#7070a0" }}>Try different keywords</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map(m => (
                  <button key={m.id} onClick={() => openMovie(m)} className="flex gap-3 w-full">
                    <img src={m.poster} alt={m.title} className="w-16 rounded-xl object-cover flex-none" style={{ height: 88 }} />
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-semibold text-white mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{m.title}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <RatingBadge rating={m.rating} />
                        <span className="text-xs" style={{ color: "#7070a0" }}>{m.year}</span>
                      </div>
                      <div className="flex gap-1">{m.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Categories Screen ────────────────────────────────────────────────────────
function CategoriesScreen({ navigate, setSelectedMovie }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = selected ? MOVIES.filter(m => m.genre.includes(selected)) : MOVIES;

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Categories</h1>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          <button onClick={() => setSelected(null)} className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: !selected ? "#e50914" : "#1a1a2e", color: "#fff" }}>All</button>
          {GENRES.map(g => (
            <button key={g.name} onClick={() => setSelected(selected === g.name ? null : g.name)} className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1" style={{
              background: selected === g.name ? g.color : g.color + "15",
              color: selected === g.name ? "#fff" : g.color,
              border: `1px solid ${g.color}44`,
            }}>
              {g.emoji} {g.name}
            </button>
          ))}
        </div>
      </div>
      {!selected && (
        <div className="px-4 mb-4">
          <div className="grid grid-cols-2 gap-2">
            {GENRES.map(g => (
              <button key={g.name} onClick={() => setSelected(g.name)} className="relative h-20 rounded-xl overflow-hidden flex items-center justify-center" style={{ background: g.color + "22", border: `1px solid ${g.color}33` }}>
                <div className="text-center">
                  <div className="text-2xl mb-1">{g.emoji}</div>
                  <span className="text-sm font-bold" style={{ color: g.color }}>{g.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {selected && (
        <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
          <p className="text-xs mb-3" style={{ color: "#7070a0" }}>{filtered.length} titles in {selected}</p>
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(m => (
              <button key={m.id} onClick={() => { setSelectedMovie(m); navigate("movie-details"); }} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
                <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 50%)" }} />
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="text-white text-xs font-semibold line-clamp-1">{m.title}</p>
                  <RatingBadge rating={m.rating} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Movie Details Screen ─────────────────────────────────────────────────────
function MovieDetailsScreen({ movie, navigate, watchlist, toggleWatchlist, favorites, toggleFavorite }: {
  movie: Movie; navigate: (s: Screen) => void;
  watchlist: number[]; toggleWatchlist: (id: number) => void;
  favorites: number[]; toggleFavorite: (id: number) => void;
}) {
  const [showFull, setShowFull] = useState(false);
  const inWatchlist = watchlist.includes(movie.id);
  const isFav = favorites.includes(movie.id);

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#08080f", scrollbarWidth: "none" }}>
      {/* Backdrop */}
      <div className="relative" style={{ height: 280 }}>
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #08080f 5%, rgba(8,8,15,0.3) 60%)" }} />
        <div className="absolute top-12 left-4 right-4 flex items-center justify-between">
          <BackButton onPress={() => navigate("home")} />
          <div className="flex gap-2">
            <button onClick={() => toggleFavorite(movie.id)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
              <Heart size={18} fill={isFav ? "#e50914" : "none"} color={isFav ? "#e50914" : "#fff"} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
              <Share2 size={18} className="text-white" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
              <Download size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8">
        {/* Title area */}
        <div className="flex gap-4 mb-4">
          <img src={movie.poster} alt={movie.title} className="w-24 rounded-xl object-cover shadow-2xl flex-none" style={{ height: 136, marginTop: -40 }} />
          <div className="flex-1 pt-2">
            <h1 className="text-xl font-black text-white leading-tight mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{movie.title}</h1>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs" style={{ color: "#7070a0" }}>{movie.year}</span>
              <span style={{ color: "#2a2a4a" }}>·</span>
              <span className="text-xs" style={{ color: "#7070a0" }}>{movie.runtime}</span>
              <span style={{ color: "#2a2a4a" }}>·</span>
              <Globe size={10} style={{ color: "#7070a0" }} />
              <span className="text-xs" style={{ color: "#7070a0" }}>{movie.language}</span>
            </div>
            <div className="flex flex-wrap gap-1">{movie.genre.map(g => <GenreBadge key={g} genre={g} />)}</div>
          </div>
        </div>

        {/* Ratings */}
        <div className="flex gap-2 mb-5">
          {[
            { label: "IMDb", value: movie.imdb, color: "#f5c518" },
            { label: "RT", value: `${movie.rt}%`, color: "#fa320a" },
            { label: "TMDB", value: movie.tmdb, color: "#01b4e4" },
          ].map(r => (
            <div key={r.label} className="flex-1 rounded-xl p-3 text-center" style={{ background: "#0f0f1c", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs mb-0.5" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>{r.label}</p>
              <p className="font-black text-sm" style={{ color: r.color, fontFamily: "Outfit, sans-serif" }}>{r.value}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mb-5">
          <button onClick={() => navigate("player")} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white" style={{ background: "#e50914", fontFamily: "Outfit, sans-serif" }}>
            <Play size={16} fill="white" /> Watch Now
          </button>
          <button onClick={() => toggleWatchlist(movie.id)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold" style={{ background: "#1a1a2e", color: inWatchlist ? "#e50914" : "#c0c0d8", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "Outfit, sans-serif" }}>
            <Bookmark size={16} fill={inWatchlist ? "#e50914" : "none"} />
            {inWatchlist ? "Saved" : "Watchlist"}
          </button>
        </div>

        {/* Description */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-white mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Synopsis</h2>
          <p className={cn("text-sm leading-relaxed", !showFull && "line-clamp-3")} style={{ color: "#a0a0c0", fontFamily: "Inter, sans-serif" }}>{movie.description}</p>
          <button onClick={() => setShowFull(s => !s)} className="text-xs font-semibold mt-1" style={{ color: "#e50914" }}>{showFull ? "Show Less" : "Read More"}</button>
        </div>

        {/* Details grid */}
        <div className="rounded-xl p-4 mb-5 space-y-3" style={{ background: "#0f0f1c" }}>
          {[
            { label: "Director", value: movie.director },
            { label: "Country", value: movie.country },
            { label: "Language", value: movie.language },
            { label: "Budget", value: movie.budget },
            { label: "Revenue", value: movie.revenue },
          ].map(d => (
            <div key={d.label} className="flex justify-between">
              <span className="text-xs" style={{ color: "#7070a0" }}>{d.label}</span>
              <span className="text-xs font-semibold text-white">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Cast */}
        <div className="mb-5">
          <h2 className="text-base font-bold text-white mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Cast</h2>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {movie.cast.map((name, i) => (
              <div key={name} className="flex-none text-center">
                <img src={ACTORS[i % ACTORS.length].photo} alt={name} className="w-14 h-14 rounded-full object-cover mx-auto mb-1" style={{ border: "2px solid rgba(229,9,20,0.3)" }} />
                <p className="text-xs text-white font-medium" style={{ width: 60, fontFamily: "Inter, sans-serif" }}>{name.split(" ")[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs: Reviews / Similar */}
        <div className="mb-5">
          <div className="flex gap-4 mb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {["Similar Movies", "Reviews"].map((t, i) => (
              <button key={t} className={cn("pb-2 text-sm font-semibold", i === 0 ? "border-b-2" : "")} style={{ color: i === 0 ? "#e50914" : "#7070a0", borderColor: "#e50914" }}>{t}</button>
            ))}
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {MOVIES.filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g))).slice(0, 6).map(m => (
              <MovieCard key={m.id} movie={m} onPress={() => {}} size="sm" />
            ))}
          </div>
        </div>

        {/* Community button */}
        <button onClick={() => navigate("reviews")} className="w-full flex items-center justify-between p-4 rounded-xl mb-6" style={{ background: "#0f0f1c", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2">
            <MessageCircle size={18} style={{ color: "#e50914" }} />
            <span className="text-sm font-semibold text-white">142 Reviews</span>
          </div>
          <ChevronRight size={16} style={{ color: "#7070a0" }} />
        </button>
      </div>
    </div>
  );
}

// ─── Player Screen ────────────────────────────────────────────────────────────
function PlayerScreen({ movie, navigate }: { movie: Movie; navigate: (s: Screen) => void }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(23);
  const [volume, setVolume] = useState(80);
  const [showControls, setShowControls] = useState(true);
  const [subtitles, setSubtitles] = useState(false);
  const [quality, setQuality] = useState("1080p");
  const [speed, setSpeed] = useState("1x");
  const [showSettings, setShowSettings] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!showControls) return;
    const t = setTimeout(() => setShowControls(false), 4000);
    return () => clearTimeout(t);
  }, [showControls, playing]);

  const totalSecs = 9960;
  const currentSecs = Math.floor((progress / 100) * totalSecs);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: "#000" }}>
      <img src={movie.backdrop} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.4)" }} />

      {/* Tap to show/hide controls */}
      <button className="absolute inset-0 z-10" onClick={() => !locked && setShowControls(s => !s)} />

      {showControls && !locked && (
        <>
          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-12" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)" }}>
            <BackButton onPress={() => navigate("movie-details")} />
            <div className="flex-1 text-center">
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{movie.title}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Now Playing</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowSettings(s => !s)} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <SlidersHorizontal size={14} className="text-white" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Cast size={14} className="text-white" />
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <Maximize size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* Center controls */}
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-8">
            <button onClick={() => setProgress(p => Math.max(0, p - 5))} className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <RotateCcw size={20} className="text-white" />
            </button>
            <button onClick={() => setPlaying(p => !p)} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(229,9,20,0.9)" }}>
              {playing ? <Pause size={28} fill="white" className="text-white" /> : <Play size={28} fill="white" className="text-white ml-1" />}
            </button>
            <button onClick={() => setProgress(p => Math.min(100, p + 5))} className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <FastForward size={20} className="text-white" />
            </button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-8" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)" }}>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-white font-mono">{fmt(currentSecs)}</span>
              <div className="flex-1 relative h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${progress}%`, background: "#e50914" }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white" />
                </div>
                <input type="range" min={0} max={100} value={progress} onChange={e => setProgress(+e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
              </div>
              <span className="text-xs text-white font-mono">{fmt(totalSecs)}</span>
            </div>
            {/* Skip intro */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <button onClick={() => setSubtitles(s => !s)} className="flex items-center gap-1 text-xs font-medium" style={{ color: subtitles ? "#e50914" : "rgba(255,255,255,0.6)" }}>
                  <Languages size={14} /> Sub
                </button>
                <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Volume2 size={14} /> {volume}%
                </button>
                <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Gauge size={14} /> {speed}
                </button>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(229,9,20,0.2)", color: "#e50914", border: "1px solid rgba(229,9,20,0.3)" }}>
                Skip Intro <SkipForward size={12} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Lock indicator */}
      <button onClick={() => setLocked(l => !l)} className="absolute top-1/2 right-4 -translate-y-1/2 z-30 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
        <Lock size={16} className={locked ? "text-yellow-400" : "text-white"} />
      </button>

      {/* Settings panel */}
      {showSettings && (
        <div className="absolute right-4 top-24 z-30 w-52 rounded-xl overflow-hidden" style={{ background: "#0f0f1c", border: "1px solid rgba(255,255,255,0.1)" }}>
          {[
            { label: "Quality", value: quality, opts: ["480p", "720p", "1080p", "4K"], set: setQuality },
            { label: "Speed", value: speed, opts: ["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"], set: setSpeed },
          ].map(s => (
            <div key={s.label} className="p-3 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <p className="text-xs font-semibold text-white mb-2">{s.label}</p>
              <div className="flex flex-wrap gap-1">
                {s.opts.map(o => (
                  <button key={o} onClick={() => s.set(o)} className="px-2 py-0.5 rounded text-xs" style={{ background: s.value === o ? "#e50914" : "#1a1a2e", color: "#fff" }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="p-3">
            <p className="text-xs font-semibold text-white mb-2">Sleep Timer</p>
            <div className="flex gap-1">
              {["Off", "15m", "30m", "1h"].map(t => (
                <button key={t} className="flex-1 py-0.5 rounded text-xs" style={{ background: "#1a1a2e", color: "#c0c0d8" }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TV Shows Screen ──────────────────────────────────────────────────────────
function TVShowsScreen({ navigate, setSelectedShow }: {
  navigate: (s: Screen) => void;
  setSelectedShow: (s: TVShow) => void;
}) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [selectedShowLocal, setSelectedShowLocal] = useState<TVShow | null>(null);

  if (selectedShowLocal) {
    const episodes = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1, number: i + 1, season: activeSeason,
      title: ["Outbreak", "Infected", "Long Long Time", "Please Hold to My Hand", "Endure and Survive", "Kin", "Left Behind", "When We Are in Need"][i],
      duration: `${42 + (i % 3) * 8} min`,
      description: "A new episode of survival and connection in a world forever changed by the Cordyceps infection.",
      still: img(["1536440136628-849c177e76a1", "1518780664697-55e3ad937233", "1506905925346-21bda4d32df4", "1526374965328-7f61d4dc18c5", "1474552226712-ac0f0961a954", "1441974231531-c6227db76b6e", "1440404653325-ab127d49abc1", "1509347528160-9a9e33742cdb"][i], 200, 120),
      progress: i === 0 ? 78 : i === 1 ? 30 : 0,
    }));

    return (
      <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#08080f", scrollbarWidth: "none" }}>
        <div className="relative" style={{ height: 220 }}>
          <img src={selectedShowLocal.backdrop} alt={selectedShowLocal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #08080f 5%, rgba(8,8,15,0.4) 70%)" }} />
          <div className="absolute top-12 left-4">
            <BackButton onPress={() => setSelectedShowLocal(null)} />
          </div>
        </div>
        <div className="px-4 -mt-6 pb-24">
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{selectedShowLocal.title}</h1>
          <div className="flex items-center gap-2 mb-3">
            <RatingBadge rating={selectedShowLocal.rating} size="md" />
            <span className="text-xs" style={{ color: "#7070a0" }}>{selectedShowLocal.year} · {selectedShowLocal.seasons} Seasons</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#a0a0c0", fontFamily: "Inter, sans-serif" }}>{selectedShowLocal.description}</p>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {Array.from({ length: selectedShowLocal.seasons }, (_, i) => (
              <button key={i} onClick={() => setActiveSeason(i + 1)} className="flex-none px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: activeSeason === i + 1 ? "#e50914" : "#1a1a2e", color: "#fff" }}>
                Season {i + 1}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {episodes.map(ep => (
              <button key={ep.id} className="flex gap-3 w-full" onClick={() => navigate("player")}>
                <div className="relative w-28 h-16 rounded-xl overflow-hidden flex-none">
                  <img src={ep.still} alt={ep.title} className="w-full h-full object-cover" />
                  {ep.progress > 0 && <ProgressBar progress={ep.progress} className="absolute bottom-0 left-0 right-0" />}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={20} className="text-white opacity-80" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-bold mb-0.5" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>E{ep.number}</p>
                  <p className="text-sm font-semibold text-white mb-0.5">{ep.title}</p>
                  <p className="text-xs" style={{ color: "#7070a0" }}>{ep.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#08080f", scrollbarWidth: "none" }}>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>TV Shows</h1>
        <p className="text-sm mb-4" style={{ color: "#7070a0" }}>{TV_SHOWS.length} series available</p>
        <div className="grid grid-cols-2 gap-3 pb-24">
          {TV_SHOWS.map(show => (
            <button key={show.id} onClick={() => setSelectedShowLocal(show)} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
              <img src={show.poster} alt={show.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 50%)" }} />
              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: "#e50914", color: "#fff", fontFamily: "DM Mono, monospace" }}>
                {show.seasons}S
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-left">
                <p className="text-white text-xs font-bold line-clamp-2 mb-0.5">{show.title}</p>
                <RatingBadge rating={show.rating} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Watchlist Screen ─────────────────────────────────────────────────────────
function WatchlistScreen({ navigate, setSelectedMovie, watchlist, toggleWatchlist }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
  watchlist: number[];
  toggleWatchlist: (id: number) => void;
}) {
  const [sort, setSort] = useState("Latest");
  const [filter, setFilter] = useState("All");
  const movies = MOVIES.filter(m => watchlist.includes(m.id));
  const sorts = ["Latest", "A-Z", "Rating", "Year"];
  const filters = ["All", "Movies", "TV Shows"];

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Watchlist</h1>
        <div className="flex gap-2 mb-3">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: filter === f ? "#e50914" : "#1a1a2e", color: "#fff" }}>{f}</button>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs" style={{ background: "#1a1a2e", color: "#c0c0d8" }}>
            <SlidersHorizontal size={12} />
            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-transparent text-xs outline-none" style={{ color: "#c0c0d8" }}>
              {sorts.map(s => <option key={s} value={s} style={{ background: "#1a1a2e" }}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {movies.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark size={48} className="mx-auto mb-3" style={{ color: "#2a2a4a" }} />
            <p className="text-white font-bold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Your watchlist is empty</p>
            <p className="text-sm mb-4" style={{ color: "#7070a0" }}>Add movies to watch later</p>
            <button onClick={() => navigate("home")} className="px-6 py-2 rounded-full text-sm font-semibold" style={{ background: "#e50914", color: "#fff" }}>Browse Movies</button>
          </div>
        ) : (
          <div className="space-y-3">
            {movies.map(m => (
              <div key={m.id} className="flex gap-3 p-3 rounded-xl" style={{ background: "#0f0f1c" }}>
                <button onClick={() => { setSelectedMovie(m); navigate("movie-details"); }}>
                  <img src={m.poster} alt={m.title} className="w-16 rounded-xl object-cover flex-none" style={{ height: 88 }} />
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white mb-0.5 truncate" style={{ fontFamily: "Outfit, sans-serif" }}>{m.title}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <RatingBadge rating={m.rating} />
                    <span className="text-xs" style={{ color: "#7070a0" }}>{m.year} · {m.runtime}</span>
                  </div>
                  <div className="flex gap-1 mb-2">{m.genre.slice(0, 2).map(g => <GenreBadge key={g} genre={g} />)}</div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedMovie(m); navigate("player"); }} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "#e50914", color: "#fff" }}>
                      <Play size={10} fill="white" /> Watch
                    </button>
                    <button onClick={() => toggleWatchlist(m.id)} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs" style={{ background: "#1a1a2e", color: "#7070a0" }}>
                      <Trash2 size={10} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Favorites Screen ─────────────────────────────────────────────────────────
function FavoritesScreen({ navigate, setSelectedMovie, favorites, toggleFavorite }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
}) {
  const [tab, setTab] = useState("Movies");
  const movies = MOVIES.filter(m => favorites.includes(m.id));

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <BackButton onPress={() => navigate("profile")} light={false} />
        <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Favorites</h1>
      </div>
      <div className="flex gap-4 px-4 mb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {["Movies", "Shows", "Actors"].map(t => (
          <button key={t} onClick={() => setTab(t)} className="pb-3 text-sm font-semibold border-b-2 transition-colors" style={{ color: tab === t ? "#e50914" : "#7070a0", borderColor: tab === t ? "#e50914" : "transparent" }}>{t}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {tab === "Movies" && (
          movies.length === 0 ? (
            <div className="text-center py-16">
              <Heart size={48} className="mx-auto mb-3" style={{ color: "#2a2a4a" }} />
              <p className="text-white font-bold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>No favorites yet</p>
              <p className="text-sm" style={{ color: "#7070a0" }}>Tap the heart on any movie</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {movies.map(m => (
                <button key={m.id} onClick={() => { setSelectedMovie(m); navigate("movie-details"); }} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
                  <img src={m.poster} alt={m.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                  <button onClick={e => { e.stopPropagation(); toggleFavorite(m.id); }} className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center">
                    <Heart size={12} fill="#e50914" color="#e50914" />
                  </button>
                  <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-xs font-semibold leading-tight line-clamp-2">{m.title}</p>
                </button>
              ))}
            </div>
          )
        )}
        {tab === "Shows" && (
          <div className="grid grid-cols-3 gap-2">
            {TV_SHOWS.map(s => (
              <div key={s.id} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "2/3" }}>
                <img src={s.poster} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 50%)" }} />
                <p className="absolute bottom-1.5 left-1.5 right-1.5 text-white text-xs font-semibold line-clamp-2">{s.title}</p>
              </div>
            ))}
          </div>
        )}
        {tab === "Actors" && (
          <div className="grid grid-cols-3 gap-3">
            {ACTORS.map(a => (
              <div key={a.name} className="text-center">
                <img src={a.photo} alt={a.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-2" style={{ border: "2px solid rgba(229,9,20,0.3)" }} />
                <p className="text-xs font-semibold text-white">{a.name}</p>
                <p className="text-xs" style={{ color: "#7070a0" }}>Actor</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── History Screen ───────────────────────────────────────────────────────────
function HistoryScreen({ navigate, setSelectedMovie }: {
  navigate: (s: Screen) => void;
  setSelectedMovie: (m: Movie) => void;
}) {
  const history = [
    { movie: MOVIES[1], date: "Today", time: "9:45 PM", watchedMin: 87 },
    { movie: MOVIES[0], date: "Today", time: "4:20 PM", watchedMin: 45 },
    { movie: MOVIES[4], date: "Yesterday", time: "8:15 PM", watchedMin: 131 },
    { movie: MOVIES[2], date: "Yesterday", time: "6:00 PM", watchedMin: 176 },
    { movie: MOVIES[6], date: "Jul 4", time: "10:30 PM", watchedMin: 169 },
    { movie: MOVIES[7], date: "Jul 3", time: "7:00 PM", watchedMin: 150 },
  ];
  const grouped = history.reduce((acc, h) => {
    if (!acc[h.date]) acc[h.date] = [];
    acc[h.date].push(h);
    return acc;
  }, {} as Record<string, typeof history>);

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <BackButton onPress={() => navigate("profile")} light={false} />
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Watch History</h1>
        </div>
        <button className="text-xs font-semibold" style={{ color: "#e50914" }}>Clear All</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="mb-6">
            <p className="text-xs font-bold mb-3" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>{date.toUpperCase()}</p>
            <div className="space-y-3">
              {items.map((h, i) => (
                <button key={i} onClick={() => { setSelectedMovie(h.movie); navigate("movie-details"); }} className="flex gap-3 w-full p-3 rounded-xl" style={{ background: "#0f0f1c" }}>
                  <div className="relative flex-none">
                    <img src={h.movie.poster} alt={h.movie.title} className="w-14 rounded-lg object-cover" style={{ height: 80 }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(229,9,20,0.85)" }}>
                        <Play size={12} fill="white" className="text-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{h.movie.title}</h3>
                    <p className="text-xs mb-1" style={{ color: "#7070a0" }}>{h.time} · {h.watchedMin} min watched</p>
                    <ProgressBar progress={(h.watchedMin / (parseInt(h.movie.runtime) || 120)) * 100} />
                  </div>
                  <button className="p-1">
                    <Trash2 size={14} style={{ color: "#7070a0" }} />
                  </button>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Downloads Screen ─────────────────────────────────────────────────────────
function DownloadsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [downloads] = useState([
    { movie: MOVIES[0], size: "1.8 GB", quality: "1080p", status: "completed" as const },
    { movie: MOVIES[1], size: "2.1 GB", quality: "1080p", status: "completed" as const },
    { movie: MOVIES[4], size: "742 MB", quality: "720p", status: "downloading" as const, progress: 67 },
    { movie: MOVIES[6], size: "1.2 GB", quality: "1080p", status: "paused" as const, progress: 34 },
  ]);

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <BackButton onPress={() => navigate("profile")} light={false} />
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Downloads</h1>
        </div>
        <div className="flex items-center gap-1 text-xs" style={{ color: "#7070a0" }}>
          <Wifi size={12} style={{ color: "#10b981" }} /> 12.4 GB free
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {downloads.map((d, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl mb-3" style={{ background: "#0f0f1c" }}>
            <div className="relative flex-none">
              <img src={d.movie.poster} alt={d.movie.title} className="w-16 rounded-xl object-cover" style={{ height: 88 }} />
              {d.status === "completed" && (
                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#10b981" }}>
                  <Check size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{d.movie.title}</h3>
              <div className="flex gap-2 mb-1">
                <span className="text-xs" style={{ color: "#7070a0" }}>{d.quality}</span>
                <span className="text-xs" style={{ color: "#7070a0" }}>{d.size}</span>
              </div>
              {d.status === "completed" ? (
                <div className="flex gap-2">
                  <button className="px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1" style={{ background: "#e50914", color: "#fff" }}>
                    <Play size={10} fill="white" /> Play
                  </button>
                  <button className="px-2 py-1 rounded-lg text-xs" style={{ background: "#1a1a2e", color: "#7070a0" }}>
                    <Trash2 size={10} />
                  </button>
                </div>
              ) : (
                <>
                  <ProgressBar progress={d.progress || 0} className="mb-1" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#7070a0" }}>{d.progress}%  · {d.status === "downloading" ? "Downloading..." : "Paused"}</span>
                    <button className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#1a1a2e" }}>
                      {d.status === "downloading" ? <Pause size={10} className="text-white" /> : <Play size={10} fill="white" className="text-white" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm" style={{ background: "#1a1a2e", color: "#7070a0", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <Plus size={16} /> Add New Download
        </button>
      </div>
    </div>
  );
}

// ─── Notifications Screen ─────────────────────────────────────────────────────
function NotificationsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const notifs = [
    { icon: <Flame size={16} />, color: "#e50914", title: "Trending Now", body: "Dune: Part Two is trending in your area", time: "2m ago" },
    { icon: <Tv size={16} />, color: "#3b82f6", title: "New Episode", body: "The Last of Us S2 E3 is now available", time: "1h ago" },
    { icon: <Zap size={16} />, color: "#f5c518", title: "Recommended For You", body: "Based on your history: Poor Things", time: "3h ago" },
    { icon: <Award size={16} />, color: "#10b981", title: "New Release", body: "Furiosa: A Mad Max Saga just dropped", time: "Yesterday" },
    { icon: <Bell size={16} />, color: "#8b5cf6", title: "Reminder", body: "Continue watching John Wick: Chapter 4", time: "Yesterday" },
    { icon: <RefreshCw size={16} />, color: "#0ea5e9", title: "App Update", body: "CineVault 3.2.1 — new player controls", time: "2 days ago" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <BackButton onPress={() => navigate("home")} light={false} />
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Notifications</h1>
        </div>
        <button className="text-xs" style={{ color: "#e50914" }}>Mark All Read</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {notifs.map((n, i) => (
          <div key={i} className="flex gap-3 p-3 rounded-xl mb-2" style={{ background: i < 2 ? "#0f0f1c" : "transparent", border: i < 2 ? "1px solid rgba(229,9,20,0.15)" : "1px solid transparent" }}>
            <div className="w-10 h-10 rounded-full flex-none flex items-center justify-center" style={{ background: n.color + "22" }}>
              <span style={{ color: n.color }}>{n.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-sm font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{n.title}</p>
                <span className="text-xs" style={{ color: "#7070a0" }}>{n.time}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#a0a0c0" }}>{n.body}</p>
            </div>
            {i < 2 && <div className="w-2 h-2 rounded-full mt-2 flex-none" style={{ background: "#e50914" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reviews Screen ───────────────────────────────────────────────────────────
function ReviewsScreen({ movie, navigate }: { movie: Movie; navigate: (s: Screen) => void }) {
  const [tab, setTab] = useState("Reviews");
  const [liked, setLiked] = useState<number[]>([]);

  const reviews = [
    { user: "CinephileAlex", avatar: img("1500648767791-00dcc994a43e", 40, 40), rating: 9, text: "An absolute masterpiece. Villeneuve has done it again — every frame is a painting. The scale of this film is unlike anything I've seen.", likes: 284, time: "2 days ago" },
    { user: "FilmNerd42", avatar: img("1507003211169-0a1dd7228f2d", 40, 40), rating: 8, text: "Visually stunning and emotionally resonant. The performances are incredible, especially from the leads. A must-watch for sci-fi fans.", likes: 142, time: "3 days ago" },
    { user: "MovieMaven", avatar: img("1494790108377-be9c29b29330", 40, 40), rating: 10, text: "I've watched this three times now and it gets better each viewing. The world-building is extraordinary. Hans Zimmer's score is pure genius.", likes: 89, time: "1 week ago" },
    { user: "CriticsEye", avatar: img("1472099645785-5658abf4ff4e", 40, 40), rating: 7, text: "Gorgeous cinematography but the pacing drags in the second act. Still a technical achievement worth seeing on the biggest screen possible.", likes: 56, time: "1 week ago" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <BackButton onPress={() => navigate("movie-details")} light={false} />
        <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Community</h1>
      </div>
      <div className="flex gap-4 px-4 border-b mb-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {["Reviews", "Comments", "Discussion"].map(t => (
          <button key={t} onClick={() => setTab(t)} className="pb-3 text-sm font-semibold border-b-2 transition-colors" style={{ color: tab === t ? "#e50914" : "#7070a0", borderColor: tab === t ? "#e50914" : "transparent" }}>{t}</button>
        ))}
      </div>

      {/* Rating overview */}
      <div className="mx-4 p-4 rounded-xl mb-4 flex gap-4" style={{ background: "#0f0f1c" }}>
        <div className="text-center">
          <p className="text-4xl font-black" style={{ color: "#f5c518", fontFamily: "Outfit, sans-serif" }}>{movie.imdb}</p>
          <div className="flex gap-0.5 justify-center my-1">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill={s <= Math.round(movie.imdb / 2) ? "#f5c518" : "none"} color="#f5c518" />)}
          </div>
          <p className="text-xs" style={{ color: "#7070a0" }}>2.4K ratings</p>
        </div>
        <div className="flex-1 space-y-1">
          {[5, 4, 3, 2, 1].map(s => (
            <div key={s} className="flex items-center gap-2">
              <span className="text-xs w-2" style={{ color: "#7070a0" }}>{s}</span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#1a1a2e" }}>
                <div className="h-full rounded-full" style={{ width: `${[70, 20, 6, 2, 2][5 - s]}%`, background: "#f5c518" }} />
              </div>
              <span className="text-xs" style={{ color: "#7070a0" }}>{[70, 20, 6, 2, 2][5 - s]}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24" style={{ scrollbarWidth: "none" }}>
        {/* Write review CTA */}
        <button className="w-full flex items-center gap-3 p-3 rounded-xl mb-4" style={{ background: "#1a1a2e", border: "1px dashed rgba(255,255,255,0.1)" }}>
          <div className="w-8 h-8 rounded-full overflow-hidden flex-none"><img src={img("1472099645785-5658abf4ff4e", 40, 40)} alt="You" className="w-full h-full object-cover" /></div>
          <span className="text-sm flex-1 text-left" style={{ color: "#7070a0" }}>Write a review...</span>
          <Edit size={14} style={{ color: "#7070a0" }} />
        </button>

        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "#0f0f1c" }}>
              <div className="flex items-start gap-3 mb-2">
                <img src={r.avatar} alt={r.user} className="w-9 h-9 rounded-full object-cover flex-none" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-bold text-white">{r.user}</p>
                    <span className="text-xs" style={{ color: "#7070a0" }}>{r.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, j) => <Star key={j} size={10} fill={j < Math.round(r.rating / 2) ? "#f5c518" : "none"} color="#f5c518" />)}
                    <span className="text-xs ml-1 font-bold" style={{ color: "#f5c518", fontFamily: "DM Mono, monospace" }}>{r.rating}/10</span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#a0a0c0", fontFamily: "Inter, sans-serif" }}>{r.text}</p>
              <div className="flex gap-4">
                <button onClick={() => setLiked(l => l.includes(i) ? l.filter(x => x !== i) : [...l, i])} className="flex items-center gap-1.5 text-xs" style={{ color: liked.includes(i) ? "#e50914" : "#7070a0" }}>
                  <ThumbsUp size={12} fill={liked.includes(i) ? "#e50914" : "none"} /> {r.likes + (liked.includes(i) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-xs" style={{ color: "#7070a0" }}>
                  <MessageCircle size={12} /> Reply
                </button>
                <button className="flex items-center gap-1.5 text-xs" style={{ color: "#7070a0" }}>
                  <Flag size={12} /> Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Community Screen ─────────────────────────────────────────────────────────
function CommunityScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const posts = [
    { user: "FilmBuff99", avatar: img("1500648767791-00dcc994a43e", 40, 40), text: "Just finished Oppenheimer for the 3rd time. The Trinity test scene never gets old. Who else is rewatching it?", image: img("1536440136628-849c177e76a1", 400, 200), likes: 847, comments: 92, shares: 34, time: "10m ago" },
    { user: "CinemaQueen", avatar: img("1494790108377-be9c29b29330", 40, 40), text: "My top 5 movies of 2023 🎬\n1. Oppenheimer\n2. Spider-Verse\n3. Poor Things\n4. Killers of the Flower Moon\n5. The Zone of Interest", likes: 312, comments: 67, shares: 18, time: "2h ago" },
    { user: "SciFiNerd", avatar: img("1507003211169-0a1dd7228f2d", 40, 40), text: "Dune 3 has been officially confirmed! Denis Villeneuve will adapt Messiah. I cannot wait for this to happen 🚀", likes: 1204, comments: 230, shares: 89, time: "5h ago" },
  ];
  const [liked, setLiked] = useState<number[]>([]);

  return (
    <div className="flex flex-col h-full" style={{ background: "#08080f" }}>
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <BackButton onPress={() => navigate("profile")} light={false} />
          <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Community</h1>
        </div>
        <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#e50914" }}>
          <Plus size={18} className="text-white" />
        </button>
      </div>
      {/* Public Watchlists */}
      <div className="px-4 mb-4">
        <p className="text-xs font-bold mb-2" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>TRENDING LISTS</p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {["Best of 2023", "Nolan-verse", "Mind-bending Films", "Oscar Winners"].map(l => (
            <div key={l} className="flex-none px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#1a1a2e", color: "#c0c0d8", border: "1px solid rgba(255,255,255,0.08)" }}>
              📋 {l}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
        {posts.map((p, i) => (
          <div key={i} className="border-b px-4 py-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <img src={p.avatar} alt={p.user} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-white">{p.user}</p>
                <p className="text-xs" style={{ color: "#7070a0" }}>{p.time}</p>
              </div>
              <button><MoreHorizontal size={16} style={{ color: "#7070a0" }} /></button>
            </div>
            <p className="text-sm leading-relaxed mb-3 whitespace-pre-line" style={{ color: "#c0c0d8", fontFamily: "Inter, sans-serif" }}>{p.text}</p>
            {p.image && <img src={p.image} alt="" className="w-full h-40 object-cover rounded-xl mb-3" />}
            <div className="flex gap-5">
              <button onClick={() => setLiked(l => l.includes(i) ? l.filter(x => x !== i) : [...l, i])} className="flex items-center gap-1.5 text-xs" style={{ color: liked.includes(i) ? "#e50914" : "#7070a0" }}>
                <Heart size={14} fill={liked.includes(i) ? "#e50914" : "none"} color={liked.includes(i) ? "#e50914" : "#7070a0"} />
                {p.likes + (liked.includes(i) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5 text-xs" style={{ color: "#7070a0" }}>
                <MessageCircle size={14} /> {p.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs" style={{ color: "#7070a0" }}>
                <Share2 size={14} /> {p.shares}
              </button>
              <button className="flex items-center gap-1.5 text-xs ml-auto" style={{ color: "#7070a0" }}>
                <Copy size={14} /> Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ navigate, favorites, watchlist }: {
  navigate: (s: Screen) => void;
  favorites: number[];
  watchlist: number[];
}) {
  const stats = [
    { label: "Watched", value: "247" },
    { label: "Watchlist", value: String(watchlist.length + 12) },
    { label: "Favorites", value: String(favorites.length + 8) },
    { label: "Reviews", value: "34" },
  ];
  const menuItems = [
    { icon: <Heart size={18} />, label: "Favorites", screen: "favorites" as Screen, color: "#e50914" },
    { icon: <Clock size={18} />, label: "Watch History", screen: "history" as Screen, color: "#f5c518" },
    { icon: <Download size={18} />, label: "Downloads", screen: "downloads" as Screen, color: "#10b981" },
    { icon: <MessageCircle size={18} />, label: "Community", screen: "community" as Screen, color: "#8b5cf6" },
    { icon: <Bell size={18} />, label: "Notifications", screen: "notifications" as Screen, color: "#3b82f6" },
    { icon: <Settings size={18} />, label: "Settings", screen: "settings" as Screen, color: "#7070a0" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-20" style={{ background: "#08080f", scrollbarWidth: "none" }}>
      {/* Header bg */}
      <div className="relative" style={{ height: 160 }}>
        <img src={img("1506905925346-21bda4d32df4", 430, 200)} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, #08080f 0%, rgba(8,8,15,0.6) 100%)" }} />
      </div>
      {/* Avatar */}
      <div className="px-4 -mt-16 mb-6">
        <div className="relative w-24 mb-3">
          <img src={img("1472099645785-5658abf4ff4e", 96, 96)} alt="Profile" className="w-24 h-24 rounded-2xl object-cover" style={{ border: "3px solid #e50914" }} />
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "#e50914" }}>
            <Camera size={12} className="text-white" />
          </button>
        </div>
        <h1 className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>Alex Johnson</h1>
        <p className="text-sm mb-1" style={{ color: "#7070a0" }}>alex.johnson@email.com</p>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#f5c518" + "22", color: "#f5c518", border: "1px solid #f5c51844" }}>Premium Member</div>
          <div className="flex items-center gap-1">
            <MapPin size={10} style={{ color: "#7070a0" }} />
            <span className="text-xs" style={{ color: "#7070a0" }}>New York, USA</span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mx-4 rounded-2xl p-4 mb-6 grid grid-cols-4 gap-2" style={{ background: "#0f0f1c" }}>
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>{s.value}</p>
            <p className="text-xs" style={{ color: "#7070a0" }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Preferred genres */}
      <div className="mx-4 mb-6">
        <p className="text-xs font-bold mb-2" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>FAVORITE GENRES</p>
        <div className="flex flex-wrap gap-2">
          {["Sci-Fi", "Thriller", "Drama", "Action"].map(g => <GenreBadge key={g} genre={g} />)}
        </div>
      </div>
      {/* Menu */}
      <div className="mx-4 rounded-2xl overflow-hidden mb-4" style={{ background: "#0f0f1c" }}>
        {menuItems.map((item, i) => (
          <button key={item.label} onClick={() => navigate(item.screen)} className="flex items-center gap-3 px-4 py-4 w-full border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: item.color + "22" }}>
              <span style={{ color: item.color }}>{item.icon}</span>
            </div>
            <span className="flex-1 text-sm font-semibold text-white text-left">{item.label}</span>
            <ChevronRight size={16} style={{ color: "#7070a0" }} />
          </button>
        ))}
      </div>
      <div className="mx-4 rounded-2xl overflow-hidden mb-4" style={{ background: "#0f0f1c" }}>
        <button className="flex items-center gap-3 px-4 py-4 w-full border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }} onClick={() => navigate("settings")}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#dc262622" }}>
            <Edit size={18} style={{ color: "#dc2626" }} />
          </div>
          <span className="flex-1 text-sm font-semibold text-white text-left">Edit Profile</span>
          <ChevronRight size={16} style={{ color: "#7070a0" }} />
        </button>
        <button className="flex items-center gap-3 px-4 py-4 w-full">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#dc262622" }}>
            <LogOut size={18} style={{ color: "#dc2626" }} />
          </div>
          <span className="text-sm font-semibold text-left" style={{ color: "#dc2626" }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// ─── Settings Screen ──────────────────────────────────────────────────────────
function SettingsScreen({ navigate }: { navigate: (s: Screen) => void }) {
  const [darkMode, setDarkMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [quality, setQuality] = useState("1080p");
  const [subtitleSize, setSubtitleSize] = useState("Medium");

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)} className="w-12 h-6 rounded-full relative transition-colors flex-none" style={{ background: value ? "#e50914" : "#2a2a4a" }}>
      <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: value ? "calc(100% - 1.375rem)" : "0.125rem" }} />
    </button>
  );

  const sections = [
    {
      title: "Appearance",
      items: [
        { label: "Dark Mode", icon: <Moon size={18} />, color: "#8b5cf6", type: "toggle" as const, value: darkMode, onChange: setDarkMode },
        { label: "Language", icon: <Languages size={18} />, color: "#3b82f6", type: "value" as const, value: "English" },
        { label: "Subtitle Size", icon: <FileText size={18} />, color: "#10b981", type: "value" as const, value: subtitleSize },
      ]
    },
    {
      title: "Playback",
      items: [
        { label: "Auto Play", icon: <PlayCircle size={18} />, color: "#e50914", type: "toggle" as const, value: autoPlay, onChange: setAutoPlay },
        { label: "Video Quality", icon: <Gauge size={18} />, color: "#f5c518", type: "value" as const, value: quality },
        { label: "Data Saver", icon: <WifiOff size={18} />, color: "#7070a0", type: "toggle" as const, value: dataSaver, onChange: setDataSaver },
      ]
    },
    {
      title: "Notifications",
      items: [
        { label: "Push Notifications", icon: <Bell size={18} />, color: "#f59e0b", type: "toggle" as const, value: notifications, onChange: setNotifications },
        { label: "New Episodes", icon: <Tv size={18} />, color: "#3b82f6", type: "toggle" as const, value: true, onChange: () => {} },
        { label: "Recommendations", icon: <Zap size={18} />, color: "#10b981", type: "toggle" as const, value: true, onChange: () => {} },
      ]
    },
    {
      title: "Account",
      items: [
        { label: "Change Password", icon: <Lock size={18} />, color: "#7070a0", type: "arrow" as const },
        { label: "Privacy Settings", icon: <Shield size={18} />, color: "#7070a0", type: "arrow" as const },
        { label: "Clear Cache", icon: <RefreshCw size={18} />, color: "#7070a0", type: "arrow" as const },
        { label: "Delete Account", icon: <Trash2 size={18} />, color: "#dc2626", type: "arrow" as const },
      ]
    },
    {
      title: "About",
      items: [
        { label: "Terms & Conditions", icon: <FileText size={18} />, color: "#7070a0", type: "arrow" as const },
        { label: "Privacy Policy", icon: <Shield size={18} />, color: "#7070a0", type: "arrow" as const },
        { label: "About App", icon: <Info size={18} />, color: "#7070a0", type: "arrow" as const },
      ]
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-8" style={{ background: "#08080f", scrollbarWidth: "none" }}>
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <BackButton onPress={() => navigate("profile")} light={false} />
        <h1 className="text-xl font-black text-white" style={{ fontFamily: "Outfit, sans-serif" }}>Settings</h1>
      </div>
      <div className="px-4 space-y-6">
        {sections.map(section => (
          <div key={section.title}>
            <p className="text-xs font-bold mb-2" style={{ color: "#7070a0", fontFamily: "DM Mono, monospace" }}>{section.title.toUpperCase()}</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#0f0f1c" }}>
              {section.items.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3.5 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-none" style={{ background: (item.color) + "22" }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <span className="flex-1 text-sm font-semibold text-white">{item.label}</span>
                  {item.type === "toggle" && <Toggle value={item.value as boolean} onChange={item.onChange as (v: boolean) => void} />}
                  {item.type === "value" && <span className="text-sm" style={{ color: "#7070a0" }}>{item.value as string}</span>}
                  {item.type === "arrow" && <ChevronRight size={16} style={{ color: "#7070a0" }} />}
                </div>
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-xs py-4" style={{ color: "#2a2a4a" }}>CineVault v3.2.1 · Made with ❤️ for cinema lovers</p>
      </div>
    </div>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
const MAIN_SCREENS: Screen[] = ["home", "search", "categories", "watchlist", "profile"];
const NAV_ITEMS = [
  { screen: "home" as Screen, icon: Home, label: "Home" },
  { screen: "search" as Screen, icon: Search, label: "Search" },
  { screen: "categories" as Screen, icon: Grid, label: "Browse" },
  { screen: "watchlist" as Screen, icon: Bookmark, label: "Watchlist" },
  { screen: "profile" as Screen, icon: User, label: "Profile" },
];

function BottomNav({ current, navigate }: { current: Screen; navigate: (s: Screen) => void }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 flex" style={{ background: "rgba(8,8,15,0.95)", borderTop: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
      {NAV_ITEMS.map(item => {
        const active = current === item.screen;
        const Icon = item.icon;
        return (
          <button key={item.screen} onClick={() => navigate(item.screen)} className="flex-1 flex flex-col items-center py-2.5 gap-0.5">
            <div className="relative">
              <Icon size={22} color={active ? "#e50914" : "#5050a0"} fill={active && item.screen === "home" ? "#e50914" : "none"} />
              {active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#e50914" }} />}
            </div>
            <span className="text-xs font-semibold transition-colors" style={{ color: active ? "#e50914" : "#5050a0", fontFamily: "Inter, sans-serif" }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [prevScreen, setPrevScreen] = useState<Screen>("home");
  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES[0]);
  const [selectedShow, setSelectedShow] = useState<TVShow>(TV_SHOWS[0]);
  const [watchlist, setWatchlist] = useState<number[]>([1, 3, 7]);
  const [favorites, setFavorites] = useState<number[]>([2, 5]);

  const navigate = (to: Screen) => {
    setPrevScreen(screen);
    setScreen(to);
  };

  const toggleWatchlist = (id: number) =>
    setWatchlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const toggleFavorite = (id: number) =>
    setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const showNav = MAIN_SCREENS.includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen onDone={() => setScreen("login")} />;
      case "login": return <LoginScreen navigate={navigate} />;
      case "signup": return <SignupScreen navigate={navigate} />;
      case "forgot-password": return <ForgotPasswordScreen navigate={navigate} />;
      case "email-verification": return <EmailVerificationScreen navigate={navigate} />;
      case "home": return <HomeScreen navigate={navigate} setSelectedMovie={setSelectedMovie} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />;
      case "search": return <SearchScreen navigate={navigate} setSelectedMovie={setSelectedMovie} />;
      case "categories": return <CategoriesScreen navigate={navigate} setSelectedMovie={setSelectedMovie} />;
      case "watchlist": return <WatchlistScreen navigate={navigate} setSelectedMovie={setSelectedMovie} watchlist={watchlist} toggleWatchlist={toggleWatchlist} />;
      case "profile": return <ProfileScreen navigate={navigate} favorites={favorites} watchlist={watchlist} />;
      case "movie-details": return <MovieDetailsScreen movie={selectedMovie} navigate={navigate} watchlist={watchlist} toggleWatchlist={toggleWatchlist} favorites={favorites} toggleFavorite={toggleFavorite} />;
      case "player": return <PlayerScreen movie={selectedMovie} navigate={navigate} />;
      case "tv-shows": return <TVShowsScreen navigate={navigate} setSelectedShow={setSelectedShow} />;
      case "tv-show-details": return <TVShowsScreen navigate={navigate} setSelectedShow={setSelectedShow} />;
      case "favorites": return <FavoritesScreen navigate={navigate} setSelectedMovie={setSelectedMovie} favorites={favorites} toggleFavorite={toggleFavorite} />;
      case "history": return <HistoryScreen navigate={navigate} setSelectedMovie={setSelectedMovie} />;
      case "downloads": return <DownloadsScreen navigate={navigate} />;
      case "notifications": return <NotificationsScreen navigate={navigate} />;
      case "settings": return <SettingsScreen navigate={navigate} />;
      case "reviews": return <ReviewsScreen movie={selectedMovie} navigate={navigate} />;
      case "community": return <CommunityScreen navigate={navigate} />;
      default: return null;
    }
  };

  return (
    <div className="size-full flex items-center justify-center" style={{ background: "#04040a" }}>
      <div className="relative overflow-hidden" style={{
        width: "min(430px, 100%)",
        height: "min(900px, 100%)",
        background: "#08080f",
        boxShadow: "0 0 80px rgba(229,9,20,0.15)",
        borderRadius: "min(2rem, 0px)",
        fontFamily: "Inter, sans-serif",
      }}>
        {renderScreen()}
        {showNav && <BottomNav current={screen} navigate={navigate} />}
      </div>
    </div>
  );
}
