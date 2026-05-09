import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef } from "react";
import { Heart, Trophy, RotateCcw, Play, CheckCircle2, XCircle, ArrowRight, Code2 } from "lucide-react";
import { QUESTIONS } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Codigo congelado — Mini juego de programación" },
      {
        name: "description",
        content:
          "Mini juego educativo para repasar variables, condicionales, ciclos y funciones. 5 niveles, 3 vidas, ¡a programar!",
      },
      { property: "og:title", content: "Codigo congelado — Mini juego de programación" },
      {
        property: "og:description",
        content: "Repasa variables, condicionales, ciclos y funciones jugando.",
      },
    ],
  }),
  component: Game,
});

type Screen = "start" | "play" | "end";
const TOTAL_LIVES = 3;
const POINTS = 10;

function sampleQuestions(count: number) {
  const pool = [...QUESTIONS];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i];
    pool[i] = pool[j];
    pool[j] = tmp;
  }
  return pool.slice(0, Math.min(count, pool.length));
}

function Game() {
  const [screen, setScreen] = useState<Screen>("start");
  const [level, setLevel] = useState(0);
  const [lives, setLives] = useState(TOTAL_LIVES);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [deck, setDeck] = useState<(typeof QUESTIONS)[number][]>([]);
  const prevLivesRef = useRef<number | null>(null);

  const total = deck.length;
  const q = deck[level];

  const reset = () => {
    setLevel(0);
    setLives(TOTAL_LIVES);
    setScore(0);
    setSelected(null);
    setRevealed(false);
    const sample = sampleQuestions(5);
    setDeck(sample);
  };

  const start = () => {
    reset();
    setScreen("play");
  };

  const choose = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === q.answer) {
      setScore((s) => s + POINTS);
    } else {
      setScore((s) => Math.max(0, s - POINTS));
      prevLivesRef.current = lives;
      setLives((l) => l - 1);
    }
  };

  const next = () => {
    const wasCorrect = selected === q.answer;
    let newLives = lives;
    if (!wasCorrect && prevLivesRef.current != null) {
      const prev = prevLivesRef.current;
      if (lives === prev - 1) {
        newLives = lives; // decrement already applied
      } else {
        newLives = Math.max(0, prev - 1); // decrement not applied yet
      }
      prevLivesRef.current = null;
    } else if (!wasCorrect) {
      newLives = lives; // fallback
    }

    const lastLevel = level + 1 >= total;
    const dead = !wasCorrect && newLives <= 0;

    if (lastLevel || dead) {
      setScreen("end");
      return;
    }
    setLevel((l) => l + 1);
    setSelected(null);
    setRevealed(false);
  };

  const won = lives > 0 && level >= total - 1 && screen === "end";

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {screen === "start" && <StartScreen onStart={start} />}
        {screen === "play" &&
          (deck.length > 0 ? (
            <PlayScreen
              level={level}
              total={total}
              lives={lives}
              score={score}
              question={q}
              selected={selected}
              revealed={revealed}
              onChoose={choose}
              onNext={next}
            />
          ) : (
            <div className="p-6">Cargando preguntas...</div>
          ))}
        {screen === "end" && (
          <EndScreen score={score} won={won} total={total} onRestart={start} />
        )}
      </div>
    </main>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <section
      className="rounded-2xl p-10 text-center"
      style={{ background: "var(--game-gradient)", boxShadow: "var(--shadow-game)" }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
        <Code2 className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-3">Codigo congelado</h1>
      <p className="text-white/90 text-lg mb-2">Mini juego de programación</p>
      <p className="text-white/80 max-w-md mx-auto mb-8">
        Pon a prueba tus conocimientos de <strong>variables</strong>,{" "}
        <strong>condicionales</strong>, <strong>ciclos</strong> y <strong>funciones</strong>.
        Tienes 3 vidas y 5 niveles. ¡Suma 10 puntos por respuesta correcta!
      </p>
      <Button
        size="lg"
        onClick={onStart}
        className="bg-white text-primary hover:bg-white/90 text-base h-12 px-8"
      >
        <Play className="w-5 h-5 mr-2" />
        Iniciar juego
      </Button>
    </section>
  );
}

function PlayScreen({
  level,
  total,
  lives,
  score,
  question,
  selected,
  revealed,
  onChoose,
  onNext,
}: {
  level: number;
  total: number;
  lives: number;
  score: number;
  question: (typeof QUESTIONS)[number];
  selected: number | null;
  revealed: boolean;
  onChoose: (i: number) => void;
  onNext: () => void;
}) {
  const progress = useMemo(() => ((level) / total) * 100, [level, total]);
  const isCorrect = selected === question.answer;

  return (
    <section className="bg-card rounded-2xl p-6 sm:p-8 border shadow-xl">
      {/* HUD */}
      <header className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-muted-foreground">
          Nivel <span className="text-foreground font-bold">{level + 1}</span> / {total}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1" aria-label={`${lives} vidas`}>
            {Array.from({ length: TOTAL_LIVES }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition ${
                  i < lives ? "fill-destructive text-destructive" : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm tabular-nums">{score}</span>
          </div>
        </div>
      </header>

      <Progress value={progress} className="mb-6 h-2" />

      <div className="mb-2 text-xs uppercase tracking-wider text-primary font-semibold">
        {question.topic}
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 whitespace-pre-line leading-snug">
        {question.question}
      </h2>

      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer;
          const isSelected = i === selected;
          let cls =
            "w-full text-left p-4 rounded-xl border-2 transition-all font-medium ";
          if (!revealed) {
            cls += "border-border hover:border-primary hover:bg-secondary cursor-pointer";
          } else if (isAnswer) {
            cls += "border-[var(--success)] bg-[var(--success)]/10";
          } else if (isSelected) {
            cls += "border-destructive bg-destructive/10";
          } else {
            cls += "border-border opacity-60";
          }
          return (
            <button
              key={i}
              onClick={() => onChoose(i)}
              disabled={revealed}
              className={cls}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground inline-flex items-center justify-center text-sm font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && isAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-[var(--success)]" />
                )}
                {revealed && isSelected && !isAnswer && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div
          className={`rounded-xl p-4 mb-4 border ${
            isCorrect
              ? "bg-[var(--success)]/10 border-[var(--success)]/30"
              : "bg-destructive/10 border-destructive/30"
          }`}
        >
          <div className="font-semibold mb-1">
            {isCorrect ? "¡Correcto! +10 puntos" : "Incorrecto. -10 puntos y -1 vida"}
          </div>
          <div className="text-sm text-muted-foreground">{question.explanation}</div>
        </div>
      )}

      {revealed && (
        <Button onClick={onNext} size="lg" className="w-full h-12">
          {level + 1 >= total || (!isCorrect && lives <= 0) ? "Ver resultados" : "Siguiente"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </section>
  );
}

function EndScreen({
  score,
  won,
  total,
  onRestart,
}: {
  score: number;
  won: boolean;
  total: number;
  onRestart: () => void;
}) {
  const max = total * 10;
  return (
    <section
      className="rounded-2xl p-10 text-center"
      style={{
        background: won
          ? "var(--game-gradient)"
          : "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.6 0.2 40))",
        boxShadow: "var(--shadow-game)",
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mb-6">
        <Trophy className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-2">
        {won ? "¡Victoria!" : "Game Over"}
      </h1>
      <p className="text-white/85 mb-6">
        {won
          ? "Completaste todos los niveles. ¡Eres un crack del código!"
          : "Te quedaste sin vidas. ¡Inténtalo de nuevo!"}
      </p>

      <div className="bg-white/15 backdrop-blur rounded-xl p-6 mb-8 inline-block">
        <div className="text-white/80 text-sm uppercase tracking-wider mb-1">
          Puntuación final
        </div>
        <div className="text-5xl font-bold text-white tabular-nums">
          {score}
          <span className="text-2xl text-white/60"> / {max}</span>
        </div>
      </div>

      <div>
        <Button
          size="lg"
          onClick={onRestart}
          className="bg-white text-primary hover:bg-white/90 h-12 px-8"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Jugar de nuevo
        </Button>
      </div>
    </section>
  );
}
