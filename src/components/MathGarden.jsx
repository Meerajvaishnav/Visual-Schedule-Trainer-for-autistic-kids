import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "./MathGarden.css";

const LEVELS = [
    { id: 1, name: "Count the objects", goal: "Counting game" },
    { id: 2, name: "Add the items", goal: "Visual Addition" },
    { id: 3, name: "Larger vs Smaller", goal: "Size Comparison" },
    { id: 4, name: "Pick the right number", goal: "Number matching" },
    { id: 5, name: "Add the flowers", goal: "Add flowers!" },
    { id: 6, name: "Birdy Subtraction", goal: "Subtract the items" },
    { id: 7, name: "Bee counting", goal: "How many bees?" },
    { id: 8, name: "Watering Time", goal: "Water the plants!" }
];

const MathGarden = () => {
    const history = useHistory();
    const [level, setLevel] = useState(1);
    const [stars, setStars] = useState(0);
    const [starsInLevel, setStarsInLevel] = useState(0);
    const [coins, setCoins] = useState(0);
    const [garden, setGarden] = useState([]); // List of grown plant emojis
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [showBadge, setShowBadge] = useState(false);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [bees, setBees] = useState([]);
    const [rain, setRain] = useState([]);
    const [wateredCount, setWateredCount] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Generate a new question based on the current level
    const generateQuestion = useCallback(() => {
        setFeedback(null);
        setWateredCount(0);
        setBees([]);
        let q = { text: "", answer: 0, visual: [] };
        let opts = [];

        switch (level) {
            case 1: // Counting
                q.answer = Math.floor(Math.random() * 10) + 1;
                const items = ["🍎", "⭐", "🍌", "🍇"];
                const selectedItem = items[Math.floor(Math.random() * items.length)];
                q.text = `How many ${selectedItem} do you see?`;
                q.visual = Array(q.answer).fill(selectedItem);
                break;

            case 2: // Visual Addition
                const n1 = Math.floor(Math.random() * 5) + 1;
                const n2 = Math.floor(Math.random() * 5) + 1;
                q.answer = n1 + n2;
                q.text = "Add them together!";
                q.visual = [...Array(n1).fill("🐟"), " + ", ...Array(n2).fill("🐟")];
                break;

            case 3: // Size Comparison
                const emoji = ["🍎", "⭐", "🦋", "🌸", "🍔", "🚗"][Math.floor(Math.random() * 6)];
                const isLookingForLarger = Math.random() > 0.5;
                q.text = isLookingForLarger ? `Which ${emoji} is larger?` : `Which ${emoji} is smaller?`;
                const smallVal = { label: emoji, size: '2.5rem', id: 'small' };
                const largeVal = { label: emoji, size: '5rem', id: 'large' };
                opts = [smallVal, largeVal].sort(() => Math.random() - 0.5);
                q.answer = isLookingForLarger ? largeVal : smallVal;
                q.visual = [];
                break;

            case 4: // Number Matching
                q.answer = Math.floor(Math.random() * 10) + 1;
                q.text = `Find the number ${q.answer}`;
                q.visual = ["❓"];
                break;

            case 5: // Garden Addition
                const f1 = Math.floor(Math.random() * 5) + 1;
                const f2 = Math.floor(Math.random() * 4) + 1;
                q.answer = f1 + f2;
                q.text = "How many flowers in total?";
                q.visual = [...Array(f1).fill("🌸"), " + ", ...Array(f2).fill("🌸")];
                break;

            case 6: // Subtraction
                const total = Math.floor(Math.random() * 5) + 5;
                const sub = Math.floor(Math.random() * 4) + 1;
                q.answer = total - sub;
                q.text = `A bird ate ${sub} 🍎. How many are left?`;
                q.visual = [...Array(total).fill("🍎"), " 🐦 "];
                break;

            case 7: // Bee mini-game
                q.answer = Math.floor(Math.random() * 7) + 3;
                q.text = "How many bees are flying?";
                q.visual = [];
                const newBees = Array(q.answer).fill(0).map(() => ({
                    id: Math.random(),
                    top: Math.random() * 200,
                    left: Math.random() * 700
                }));
                setBees(newBees);
                break;

            case 8: // Water mini-game
                q.answer = Math.floor(Math.random() * 5) + 1;
                q.text = `Water the plants!`;
                q.visual = Array(q.answer).fill("🥀");
                break;

            default:
                break;
        }

        if (level !== 3) {
            // Generate 5 options including the answer
            opts.push(q.answer);
            while (opts.length < 5) {
                let r = Math.floor(Math.random() * 11);
                if (!opts.includes(r)) opts.push(r);
            }
            setOptions(opts.sort((a, b) => a - b));
        } else {
            setOptions(opts);
        }
        setQuestion(q);

        if (voiceEnabled) {
            const utterance = new SpeechSynthesisUtterance(q.text);
            window.speechSynthesis.speak(utterance);
        }
    }, [level, voiceEnabled]);

    useEffect(() => {
        if (!showLevelModal && !showBadge) {
            generateQuestion();
        }
    }, [level, generateQuestion, showLevelModal, showBadge]);

    const handleAnswer = (val) => {
        if (typeof val === 'object' ? val.id === question.answer.id : val === question.answer) {
            setFeedback("correct");
            setStars(s => s + 1);
            setStarsInLevel(s => s + 1);
            setCoins(c => c + 10);

            if (level === 7) {
                setBees([]);
            }

            if (level === 8) {
                setRain(Array(15).fill(0).map(() => ({ id: Math.random(), left: Math.random() * 100 })));
                setTimeout(() => setRain([]), 1500);
            }

            // Grow a plant every 3 correct answers
            if ((stars + 1) % 3 === 0) {
                const plants = ["🌼", "🌻", "🌸", "🌿", "🥦", "🍎", "🍓"];
                setGarden([...garden, plants[Math.floor(Math.random() * plants.length)]]);
            }

            setTimeout(() => {
                // target 5 stars per level
                if (starsInLevel + 1 >= 5) {
                    setShowLevelModal(true);
                } else {
                    generateQuestion();
                }
            }, 1000);
        } else {
            setFeedback("wrong");
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    const jumpToLevel = (id) => {
        setLevel(id);
        setStarsInLevel(0);
        setFeedback(null);
        setWateredCount(0);
        setShowLevelModal(false);
        setBees([]);
        setRain([]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (level === 8) {
            const newCount = wateredCount + 1;
            setWateredCount(newCount);

            // Trigger rain effect on drop
            setRain(Array(10).fill(0).map(() => ({ id: Math.random(), left: Math.random() * 100 })));
            setTimeout(() => setRain([]), 1000);

            if (newCount === question.answer) {
                handleAnswer(newCount);
            }
        }
    };

    const handleNextLevel = () => {
        setStarsInLevel(0);
        setShowLevelModal(false);
        if (level < LEVELS.length) {
            setLevel(level + 1);
        } else {
            setShowBadge(true);
        }
    };

    const handleRedoLevel = () => {
        setStarsInLevel(0);
        setShowLevelModal(false);
        generateQuestion();
    };

    const resetGame = () => {
        setLevel(1);
        setStars(0);
        setStarsInLevel(0);
        setCoins(0);
        setGarden([]);
        setShowBadge(false);
        setShowLevelModal(false);
    };

    if (showBadge) {
        return (
            <div className="master-badge-overlay">
                <div className="confetti-container">
                    {["✨", "🌈", "🦋", "🌸", "⭐", "🎉", "🍬"].map((e, i) => (
                        <div key={i} className="confetti-emoji" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            fontSize: `${1.5 + Math.random() * 2}rem`
                        }}>{e}</div>
                    ))}
                </div>
                <div className="master-badge enhanced">
                    <div className="badge-ribbon">🏆</div>
                    <h1>Master Gardener!</h1>
                    <div className="final-stats">
                        <div className="final-stat">⭐ {stars} Stars</div>
                        <div className="final-stat">🪙 {coins} Coins</div>
                    </div>
                    <p>Congratulations! You've used your amazing math magic to grow the most beautiful garden ever !✨</p>
                    <div className="modal-buttons horizontal">
                        <button className="modal-btn primary" onClick={resetGame}>
                            <span className="btn-icon">🌱</span> Play Again
                        </button>
                        <button className="modal-btn danger" onClick={() => history.push("/")}>
                            <span className="btn-icon">🏠</span> Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="math-garden-container">
            <div className="game-header">
                <h1>🌱 Math Garden</h1>
                <div className="stats-bar">
                    <div className="stat-item">⭐ {stars}</div>
                    <div className="stat-item">🪙 {coins}</div>
                    <div className="stat-item">Lvl {level}</div>
                </div>
            </div>

            <div className="main-game-layout">
                <div className="game-content">
                    <div
                        className={`garden-view ${isDragging ? 'drop-target' : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <div className="plants-container">
                            {garden.map((p, i) => (
                                <div key={i} className="plant">{p}</div>
                            ))}
                        </div>
                        {bees.map(b => (
                            <div key={b.id} className="bee" style={{ top: b.top, left: b.left }}>🐝</div>
                        ))}
                        {rain.map(r => (
                            <div key={r.id} className="rain-drop" style={{ left: `${r.left}%` }}>💧</div>
                        ))}
                        <div className="ground"></div>
                    </div>

                    <div className="game-card">
                        {question && (
                            <>
                                <div className="question-text">{question.text}</div>
                                <div className="visual-area">
                                    {level === 7 ? null : question.visual.map((v, i) => (
                                        <span key={i} style={level === 8 && i < wateredCount ? { opacity: 0.3 } : {}}>{v}</span>
                                    ))}
                                </div>
                                <div className="options-grid" style={level === 3 ? { gridTemplateColumns: 'repeat(2, 1fr)' } : (level === 8 ? { display: 'flex', justifyContent: 'center' } : {})}>
                                    {level === 8 ? (
                                        <div
                                            className="draggable-bucket"
                                            draggable
                                            onDragStart={() => setIsDragging(true)}
                                            onDragEnd={() => setIsDragging(false)}
                                        >
                                            🪣
                                        </div>
                                    ) : (
                                        options.map((opt, i) => (
                                            <button
                                                key={i}
                                                className={`option-btn ${feedback === 'correct' && (typeof opt === 'object' ? opt.id === question.answer.id : opt === question.answer) ? 'correct' : ''} ${feedback === 'wrong' && (typeof opt === 'object' ? opt.id !== question.answer.id : opt !== question.answer) ? 'wrong' : ''}`}
                                                onClick={() => handleAnswer(opt)}
                                            >
                                                {typeof opt === 'object' ? <span style={{ fontSize: opt.size }}>{opt.label}</span> : opt}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </>
                        )}

                        <div className="controls">
                            <button className="control-btn" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                                {voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off"}
                            </button>
                            <button className="control-btn" onClick={generateQuestion}>
                                Shuffle Question
                            </button>
                            <button className="control-btn" style={{ background: '#EF9A9A' }} onClick={() => history.push("/")}>
                                Exit Game
                            </button>
                        </div>
                    </div>
                </div>

                <div className="level-sidebar">
                    <h3 className="sidebar-title">All Levels</h3>
                    <div className="level-list">
                        {LEVELS.map((lvl) => (
                            <button
                                key={lvl.id}
                                className={`sidebar-level-btn ${level === lvl.id ? 'active' : ''}`}
                                onClick={() => jumpToLevel(lvl.id)}
                            >
                                <span className="lvl-num">{lvl.id}</span>
                                <span className="lvl-name">{lvl.name}</span>
                                {level > lvl.id && <span className="lvl-check">✅</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {showLevelModal && (
                <div className="level-modal-overlay">
                    <div className="level-modal">
                        <h2>Level {level} Complete! 🌟</h2>
                        <div className="stars-earned">⭐ {starsInLevel}</div>
                        <p>You're doing great!</p>
                        <div className="modal-buttons">
                            <button className="modal-btn primary" onClick={handleNextLevel}>
                                {level < LEVELS.length ? "Continue to Level " + (level + 1) + " 🚀" : "Finish Journey! 🌈"}
                            </button>
                            <button className="modal-btn secondary" onClick={handleRedoLevel}>
                                Redo Level {level} 🔄
                            </button>
                            <button className="modal-btn danger" onClick={() => history.push("/")}>
                                Back to Dashboard 🏠
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MathGarden;
