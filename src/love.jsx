
import { useRef, useState } from "react";
import "./Love.css";

// Generated once — never re-computed on re-render
const BG_HEARTS = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    char: ["♥", "💕", "💗", "💓", "💖"][i % 5],
    left: (i * 5.5) % 100,
    duration: 8 + (i * 1.3) % 12,
    delay: (i * 0.7) % 12,
    size: 1 + (i * 0.15) % 2,
}));

function Love() {
    const noBtnRef = useRef(null);

    // null = not moved yet (button sits in normal flow)
    // {x, y} = fixed position across viewport
    const [noPos, setNoPos] = useState(null);
    const [won, setWon] = useState(false);
    const [bursts, setBursts] = useState([]);
    const [confetti, setConfetti] = useState([]);

    const moveNoButton = () => {
        const btn = noBtnRef.current;
        const btnW = btn.offsetWidth;
        const btnH = btn.offsetHeight;
        const pad = 16;

        const maxX = window.innerWidth  - btnW - pad;
        const maxY = window.innerHeight - btnH - pad;

        // Pick a position that's far from the current one
        const currentX = noPos ? noPos.x : window.innerWidth / 2;
        const currentY = noPos ? noPos.y : window.innerHeight / 2;

        let newX, newY;
        do {
            newX = pad + Math.random() * maxX;
            newY = pad + Math.random() * maxY;
        } while (
            Math.abs(newX - currentX) < 100 &&
            Math.abs(newY - currentY) < 100
        );

        setNoPos({ x: newX, y: newY });
    };

    const handleYes = () => {
        setWon(true);

        // Burst hearts
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const emojis = ["💖", "💗", "💓", "💕", "♥", "🌸", "✨"];
        const newBursts = Array.from({ length: 40 }, (_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = 120 + Math.random() * 220;
            return {
                id: i,
                char: emojis[i % emojis.length],
                x: cx + Math.random() * 40 - 20,
                y: cy + Math.random() * 40 - 20,
                dx: Math.cos(angle) * dist,
                dy: Math.sin(angle) * dist - 80,
                rot: Math.random() * 360 - 180,
                size: 1.2 + Math.random() * 1.8,
                delay: i * 40,
            };
        });
        setBursts(newBursts);
        setTimeout(() => setBursts([]), 2000);

        // Confetti
        const colors = ["#ff6eb4", "#e91e8c", "#4caf84", "#ffd700", "#ff4d6d", "#a78bfa"];
        const newConfetti = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            color: colors[i % colors.length],
            size: 6 + Math.random() * 8,
            rot: Math.random() * 720 - 360,
            dur: 1.2 + Math.random() * 1.5,
            delay: Math.random() * 0.8,
            round: i % 2 === 0,
        }));
        setConfetti(newConfetti);
        setTimeout(() => setConfetti([]), 3500);
    };

    return (
        <div id="love-app">

            {/* Background hearts */}
            <div id="bg-hearts">
                {BG_HEARTS.map((h) => (
                    <span
                        key={h.id}
                        className="bg-heart"
                        style={{
                            left: `${h.left}vw`,
                            animationDuration: `${h.duration}s`,
                            animationDelay: `-${h.delay}s`,
                            fontSize: `${h.size}rem`,
                        }}
                    >
                        {h.char}
                    </span>
                ))}
            </div>

            {/* Burst hearts */}
            {bursts.map((h) => (
                <span
                    key={h.id}
                    className="burst-heart"
                    style={{
                        left: h.x,
                        top: h.y,
                        fontSize: `${h.size}rem`,
                        "--dx": `${h.dx}px`,
                        "--dy": `${h.dy}px`,
                        "--rot": `${h.rot}deg`,
                        animationDelay: `${h.delay}ms`,
                    }}
                >
                    {h.char}
                </span>
            ))}

            {/* Confetti */}
            {confetti.map((c) => (
                <div
                    key={c.id}
                    className="confetti-piece"
                    style={{
                        left: `${c.left}vw`,
                        background: c.color,
                        width: c.size,
                        height: c.size,
                        borderRadius: c.round ? "50%" : "2px",
                        "--rot": `${c.rot}deg`,
                        animationDuration: `${c.dur}s`,
                        animationDelay: `${c.delay}s`,
                    }}
                />
            ))}

            {/* ── GAME ── */}
            {!won && (
                <>
                    <h1 id="loveme">I love you 💕</h1>

                    <div id="cat-wrap">
                        <svg id="cat-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="100" cy="145" rx="50" ry="42" fill="#f9b8d4" />
                            <ellipse cx="100" cy="90"  rx="48" ry="44" fill="#f9b8d4" />
                            <polygon points="60,55 48,20 80,50"   fill="#f9b8d4" />
                            <polygon points="140,55 152,20 120,50" fill="#f9b8d4" />
                            <polygon points="62,52 54,28 78,49"   fill="#ffadd2" />
                            <polygon points="138,52 146,28 122,49" fill="#ffadd2" />
                            <text x="72"  y="95" fontSize="18" textAnchor="middle" fill="#e91e8c">♥</text>
                            <text x="128" y="95" fontSize="18" textAnchor="middle" fill="#e91e8c">♥</text>
                            <ellipse cx="100" cy="103" rx="5" ry="3.5" fill="#e91e8c" />
                            <path d="M93 107 Q100 114 107 107" stroke="#c0577a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                            <line x1="55"  y1="100" x2="90"  y2="104" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="55"  y1="106" x2="90"  y2="106" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="145" y1="100" x2="110" y2="104" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="145" y1="106" x2="110" y2="106" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <ellipse cx="70"  cy="182" rx="18" ry="12" fill="#f9b8d4" />
                            <ellipse cx="130" cy="182" rx="18" ry="12" fill="#f9b8d4" />
                            <path d="M148 160 Q185 140 175 115 Q168 100 155 110" stroke="#f9b8d4" strokeWidth="14" fill="none" strokeLinecap="round" />
                            <text x="22"  y="48" fontSize="14" fill="#e91e8c" opacity="0.7">♥</text>
                            <text x="162" y="40" fontSize="11" fill="#ff6eb4" opacity="0.8">♥</text>
                        </svg>
                    </div>

                    {/*
                        Both buttons sit side by side in a flex row.
                        The NO button becomes position:fixed once moved,
                        so it escapes the flow and roams the whole screen.
                    */}
                    <div id="btncont">
                        <button id="yes" onClick={handleYes}>
                            yes 💕
                        </button>

                        <button
                            id="no"
                            ref={noBtnRef}
                            onMouseEnter={moveNoButton}
                            style={
                                noPos
                                    ? {
                                          position: "fixed",
                                          left: noPos.x,
                                          top: noPos.y,
                                          transition: "left 0.15s ease, top 0.15s ease",
                                      }
                                    : {}
                            }
                        >
                            no 😒
                        </button>
                    </div>
                </>
            )}

            {/* ── WIN ── */}
            {won && (
                <div id="win-view">
                    <h1 id="win-title">I knew it! 💖</h1>

                    <div id="cat-wrap">
                        <svg id="cat-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="100" cy="145" rx="50" ry="42" fill="#f9b8d4" />
                            <ellipse cx="100" cy="90"  rx="48" ry="44" fill="#f9b8d4" />
                            <polygon points="60,55 48,20 80,50"   fill="#f9b8d4" />
                            <polygon points="140,55 152,20 120,50" fill="#f9b8d4" />
                            <polygon points="62,52 54,28 78,49"   fill="#ffadd2" />
                            <polygon points="138,52 146,28 122,49" fill="#ffadd2" />
                            <path d="M62 88 Q72 80 82 88"   stroke="#e91e8c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            <path d="M118 88 Q128 80 138 88" stroke="#e91e8c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            <ellipse cx="100" cy="103" rx="5" ry="3.5" fill="#e91e8c" />
                            <path d="M91 108 Q100 118 109 108" stroke="#c0577a" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <line x1="55"  y1="100" x2="90"  y2="104" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="55"  y1="106" x2="90"  y2="106" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="145" y1="100" x2="110" y2="104" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <line x1="145" y1="106" x2="110" y2="106" stroke="#c0577a" strokeWidth="1.2" opacity="0.6" />
                            <ellipse cx="70"  cy="182" rx="18" ry="12" fill="#f9b8d4" />
                            <ellipse cx="130" cy="182" rx="18" ry="12" fill="#f9b8d4" />
                            <path d="M148 160 Q185 140 175 115 Q168 100 155 110" stroke="#f9b8d4" strokeWidth="14" fill="none" strokeLinecap="round" />
                            <text x="10"  y="45" fontSize="20" fill="#e91e8c">♥</text>
                            <text x="165" y="38" fontSize="16" fill="#ff6eb4">♥</text>
                            <text x="172" y="68" fontSize="13" fill="#e91e8c">♥</text>
                            <text x="18"  y="72" fontSize="12" fill="#ff6eb4">♥</text>
                        </svg>
                    </div>

                    <p id="win-sub">We're meant to be forever 🌸</p>
                </div>
            )}
        </div>
    );
}

export default Love;