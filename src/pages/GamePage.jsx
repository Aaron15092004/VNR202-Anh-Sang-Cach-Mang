import { useEffect, useRef, useState } from "react";
import BackHomeButton from "../components/common/BackHomeButton";
import "../styles/game/GamePage.css";

const DIFFICULTIES = {
  easy: {
    label: "Dễ",
    subtitle: "Trận đầu đánh thắng",
    ammo: 42,
    lives: 5,
    spawnEvery: 1300,
    bossBombEvery: 1700,
    bossHp: 20,
    waves: [
      { name: "Mở màn", requiredKills: 6, spawnBudget: 9, speedMin: 0.18, speedMax: 0.28, wobble: 1.3, bombChance: 0.04 },
      { name: "Đầu cầu", requiredKills: 8, spawnBudget: 11, speedMin: 0.2, speedMax: 0.3, wobble: 1.8, bombChance: 0.06 },
      { name: "Vây lưới", requiredKills: 10, spawnBudget: 14, speedMin: 0.22, speedMax: 0.34, wobble: 2.2, bombChance: 0.08 },
    ],
  },
  medium: {
    label: "Vừa",
    subtitle: "Hải Phòng rực lửa",
    ammo: 34,
    lives: 4,
    spawnEvery: 1050,
    bossBombEvery: 1450,
    bossHp: 24,
    waves: [
      { name: "Đột phá", requiredKills: 8, spawnBudget: 12, speedMin: 0.22, speedMax: 0.33, wobble: 2.0, bombChance: 0.08 },
      { name: "Xung kích", requiredKills: 11, spawnBudget: 15, speedMin: 0.25, speedMax: 0.38, wobble: 2.8, bombChance: 0.12 },
      { name: "Điểm hỏa", requiredKills: 14, spawnBudget: 18, speedMin: 0.28, speedMax: 0.42, wobble: 3.0, bombChance: 0.16 },
    ],
  },
  hard: {
    label: "Khó",
    subtitle: "Điện Biên Phủ trên không",
    ammo: 28,
    lives: 3,
    spawnEvery: 780,
    bossBombEvery: 1150,
    bossHp: 28,
    waves: [
      { name: "Mưa lửa", requiredKills: 10, spawnBudget: 14, speedMin: 0.28, speedMax: 0.42, wobble: 3.2, bombChance: 0.14 },
      { name: "Cao xạ", requiredKills: 13, spawnBudget: 18, speedMin: 0.32, speedMax: 0.48, wobble: 4.2, bombChance: 0.18 },
      { name: "Đêm đỏ", requiredKills: 16, spawnBudget: 21, speedMin: 0.36, speedMax: 0.54, wobble: 4.8, bombChance: 0.22 },
    ],
  },
  impossible: {
    label: "Bất khả thi",
    subtitle: "Lưới lửa hành tinh",
    ammo: 24,
    lives: 2,
    spawnEvery: 520,
    bossBombEvery: 900,
    bossHp: 34,
    waves: [
      { name: "Siêu tốc", requiredKills: 12, spawnBudget: 16, speedMin: 0.36, speedMax: 0.58, wobble: 5.2, bombChance: 0.2 },
      { name: "Nhiễu loạn", requiredKills: 15, spawnBudget: 20, speedMin: 0.4, speedMax: 0.64, wobble: 6.2, bombChance: 0.24 },
      { name: "Ziczac", requiredKills: 18, spawnBudget: 24, speedMin: 0.44, speedMax: 0.7, wobble: 7.2, bombChance: 0.28 },
    ],
  },
};

const QUOTES = [
  "Dù Mỹ có B-52... chúng ta cũng quyết đánh, mà đã đánh là phải thắng.",
  "Không có gì quý hơn độc lập, tự do.",
  "Kỷ luật là sức mạnh của quân đội.",
];

const SPRITES = {
  fighter: "/game-assets/real/fighter.png",
  bomber: "/game-assets/real/bomber.png",
  dove: "/game-assets/dove.png",
  medic: "/game-assets/medic.png",
  supply: "/game-assets/supply.png",
  bomb: "/game-assets/real/bomb.png",
  boom: "/game-assets/real/boom.png",
  cannon: "/game-assets/real/cannon.png",
  runner: "/game-assets/real/runner.gif",
};

const RUNNER_BEST_KEY = "hcm202-runner-best";
const RUNNER_GOAL_DISTANCE = 2000;
const RUNNER_GROUND_TOP = 64;
const RUNNER_DUCK_TOP = 73;
const RUNNER_PLAYER_LEFT = 14.5;
const RUNNER_PLAYER_WIDTH = 14;
const RUNNER_PLAYER_HEIGHT = 23;
const RUNNER_DUCK_HEIGHT = 13;

const getStoredRunnerBest = () => {
  try {
    const value = window.localStorage.getItem(RUNNER_BEST_KEY);
    return Number(value || 0) || 0;
  } catch {
    return 0;
  }
};

const setStoredRunnerBest = (value) => {
  try {
    window.localStorage.setItem(RUNNER_BEST_KEY, String(Math.floor(value)));
  } catch {
    // Ignore storage failures in private browsing or blocked storage contexts.
  }
};

const randomBetween = (min, max) => min + Math.random() * (max - min);

const rectsOverlap = (a, b) =>
  a.left < b.left + b.width &&
  a.left + a.width > b.left &&
  a.top < b.top + b.height &&
  a.top + a.height > b.top;

const createInitialGame = (difficultyKey) => {
  const config = DIFFICULTIES[difficultyKey];
  return {
    phase: "menu",
    difficultyKey,
    waveIndex: 0,
    enemySpawnedThisWave: 0,
    enemyKilledThisWave: 0,
    lives: config.lives,
    ammo: config.ammo,
    score: 0,
    bossHp: config.bossHp,
    entities: [],
    lastEvent: "Chọn độ khó rồi bấm bắt đầu.",
    shots: 0,
    hits: 0,
    shakeTick: 0,
    flashTick: 0,
    cursor: { x: 50, y: 50, visible: false },
  };
};

const createEnemy = (difficultyKey, waveIndex) => {
  const config = DIFFICULTIES[difficultyKey];
  const wave = config.waves[waveIndex];
  const fromLeft = Math.random() > 0.5;
  const useBomber = Math.random() < wave.bombChance;
  const bomber = useBomber || (waveIndex === 2 && Math.random() < 0.25);
  const kind = bomber ? "bomber" : "fighter";
  const direction = fromLeft ? 1 : -1;
  const baseY = randomBetween(12, 54);
  const flipX = kind === "fighter" ? direction === 1 : direction === -1;

  return {
    id: crypto.randomUUID(),
    kind,
    sprite: kind,
    x: fromLeft ? -12 : 112,
    y: baseY,
    renderX: fromLeft ? -12 : 112,
    renderY: baseY,
    baseY,
    size: bomber ? 17 : 12,
    height: bomber ? 10 : 7,
    vx: direction * randomBetween(wave.speedMin, wave.speedMax),
    sway: randomBetween(1.6, wave.wobble),
    phase: randomBetween(0, Math.PI * 2),
    age: 0,
    direction,
    flipX,
    hp: bomber ? 2 : 1,
    points: bomber ? 180 : 100,
  };
};

const createPickup = () => {
  const kindRoll = Math.random();
  const kind = kindRoll < 0.42 ? "supply" : kindRoll < 0.7 ? "medic" : "dove";
  const fromLeft = Math.random() > 0.5;
  const config = {
    supply: { size: 10, height: 10, bonusAmmo: 5, bonusLives: 0, danger: false },
    medic: { size: 10, height: 8, bonusAmmo: 0, bonusLives: 1, danger: false },
    dove: { size: 10, height: 8, bonusAmmo: 0, bonusLives: 0, danger: true },
  }[kind];

  return {
    id: crypto.randomUUID(),
    kind,
    sprite: kind,
    x: fromLeft ? -10 : 110,
    y: randomBetween(18, 44),
    renderX: fromLeft ? -10 : 110,
    renderY: randomBetween(18, 44),
    baseY: randomBetween(18, 44),
    size: config.size,
    height: config.height,
    vx: fromLeft ? randomBetween(0.12, 0.22) : randomBetween(-0.22, -0.12),
    sway: randomBetween(1.3, 2.8),
    phase: randomBetween(0, Math.PI * 2),
    age: 0,
    lastDrop: randomBetween(0, 900),
    flipX: false,
    bonusAmmo: config.bonusAmmo,
    bonusLives: config.bonusLives,
    danger: config.danger,
  };
};

const createBoss = () => ({
  id: crypto.randomUUID(),
  kind: "boss",
  sprite: "bomber",
  x: 50,
  y: 18,
  renderX: 50,
  renderY: 18,
  baseY: 18,
  size: 26,
  height: 16,
  vx: 0.04,
  sway: 1.2,
  phase: randomBetween(0, Math.PI * 2),
  age: 0,
  lastDrop: 0,
  flipX: false,
  hp: 24,
});

const createRunnerObstacle = (speed) => {
  const roll = Math.random();
  const kind = roll < 0.5 ? "ground" : roll < 0.82 ? "air" : "bomb";

  if (kind === "ground") {
    return {
      id: crypto.randomUUID(),
      kind,
      sprite: "cannon",
      x: 114,
      top: 73.5,
      width: 12.5,
      height: 11.8,
      speed: speed * randomBetween(1.02, 1.16),
      rotation: randomBetween(-4, 4),
    };
  }

  if (kind === "air") {
    return {
      id: crypto.randomUUID(),
      kind,
      sprite: "fighter",
      x: 114,
      top: 55,
      width: 14,
      height: 8.8,
      speed: speed * randomBetween(1.08, 1.24),
      rotation: randomBetween(-8, 8),
    };
  }

  return {
    id: crypto.randomUUID(),
    kind,
    sprite: "bomb",
    x: 114,
    top: 39,
    width: 9,
    height: 12.2,
    speed: speed * randomBetween(0.98, 1.1),
    rotation: randomBetween(-12, 12),
  };
};

const createRunnerInitialState = () => ({
  phase: "ready",
  distance: 0,
  bestDistance: getStoredRunnerBest(),
  speed: 30,
  playerTop: RUNNER_GROUND_TOP,
  playerVy: 0,
  isDucking: false,
  safeUntil: 0,
  obstacles: [],
  spawnCooldown: 820,
  shakeTick: 0,
  flashTick: 0,
  lastEvent: "Nhấn bắt đầu để đưa giao liên vượt lưới lửa.",
  quoteIndex: 0,
});

function AirDefenseGame({ onBackToMenu }) {
  const [difficultyKey, setDifficultyKey] = useState("easy");
  const [game, setGame] = useState(() => createInitialGame("easy"));
  const boardRef = useRef(null);
  const lastTimeRef = useRef(0);

  const difficulty = DIFFICULTIES[game.difficultyKey];
  const currentWave = difficulty.waves[game.waveIndex] || null;
  const boardLives = Math.max(0, game.lives);

  const beginGame = (key = difficultyKey) => {
    setDifficultyKey(key);
    setGame({
      ...createInitialGame(key),
      phase: "playing",
      lastEvent: `Bắt đầu chiến dịch - ${DIFFICULTIES[key].label}.`,
    });
  };

  const restartGame = () => {
    beginGame(game.difficultyKey);
  };

  const addEffect = (x, y, text, kind = "hit") => {
    const id = crypto.randomUUID();
    setGame((prev) => ({
      ...prev,
      entities: [
        ...prev.entities,
        {
          id,
          kind: "boom",
          sprite: "boom",
          x,
          y,
          size: kind === "miss" ? 8 : 10,
          height: kind === "miss" ? 8 : 10,
          ttl: 420,
          text,
        },
      ],
    }));

    window.setTimeout(() => {
      setGame((prev) => ({
        ...prev,
        entities: prev.entities.filter((entity) => entity.id !== id),
      }));
    }, 450);
  };

  const handleBoardClick = (event) => {
    if (game.phase !== "playing" || game.ammo <= 0) return;
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setGame((prev) => {
      if (prev.phase !== "playing" || prev.ammo <= 0) return prev;
      let nextAmmo = prev.ammo - 1;
      const hasHostiles = prev.entities.some(
        (entity) => entity.kind === "fighter" || entity.kind === "bomber" || entity.kind === "boss",
      );
      const nextPhase = nextAmmo <= 0 && hasHostiles ? "defeat" : prev.phase;
      if (nextPhase === "defeat") {
        return {
          ...prev,
          phase: nextPhase,
          ammo: nextAmmo,
          shots: prev.shots + 1,
          lastEvent: "Hết đạn giữa trận, lưới lửa bị chặn lại.",
          entities: [],
        };
      }

      return {
        ...prev,
        ammo: nextAmmo,
        shots: prev.shots + 1,
        lastEvent: "Bắn trượt, phải giữ nhịp ngắm tốt hơn.",
      };
    });

    addEffect(x, y, "MISS", "miss");
  };

  const handleEntityClick = (entity, event) => {
    event.stopPropagation();
    if (game.phase !== "playing" || game.ammo <= 0) return;

    const x = entity.x;
    const y = entity.y;

    setGame((prev) => {
      if (prev.phase !== "playing" || prev.ammo <= 0) return prev;
      let nextAmmo = prev.ammo - 1;
      let nextEntities = prev.entities;
      let nextScore = prev.score;
      let nextLives = prev.lives;
      let nextWaveKills = prev.enemyKilledThisWave;
      let nextPhase = prev.phase;
      let nextBossHp = prev.bossHp;
      let nextLastEvent = prev.lastEvent;
      let nextHits = prev.hits + 1;
      let nextShakeTick = prev.shakeTick;
      let nextFlashTick = prev.flashTick;

      const removeEntity = (id) => {
        nextEntities = nextEntities.filter((item) => item.id !== id);
      };

      if (entity.kind === "dove") {
        nextPhase = "defeat";
        nextLastEvent = "Bắn nhầm dân thường, kỷ luật chiến đấu bị phá vỡ.";
        nextEntities = [];
      } else if (entity.kind === "medic") {
        nextLives = Math.min(DIFFICULTIES[prev.difficultyKey].lives, nextLives + 1);
        nextScore += 35;
        nextLastEvent = "Tiếp tế tới kịp, thêm một mạng và thêm khí thế.";
        removeEntity(entity.id);
      } else if (entity.kind === "supply") {
        nextAmmo += 5;
        nextScore += 40;
        nextLastEvent = "Hũ gạo cứu quốc đến tay tiền tuyến.";
        removeEntity(entity.id);
      } else if (entity.kind === "bomb") {
        nextScore += 20;
        nextLastEvent = "Chặn được một quả bom.";
        nextShakeTick += 1;
        nextFlashTick += 1;
        removeEntity(entity.id);
      } else if (entity.kind === "boss") {
        nextBossHp = Math.max(0, nextBossHp - 1);
        nextScore += 30;
        nextLastEvent = "Đạn trúng B-52!";
        if (nextBossHp <= 0) {
          nextPhase = "victory";
          nextLastEvent = "Đã hạ pháo đài bay B-52.";
          nextEntities = [];
        } else {
          nextEntities = prev.entities.map((item) =>
            item.id === entity.id ? { ...item, hp: nextBossHp } : item,
          );
        }
      } else if (entity.kind === "bomber") {
        const nextHp = Math.max(0, (entity.hp || 1) - 1);
        nextScore += nextHp === 0 ? 180 : 40;
        nextLastEvent = nextHp === 0 ? "Máy bay địch bị hạ." : "Trúng đòn, bomber rung lắc!";
        if (nextHp <= 0) {
          removeEntity(entity.id);
          nextWaveKills += 1;
          nextFlashTick += 1;
        } else {
          nextEntities = prev.entities.map((item) =>
            item.id === entity.id ? { ...item, hp: nextHp } : item,
          );
        }
      } else if (entity.kind === "fighter") {
        nextScore += 100;
        nextWaveKills += 1;
        nextLastEvent = "Máy bay bị bắn hạ.";
        nextFlashTick += 1;
        removeEntity(entity.id);
      }

      if (
        nextAmmo <= 0 &&
        nextEntities.some(
          (item) => item.kind === "fighter" || item.kind === "bomber" || item.kind === "boss",
        )
      ) {
        nextPhase = "defeat";
        nextLastEvent = "Hết đạn khi trên trời vẫn còn địch.";
        nextEntities = [];
      }

      return {
        ...prev,
        ammo: nextAmmo,
        score: nextScore,
        lives: nextLives,
        enemyKilledThisWave: nextWaveKills,
        bossHp: nextBossHp,
        phase: nextPhase,
        hits: nextHits,
        shakeTick: nextShakeTick,
        flashTick: nextFlashTick,
        entities: nextEntities,
        lastEvent: nextLastEvent,
      };
    });

    addEffect(x, y, "HIT", "hit");
  };

  useEffect(() => {
    if (game.phase !== "playing") return undefined;

    const spawnInterval = window.setInterval(() => {
      setGame((prev) => {
        if (prev.phase !== "playing") return prev;
        const config = DIFFICULTIES[prev.difficultyKey];
        const wave = config.waves[prev.waveIndex];
        if (!wave) return prev;
        if (prev.enemySpawnedThisWave >= wave.spawnBudget) return prev;

        const enemy = createEnemy(prev.difficultyKey, prev.waveIndex);
        return {
          ...prev,
          enemySpawnedThisWave: prev.enemySpawnedThisWave + 1,
          entities: [...prev.entities, enemy],
          lastEvent: wave.name,
        };
      });
    }, difficulty.spawnEvery);

    return () => window.clearInterval(spawnInterval);
  }, [game.phase, game.difficultyKey, game.waveIndex, difficulty.spawnEvery]);

  useEffect(() => {
    if (game.phase !== "playing") return undefined;

    const dropInterval = window.setInterval(() => {
      setGame((prev) => {
        if (prev.phase !== "playing") return prev;
        if (prev.waveIndex >= DIFFICULTIES[prev.difficultyKey].waves.length) return prev;
        if (Math.random() > 0.22) return prev;
        const pickup = createPickup();
        return {
          ...prev,
          entities: [...prev.entities, pickup],
        };
      });
    }, 2600);

    return () => window.clearInterval(dropInterval);
  }, [game.phase, game.difficultyKey, game.waveIndex]);

  useEffect(() => {
    if (game.phase !== "playing" || game.waveIndex < difficulty.waves.length) return undefined;

    const bombInterval = window.setInterval(() => {
      setGame((prev) => {
        if (prev.phase !== "playing") return prev;
        const boss = prev.entities.find((entity) => entity.kind === "boss");
        if (!boss) return prev;
        const bomb = {
          id: crypto.randomUUID(),
          kind: "bomb",
          sprite: "bomb",
          x: boss.x + randomBetween(-4, 4),
          y: boss.y + 8,
          size: 4.2,
          height: 7,
          vx: randomBetween(-0.02, 0.02),
          vy: randomBetween(0.28, 0.42),
          age: 0,
        };
        return {
          ...prev,
          entities: [...prev.entities, bomb],
        };
      });
    }, difficulty.bossBombEvery);

    return () => window.clearInterval(bombInterval);
  }, [game.phase, game.difficultyKey, game.waveIndex, difficulty.bossBombEvery, difficulty.waves.length]);

  useEffect(() => {
    if (game.phase !== "playing") return undefined;

    let rafId = 0;
    const tick = (time) => {
      const lastTime = lastTimeRef.current || time;
      const dt = Math.min(48, time - lastTime);
      lastTimeRef.current = time;

      setGame((prev) => {
        if (prev.phase !== "playing") return prev;

        const config = DIFFICULTIES[prev.difficultyKey];
        const wave = config.waves[prev.waveIndex];
        let nextLives = prev.lives;
        let nextBossHp = prev.bossHp;
        let nextPhase = prev.phase;
        let nextEntities = [];
        let nextShakeTick = prev.shakeTick;
        let nextFlashTick = prev.flashTick;

        prev.entities.forEach((entity) => {
          const next = { ...entity };
          next.age = (next.age || 0) + dt;

          if (entity.kind === "fighter" || entity.kind === "bomber") {
            next.x += next.vx * (dt / 16.666);
            next.y = next.baseY + Math.sin(next.age / 240 + next.phase) * next.sway;
            if (entity.kind === "bomber") {
              next.y += Math.sin(next.age / 360 + next.phase) * 0.8;
              if (next.age - (next.lastDrop || 0) > 1350 && Math.random() < 0.42) {
                next.lastDrop = next.age;
                nextEntities.push({
                  id: crypto.randomUUID(),
                  kind: "bomb",
                  sprite: "bomb",
                  x: next.x + randomBetween(-2, 2),
                  y: next.y + 8,
                  size: 9,
                  height: 12,
                  vx: randomBetween(-0.05, 0.05),
                  vy: randomBetween(0.18, 0.28),
                  age: 0,
                });
              }
            }

            if (next.x < -18 || next.x > 118) {
              nextLives -= 1;
              nextShakeTick += 1;
              nextFlashTick += 1;
              nextEntities.push({
                id: crypto.randomUUID(),
                kind: "boom",
                sprite: "boom",
                x: Math.max(6, Math.min(94, next.x)),
                y: Math.max(14, Math.min(74, next.y)),
                size: 9,
                height: 9,
                ttl: 360,
                text: "Hở lưới",
              });
              return;
            }

            next.renderX = next.renderX == null ? next.x : next.renderX + (next.x - next.renderX) * 0.28;
            next.renderY = next.renderY == null ? next.y : next.renderY + (next.y - next.renderY) * 0.28;
            nextEntities.push(next);
            return;
          }

          if (entity.kind === "bomb") {
            next.x += next.vx * (dt / 16.666);
            next.y += next.vy * (dt / 16.666);
            if (next.y > 94) {
              nextLives -= 1;
              nextShakeTick += 1;
              nextFlashTick += 1;
              nextEntities.push({
                id: crypto.randomUUID(),
                kind: "boom",
                sprite: "boom",
                x: next.x,
                y: 94,
                size: 13,
                height: 13,
                ttl: 350,
                text: "Bộp",
              });
              return;
            }
            next.renderX = next.renderX == null ? next.x : next.renderX + (next.x - next.renderX) * 0.34;
            next.renderY = next.renderY == null ? next.y : next.renderY + (next.y - next.renderY) * 0.34;
            nextEntities.push(next);
            return;
          }

          if (entity.kind === "boss") {
            next.x += next.vx * (dt / 16.666);
            if (next.x < 38 || next.x > 62) {
              next.vx *= -1;
            }
            next.y = next.baseY + Math.sin(next.age / 320 + next.phase) * 1.6;
            next.flipX = next.vx < 0;
            next.renderX = next.renderX == null ? next.x : next.renderX + (next.x - next.renderX) * 0.24;
            next.renderY = next.renderY == null ? next.y : next.renderY + (next.y - next.renderY) * 0.24;
            next.hp = nextBossHp;
            nextEntities.push(next);
            return;
          }

          if (entity.kind === "dove" || entity.kind === "medic" || entity.kind === "supply") {
            next.x += next.vx * (dt / 16.666);
            next.y = next.baseY + Math.sin(next.age / 260 + next.phase) * next.sway;
            if (next.x < -16 || next.x > 116) return;
            next.renderX = next.renderX == null ? next.x : next.renderX + (next.x - next.renderX) * 0.3;
            next.renderY = next.renderY == null ? next.y : next.renderY + (next.y - next.renderY) * 0.3;
            nextEntities.push(next);
            return;
          }

          if (entity.kind === "boom") {
            next.ttl -= dt;
            if (next.ttl > 0) {
              next.renderX = next.renderX == null ? next.x : next.renderX + (next.x - next.renderX) * 0.35;
              next.renderY = next.renderY == null ? next.y : next.renderY + (next.y - next.renderY) * 0.35;
              nextEntities.push(next);
            }
          }
        });

        const boss = nextEntities.find((item) => item.kind === "boss");
        if (wave && prev.enemyKilledThisWave >= wave.requiredKills) {
          const hasEnemy = nextEntities.some((item) => item.kind === "fighter" || item.kind === "bomber");
          const hasHostiles = nextEntities.some(
            (item) => item.kind === "fighter" || item.kind === "bomber" || item.kind === "bomb",
          );
          if (!hasEnemy && !hasHostiles && prev.enemySpawnedThisWave >= wave.requiredKills) {
            nextEntities = nextEntities.filter((item) => item.kind !== "boom");
            return {
              ...prev,
              entities: nextEntities,
              waveIndex: prev.waveIndex + 1,
              enemySpawnedThisWave: 0,
              enemyKilledThisWave: 0,
              lives: nextLives,
              bossHp: nextBossHp,
              shakeTick: nextShakeTick,
              flashTick: nextFlashTick,
              lastEvent: `${wave.name} đã hoàn tất.`,
            };
          }
        }

        if (prev.waveIndex >= config.waves.length && !boss) {
          const nextBoss = createBoss();
          nextBoss.hp = prev.bossHp;
          nextEntities.push(nextBoss);
          return {
            ...prev,
            entities: nextEntities,
            lives: nextLives,
            bossSpawned: true,
            bossHp: nextBossHp,
            shakeTick: nextShakeTick,
            flashTick: nextFlashTick,
            lastEvent: "B-52 xuất hiện trên bầu trời.",
          };
        }

        if (nextLives <= 0) {
          nextPhase = "defeat";
          nextEntities = [];
          return {
            ...prev,
            lives: 0,
            entities: nextEntities,
            phase: nextPhase,
            shakeTick: nextShakeTick + 1,
            flashTick: nextFlashTick + 1,
            lastEvent: "Hết mạng. Mặt đất không còn giữ được lưới lửa.",
          };
        }

        const hostilesLeft = nextEntities.some(
          (item) => item.kind === "fighter" || item.kind === "bomber" || item.kind === "boss" || item.kind === "bomb",
        );
        if (prev.ammo <= 0 && hostilesLeft) {
          nextPhase = "defeat";
          nextEntities = [];
          return {
            ...prev,
            lives: nextLives,
            entities: nextEntities,
            phase: nextPhase,
            shakeTick: nextShakeTick + 1,
            flashTick: nextFlashTick + 1,
            lastEvent: "Hết đạn khi địch vẫn còn trên không.",
          };
        }

        if (boss && nextBossHp <= 0) {
          nextPhase = "victory";
          nextEntities = [];
          return {
            ...prev,
            phase: nextPhase,
            entities: nextEntities,
            lives: nextLives,
            bossHp: 0,
            shakeTick: nextShakeTick,
            flashTick: nextFlashTick + 1,
            lastEvent: "Pháo đài bay đã bị hạ.",
          };
        }

        return {
          ...prev,
          entities: nextEntities,
          lives: nextLives,
          bossHp: nextBossHp,
          shakeTick: nextShakeTick,
          flashTick: nextFlashTick,
        };
      });

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [game.phase, game.difficultyKey]);

  useEffect(() => {
    const moveCursor = (event) => {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setGame((prev) => ({
        ...prev,
        cursor: {
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          visible: true,
        },
      }));
    };

    const hideCursor = () => {
      setGame((prev) => ({
        ...prev,
        cursor: { ...prev.cursor, visible: false },
      }));
    };

    const board = boardRef.current;
    board?.addEventListener("mousemove", moveCursor);
    board?.addEventListener("mouseleave", hideCursor);
    return () => {
      board?.removeEventListener("mousemove", moveCursor);
      board?.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  const difficultyButtons = Object.entries(DIFFICULTIES);

  const boardFill = `${Math.max(0, Math.min(100, (boardLives / Math.max(1, difficulty.lives)) * 100))}%`;

  return (
    <div className="air-defense-page">
      <BackHomeButton className="air-defense-home" label="Trang chủ" />

      <header className="air-defense-topbar">
        <div className="air-defense-brand">
          <img src="/logo-HCM.svg" alt="Logo HCM202" className="air-defense-brand-logo" />
          <div>
            <span>Lưới lửa phòng không</span>
            <h1>Game phản xạ HCM202</h1>
          </div>
        </div>

        <div className="air-defense-topbar-actions">
          <div className="air-defense-topbar-difficulties" role="tablist" aria-label="Chọn độ khó">
            {difficultyButtons.map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={`air-defense-mode ${game.difficultyKey === key ? "active" : ""}`}
                onClick={() => {
                  setDifficultyKey(key);
                  setGame(createInitialGame(key));
                }}
              >
                <strong>{item.label}</strong>
                <span>{item.subtitle}</span>
              </button>
            ))}
          </div>

          <div className="air-defense-actions">
            <button
              type="button"
              className="air-defense-start"
              onClick={() => beginGame(game.difficultyKey)}
            >
              {game.phase === "playing" ? "Chơi lại" : "Bắt đầu"}
            </button>
            <button type="button" className="air-defense-ghost" onClick={restartGame}>
              Đặt lại
            </button>
            {onBackToMenu ? (
              <button type="button" className="air-defense-ghost" onClick={onBackToMenu}>
                Chọn game khác
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="air-defense-main">
        <aside className="air-defense-side air-defense-side-left">
          <section className="air-defense-stat-panel">
            <span className="air-defense-side-label">Trạng thái</span>
            <div className="air-defense-stat-grid">
              <div className="air-defense-stat">
                <span>Độ khó</span>
                <strong>{difficulty.label}</strong>
              </div>
              <div className="air-defense-stat">
                <span>Mạng</span>
                <strong>{boardLives}</strong>
              </div>
              <div className="air-defense-stat">
                <span>Đạn</span>
                <strong>{game.ammo}</strong>
              </div>
              <div className="air-defense-stat">
                <span>Điểm</span>
                <strong>{game.score}</strong>
              </div>
            </div>

            <div className="air-defense-progress">
              <div className="air-defense-progress-track">
                <span style={{ width: boardFill }} />
              </div>
              <small>
                {currentWave ? `Màn ${currentWave.name}` : "Boss"}
              </small>
            </div>
          </section>

          <section className="air-defense-quote-panel">
            <h2>Khẩu lệnh</h2>
            <p>{QUOTES[0]}</p>
          </section>

          <section className="air-defense-info-panel">
            <h3>Luật chơi</h3>
            <p>Click vào máy bay địch để bắn hạ. Bắn nhầm dân thường thì thua ngay. Hết đạn hoặc hết mạng cũng kết thúc trận.</p>
          </section>
        </aside>

        <section className="air-defense-stage">
          <div className="air-defense-board-wrap">
            <div className="air-defense-board" ref={boardRef} onClick={handleBoardClick}>
              <div className="air-defense-ambient air-defense-ambient-1" />
              <div className="air-defense-ambient air-defense-ambient-2" />
              <div className="air-defense-ambient air-defense-ambient-3" />
              <div className="air-defense-flak air-defense-flak-1" />
              <div className="air-defense-flak air-defense-flak-2" />
              <div className="air-defense-flak air-defense-flak-3" />
              <div className="air-defense-ground" />
              <div className="air-defense-ground-line" />
              <img className="air-defense-battlefield" src="/game-assets/battlefield.svg" alt="" aria-hidden="true" />
              <img className="air-defense-soldier" src="/game-assets/soldier.svg" alt="" aria-hidden="true" />

              {game.shakeTick ? <div key={game.shakeTick} className="air-defense-impact-shake" /> : null}
              {game.flashTick ? <div key={game.flashTick} className="air-defense-hit-flash" /> : null}

              <img className="air-defense-cannon" src={SPRITES.cannon} alt="" aria-hidden="true" />

              {game.entities.map((entity) => (
                <button
                  key={entity.id}
                  type="button"
                  className={`air-defense-entity ${entity.kind}`}
                  style={{
                    left: `${entity.renderX ?? entity.x}%`,
                    top: `${entity.renderY ?? entity.y}%`,
                    width: `clamp(44px, ${entity.size}vw, ${entity.kind === "boss" ? 240 : 170}px)`,
                    height: `clamp(28px, ${entity.height}vw, ${entity.kind === "boss" ? 130 : 90}px)`,
                  }}
                  onClick={(event) => handleEntityClick(entity, event)}
                  aria-label={entity.kind}
                >
                  <img
                    src={SPRITES[entity.sprite]}
                    alt=""
                    aria-hidden="true"
                    style={{
                      transform: entity.flipX ? "scaleX(-1)" : "scaleX(1)",
                    }}
                  />
                  {entity.kind === "boom" ? <span>{entity.text}</span> : null}
                </button>
              ))}

              <div
                className={`air-defense-crosshair ${game.cursor.visible ? "visible" : ""}`}
                style={{
                  left: `${game.cursor.x}%`,
                  top: `${game.cursor.y}%`,
                }}
              >
                <span />
              </div>

              {game.phase !== "playing" ? (
                <div className={`air-defense-overlay ${game.phase}`}>
                  <div className="air-defense-overlay-card">
                    <div className="air-defense-overlay-art">
                      <img src="/logo-HCM.svg" alt="" />
                    </div>
                    <h2>{game.phase === "victory" ? "Chiến thắng" : "Thất thủ"}</h2>
                    <p>{game.lastEvent}</p>
                    <div className="air-defense-overlay-quote">
                      {QUOTES[game.phase === "victory" ? 1 : 2]}
                    </div>
                    <div className="air-defense-overlay-actions">
                      <button type="button" className="air-defense-start" onClick={() => beginGame(game.difficultyKey)}>
                        Chơi lại
                      </button>
                      <button type="button" className="air-defense-ghost" onClick={() => beginGame("easy")}>
                        Màn dễ
                      </button>
                      {onBackToMenu ? (
                        <button type="button" className="air-defense-ghost" onClick={onBackToMenu}>
                          Về menu
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="air-defense-side air-defense-side-right">
          <section className="air-defense-info-panel">
            <h3>Tiếp tế</h3>
            <p>Bắn trúng hũ gạo cứu quốc, máy bay y tế hoặc tiếp tế để cộng đạn, cộng mạng và giữ nhịp tấn công.</p>
          </section>

          <section className="air-defense-info-panel">
            <h3>Boss</h3>
            <p>Màn cuối xuất hiện B-52. Cần nhiều phát trúng liên tiếp để hạ. Bom rơi xuống đất sẽ làm mất mạng.</p>
          </section>

          <section className="air-defense-event-panel">
            <span className="air-defense-side-label">Diễn biến</span>
            <p>{game.lastEvent}</p>
          </section>
        </aside>
      </main>
    </div>
  );
}

function RunnerGame({ onBackToMenu }) {
  const boardRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [runner, setRunner] = useState(() => createRunnerInitialState());

  const beginRunner = () => {
    setRunner((prev) => ({
      ...createRunnerInitialState(),
      phase: "playing",
      bestDistance: prev.bestDistance,
      quoteIndex: prev.quoteIndex,
      safeUntil: performance.now() + 3200,
      lastEvent: "Nhịp hành quân bắt đầu. Giữ nhịp, giữ mắt, giữ bình tĩnh.",
    }));
  };

  const restartRunner = () => {
    beginRunner();
  };

  const kickRunner = () => {
    setRunner((prev) => {
      if (prev.phase !== "playing") return prev;
      if (prev.playerVy > 0.01 && prev.playerTop < RUNNER_GROUND_TOP - 0.4) {
        return prev;
      }

      return {
        ...prev,
        isDucking: false,
        playerVy: 124,
        playerTop: Math.max(prev.playerTop, RUNNER_GROUND_TOP),
        lastEvent: "Nhảy qua vật cản.",
      };
    });
  };

  const handleRunnerAction = () => {
    if (runner.phase === "playing") {
      kickRunner();
      return;
    }

    beginRunner();
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        if (runner.phase === "playing") {
          kickRunner();
        } else {
          beginRunner();
        }
      }

      if (event.code === "ArrowDown") {
        setRunner((prev) => {
          if (prev.phase !== "playing") return prev;
          return {
            ...prev,
            isDucking: true,
          };
        });
      }
    };

    const onKeyUp = (event) => {
      if (event.code === "ArrowDown") {
        setRunner((prev) => ({
          ...prev,
          isDucking: false,
        }));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [runner.phase]);

  useEffect(() => {
    if (runner.phase !== "playing") {
      lastTimeRef.current = 0;
      return undefined;
    }

    let rafId = 0;

    const tick = (time) => {
      const lastTime = lastTimeRef.current || time;
      const dt = Math.min(48, time - lastTime);
      lastTimeRef.current = time;
      const dtSec = dt / 1000;

      setRunner((prev) => {
        if (prev.phase !== "playing") return prev;

        const targetTop = prev.isDucking ? RUNNER_DUCK_TOP : RUNNER_GROUND_TOP;
        let nextTop = prev.playerTop;
        let nextVy = prev.playerVy;

        if (nextVy !== 0 || Math.abs(nextTop - targetTop) > 0.05) {
          nextTop = prev.playerTop - nextVy * dtSec;
          nextVy -= 175 * dtSec;
        }

        if (nextTop >= targetTop && nextVy <= 0) {
          nextTop = targetTop;
          nextVy = 0;
        }

        const isGracePeriod = time < prev.safeUntil;
        const nextSpeed = Math.min(48, prev.speed + dtSec * 0.68);
        const nextDistance = prev.distance + nextSpeed * dtSec * 0.84;
        let nextSpawnCooldown = prev.spawnCooldown - dt;
        let nextObstacles = prev.obstacles
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - obstacle.speed * dtSec,
          }))
          .filter((obstacle) => obstacle.x > -24);

        if (!isGracePeriod && nextSpawnCooldown <= 0) {
          nextObstacles = [...nextObstacles, createRunnerObstacle(nextSpeed)];
          nextSpawnCooldown = randomBetween(1600, 2400) - Math.min(220, nextSpeed * 2.8);
        }

        const playerRect = {
          left: RUNNER_PLAYER_LEFT,
          top: nextTop - (prev.isDucking ? 9 : 11),
          width: prev.isDucking ? 6.2 : 7.4,
          height: prev.isDucking ? 9 : 11,
        };

        const collided = isGracePeriod
          ? null
          : nextObstacles.find((obstacle) =>
              rectsOverlap(playerRect, {
                left: obstacle.x - obstacle.width / 2 + 0.9,
                top: obstacle.top - obstacle.height / 2 + 0.4,
                width: obstacle.width - 2,
                height: obstacle.height - 1.8,
              }),
            );

        const nextBest = Math.max(prev.bestDistance, nextDistance);
        if (nextBest > prev.bestDistance) {
          setStoredRunnerBest(nextBest);
        }

        if (collided) {
          return {
            ...prev,
            phase: "defeat",
            distance: nextDistance,
            speed: nextSpeed,
            bestDistance: nextBest,
            playerTop: nextTop,
            playerVy: 0,
            obstacles: [],
            spawnCooldown: 820,
            shakeTick: prev.shakeTick + 1,
            flashTick: prev.flashTick + 1,
            lastEvent: "Va chạm với bom đạn trên đường hành quân.",
          };
        }

        if (nextDistance >= RUNNER_GOAL_DISTANCE) {
          return {
            ...prev,
            phase: "victory",
            distance: nextDistance,
            speed: nextSpeed,
            bestDistance: nextBest,
            playerTop: nextTop,
            playerVy: 0,
            obstacles: [],
            spawnCooldown: 820,
            lastEvent: "Đã hoàn thành chặng đường 30 năm tìm đường cứu nước.",
          };
        }

        return {
          ...prev,
          distance: nextDistance,
          speed: nextSpeed,
          bestDistance: nextBest,
          playerTop: nextTop,
          playerVy: nextVy,
          obstacles: nextObstacles,
          spawnCooldown: nextSpawnCooldown,
          lastEvent: isGracePeriod
            ? "Khởi động đội hình. Chưa có vật cản trong vài giây đầu."
            : nextObstacles.length
              ? prev.lastEvent
              : "Đường chạy vẫn đang mở.",
        };
      });

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [runner.phase]);

  const boardFill = `${Math.min(100, (runner.distance / RUNNER_GOAL_DISTANCE) * 100)}%`;
  const runnerStateLabel =
    runner.phase === "playing"
      ? "Đang chạy"
      : runner.phase === "victory"
        ? "Hoàn thành"
        : runner.phase === "defeat"
          ? "Ngã xuống"
          : "Sẵn sàng";

  return (
    <div className="runner-page">
      <BackHomeButton className="air-defense-home" label="Trang chủ" />

      <header className="runner-topbar">
        <div className="runner-brand">
          <img src="/logo-HCM.svg" alt="Logo HCM202" className="runner-brand-logo" />
          <div>
            <span>Giao liên vượt lửa đạn</span>
            <h1>Endless Runner HCM202</h1>
          </div>
        </div>

        <div className="runner-actions">
          <div className="runner-stats">
            <div className="runner-stat">
              <span>Trạng thái</span>
              <strong>{runnerStateLabel}</strong>
            </div>
            <div className="runner-stat">
              <span>Quãng đường</span>
              <strong>{Math.floor(runner.distance)}m</strong>
            </div>
            <div className="runner-stat">
              <span>Kỷ lục</span>
              <strong>{Math.floor(runner.bestDistance)}m</strong>
            </div>
            <div className="runner-stat">
              <span>Tốc độ</span>
              <strong>{runner.speed.toFixed(1)}</strong>
            </div>
          </div>

          <div className="runner-action-buttons">
            <button type="button" className="runner-primary" onClick={handleRunnerAction}>
              {runner.phase === "playing" ? "Nhảy ngay" : "Bắt đầu chạy"}
            </button>
            <button type="button" className="runner-secondary" onClick={restartRunner}>
              Chạy lại
            </button>
            {onBackToMenu ? (
              <button type="button" className="runner-secondary" onClick={onBackToMenu}>
                Về menu
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="runner-main">
        <aside className="runner-side runner-side-left">
          <section className="runner-panel runner-panel-quote">
            <h2>Khẩu lệnh</h2>
            <p>Tuổi nhỏ làm việc nhỏ, tùy theo sức của mình.</p>
          </section>

          <section className="runner-panel">
            <h3>Điều khiển</h3>
            <p>Space hoặc mũi tên lên để nhảy. Giữ mũi tên xuống để cúi. Chạm vào màn hình để bắt đầu hoặc bật nhảy trên mobile.</p>
          </section>

          <section className="runner-panel">
            <h3>Luật chơi</h3>
            <p>Tránh vật cản tầm thấp bằng cú nhảy, tránh vật cản trên cao bằng cúi. Chạm bom đạn là thua ngay.</p>
          </section>
        </aside>

        <section className="runner-stage-wrap">
          <div className="runner-stage-shell">
            <div className="runner-stage" ref={boardRef} onClick={handleRunnerAction} role="button" tabIndex={0}>
              <div className="runner-stage-sky" />
              <div className="runner-stage-glow runner-stage-glow-1" />
              <div className="runner-stage-glow runner-stage-glow-2" />
              <div className="runner-stage-cloud runner-stage-cloud-1" />
              <div className="runner-stage-cloud runner-stage-cloud-2" />
              <img className="runner-stage-backdrop" src="/game-assets/battlefield.png" alt="" aria-hidden="true" />
              <div className="runner-stage-horizon" />
              <div className="runner-stage-ground" />
              <div className="runner-stage-track" />
              <div className="runner-stage-track runner-stage-track-2" />

              {runner.shakeTick ? <div key={runner.shakeTick} className="runner-stage-shake" /> : null}
              {runner.flashTick ? <div key={runner.flashTick} className="runner-stage-flash" /> : null}

              <div
                className={`runner-player ${runner.isDucking ? "ducking" : ""}`}
                style={{
                  left: `${RUNNER_PLAYER_LEFT}%`,
                  top: `${runner.playerTop}%`,
                  width: `${RUNNER_PLAYER_WIDTH}%`,
                  height: `${runner.isDucking ? RUNNER_DUCK_HEIGHT : RUNNER_PLAYER_HEIGHT}%`,
                }}
              >
                <div className="runner-player-shadow" />
                <img src={SPRITES.runner} alt="Người lính đang chạy" aria-hidden="true" />
              </div>

              {runner.obstacles.map((obstacle) => (
                <div
                  key={obstacle.id}
                  className={`runner-obstacle ${obstacle.kind}`}
                  style={{
                    left: `${obstacle.x}%`,
                    top: `${obstacle.top}%`,
                    width: `${obstacle.width}%`,
                    height: `${obstacle.height}%`,
                    transform: `translate(-50%, -50%) rotate(${obstacle.rotation}deg)`,
                  }}
                >
                  <img src={SPRITES[obstacle.sprite]} alt="" aria-hidden="true" />
                </div>
              ))}

              <div
                className="runner-progress"
                style={{ width: boardFill }}
                aria-hidden="true"
              />

              {runner.phase === "ready" ? (
                <div className="runner-ready-prompt">
                  <span>Nhấn để bắt đầu chạy</span>
                  <button type="button" className="runner-primary" onClick={handleRunnerAction}>
                    Bắt đầu chạy
                  </button>
                </div>
              ) : null}

              {runner.phase === "victory" || runner.phase === "defeat" ? (
                <div className={`runner-overlay ${runner.phase}`}>
                  <div className="runner-overlay-card">
                    <div className="runner-overlay-art">
                      <img src="/logo-HCM.svg" alt="" />
                    </div>
                    <h2>{runner.phase === "victory" ? "Hoàn thành chặng chạy" : "Giao liên đã ngã xuống"}</h2>
                    <p>
                      {runner.phase === "victory"
                        ? "Chặng đường đã hoàn thành. Tinh thần bền bỉ đưa bạn qua lưới lửa."
                        : runner.lastEvent}
                    </p>
                    <div className="runner-overlay-quote">
                      {runner.phase === "victory"
                        ? QUOTES[1]
                        : "Không có gì quý hơn độc lập, tự do."}
                    </div>
                    <div className="runner-overlay-actions">
                      <button type="button" className="runner-primary" onClick={handleRunnerAction}>
                        Chơi lại
                      </button>
                      {onBackToMenu ? (
                        <button type="button" className="runner-secondary" onClick={onBackToMenu}>
                          Về menu
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="runner-side runner-side-right">
          <section className="runner-panel runner-panel-image">
            <img src={SPRITES.runner} alt="" aria-hidden="true" />
            <p>Nhân vật chính là người lính giao liên. Giữ nhịp chạy để vượt mọi vật cản và giữ đường liên lạc.</p>
          </section>

          <section className="runner-panel">
            <h3>Tốc độ tăng dần</h3>
            <p>Càng chạy lâu, tốc độ càng tăng. Sau mốc 2000m, chặng đường được xem là hoàn thành.</p>
          </section>

          <section className="runner-panel runner-panel-event">
            <span className="air-defense-side-label">Diễn biến</span>
            <p>{runner.lastEvent}</p>
          </section>
        </aside>
      </main>
    </div>
  );
}

function GamePage() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame === "air-defense") {
    return <AirDefenseGame onBackToMenu={() => setSelectedGame(null)} />;
  }

  if (selectedGame === "runner") {
    return <RunnerGame onBackToMenu={() => setSelectedGame(null)} />;
  }

  return (
    <div className="game-select-page">
      <BackHomeButton className="game-select-home" label="Trang chủ" />

      <section className="game-select-hero">
        <div className="game-select-hero-copy">
          <span>HCM202 Learning</span>
          <h1>Chọn một chế độ để bắt đầu</h1>
          <p>
            Bạn có thể vào màn bắn máy bay hoặc chạy giao liên vượt lưới lửa. Mỗi game có nhịp riêng,
            cùng chung một phong cách đỏ vàng và tinh thần Tư tưởng Hồ Chí Minh.
          </p>
        </div>
        <div className="game-select-hero-badge">
          <img src="/logo-HCM.svg" alt="Logo HCM202" />
        </div>
      </section>

      <section className="game-select-grid">
        <button
          type="button"
          className="game-select-card game-select-card--air"
          onClick={() => setSelectedGame("air-defense")}
        >
          <div className="game-select-card-media">
            <img src={SPRITES.bomber} alt="" aria-hidden="true" />
            <span className="game-select-card-tag">Bắn máy bay</span>
          </div>
          <div className="game-select-card-body">
            <h2>Lưới lửa phòng không</h2>
            <p>Bắn hạ máy bay địch, tránh bắn nhầm, và hạ B-52 ở màn cuối.</p>
            <span className="game-select-card-cta">Vào chơi</span>
          </div>
        </button>

        <button
          type="button"
          className="game-select-card game-select-card--runner"
          onClick={() => setSelectedGame("runner")}
        >
          <div className="game-select-card-media">
            <img src={SPRITES.runner} alt="" aria-hidden="true" />
            <span className="game-select-card-tag">Endless runner</span>
          </div>
          <div className="game-select-card-body">
            <h2>Giao liên vượt lửa đạn</h2>
            <p>Nhảy qua vật cản, cúi tránh bom đạn và chạy thật xa để hoàn thành chặng đường.</p>
            <span className="game-select-card-cta">Vào chạy</span>
          </div>
        </button>
      </section>
    </div>
  );
}

export default GamePage;
