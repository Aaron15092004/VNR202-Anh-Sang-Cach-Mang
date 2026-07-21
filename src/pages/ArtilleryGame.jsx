import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/game/ArtilleryGame.css";

const LEVELS = [
  {
    id: 1,
    name: "Màn 1 · Trinh sát",
    worldMul: 2.2,
    wind: [0, 0],
    targets: [
      { name: "Him Lam", xFrac: 0.42, hp: 120 },
      { name: "Đồi A1", xFrac: 0.68, hp: 180 },
      { name: "Hầm De Castries", xFrac: 0.92, hp: 240 },
    ],
  },
  {
    id: 2,
    name: "Màn 2 · Gió nhẹ",
    worldMul: 2.8,
    wind: [-8, 8],
    targets: [
      { name: "Him Lam", xFrac: 0.5, hp: 150 },
      { name: "Đồi A1", xFrac: 0.74, hp: 210 },
      { name: "Hầm De Castries", xFrac: 0.95, hp: 280 },
    ],
  },
  {
    id: 3,
    name: "Màn 3 · Đánh chắc tiến chắc",
    worldMul: 3.4,
    wind: [-16, 16],
    targets: [
      { name: "Him Lam", xFrac: 0.55, hp: 180 },
      { name: "Đồi A1", xFrac: 0.78, hp: 240 },
      { name: "Hầm De Castries", xFrac: 0.97, hp: 320 },
    ],
  },
];

const HISTORY_FACTS = [
  "Nghệ thuật kéo pháo vào trận địa — bộ đội ta đã kéo hàng chục khẩu pháo nặng qua núi rừng để tạo bất ngờ cho quân Pháp.",
  "Anh hùng Tô Vĩnh Diện đã lấy thân mình chèn pháo, cứu khẩu pháo khỏi lăn xuống vực trong lúc kéo pháo ra.",
  "Đại tướng Võ Nguyên Giáp đã quyết định chuyển phương châm từ 'đánh nhanh thắng nhanh' sang 'đánh chắc tiến chắc' — một quyết định lịch sử.",
  "Chiến thắng Điện Biên Phủ 7/5/1954 đã 'lừng lẫy năm châu, chấn động địa cầu', kết thúc ách đô hộ của thực dân Pháp.",
  "Hàng vạn dân công hỏa tuyến đã gánh gạo, thồ đạn bằng xe đạp thồ vượt hàng trăm cây số phục vụ chiến dịch.",
  "Pháo binh Việt Nam đã bí mật đưa pháo lên các sườn núi cao, tạo thế bắn thẳng vào lòng chảo Điện Biên.",
  "Cứ điểm Him Lam bị tiêu diệt ngay trong ngày mở màn chiến dịch 13/3/1954.",
  "Ngày 7/5/1954, lá cờ 'Quyết chiến Quyết thắng' tung bay trên nóc hầm tướng De Castries.",
];

// ------------------------- Save Manager -------------------------------------

const SAVE_KEY = "dbp_artillery_v1";
function loadSave() {
  if (typeof window === "undefined") return { muted: false, tutorialSeen: false, bestScore: 0 };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { muted: false, tutorialSeen: false, bestScore: 0 };
    return { muted: false, tutorialSeen: false, bestScore: 0, ...JSON.parse(raw) };
  } catch {
    return { muted: false, tutorialSeen: false, bestScore: 0 };
  }
}
function saveSave(s) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

// ------------------------- Audio --------------------------------------------

class AudioManager {
  ctx = null;
  muted = false;
  ensure() {
    if (!this.ctx && typeof window !== "undefined") {
      try {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch {
        this.ctx = null;
      }
    }
    if (this.ctx?.state === "suspended") this.ctx.resume();
  }
  tone(freq, dur, type = "sine", gain = 0.15) {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }
  fire() {
    this.tone(120, 0.35, "sawtooth", 0.25);
    this.tone(60, 0.5, "square", 0.2);
  }
  charge() {
    this.tone(320, 0.08, "triangle", 0.05);
  }
  explode() {
    if (this.muted) return;
    this.ensure();
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.5, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.4, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.5);
    const f = this.ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 900;
    src.connect(f).connect(g).connect(this.ctx.destination);
    src.start(t0);
  }
  click() {
    this.tone(720, 0.05, "triangle", 0.08);
  }
  victory() {
    [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this.tone(f, 0.25, "triangle", 0.18), i * 140));
  }
  defeat() {
    [392, 330, 262].forEach((f, i) => setTimeout(() => this.tone(f, 0.35, "sine", 0.18), i * 200));
  }
  setMuted(m) {
    this.muted = m;
  }
}

// ------------------------- Physics ------------------------------------------

const GRAVITY = 380;
const WIND_ACCEL = 12;
const CANNON_X = 180;
const CHARGE_TIME = 1.4;
const CAMERA_KEY_SPEED = 900;
const CAMERA_EDGE_SPEED = 700;
const CAMERA_EDGE_MARGIN = 60;

function stepProjectile(p, wind, dt) {
  p.vel.x += wind * WIND_ACCEL * dt;
  p.vel.y += GRAVITY * dt;
  p.pos.x += p.vel.x * dt;
  p.pos.y += p.vel.y * dt;
  p.trail.push({ x: p.pos.x, y: p.pos.y });
  if (p.trail.length > 60) p.trail.shift();
}

function groundY(x, worldW, h) {
  const base = h * 0.78;
  const wave = Math.sin(x * 0.006) * 18 + Math.sin(x * 0.013 + 1.2) * 10;
  const hill = Math.max(0, (CANNON_X + 120 - x) * 0.35);
  return base - wave - hill;
}

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// ------------------------- Component ----------------------------------------

export default function ArtilleryGame() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const audio = useRef(new AudioManager());
  const save = useRef(loadSave());

  const [screen, setScreen] = useState("menu");
  const [levelIdx, setLevelIdx] = useState(0);
  const [muted, setMuted] = useState(save.current.muted);
  const [paused, setPaused] = useState(false);

  const [powerHUD, setPowerHUD] = useState(0);
  const [angleHUD, setAngleHUD] = useState(55);
  const [charging, setCharging] = useState(false);
  const [ammo, setAmmo] = useState(10);
  const [score, setScore] = useState(0);
  const [wind, setWind] = useState(0);
  const [targetsHUD, setTargetsHUD] = useState([]);
  const [destroyedCount, setDestroyedCount] = useState(0);
  const [shotsFired, setShotsFired] = useState(0);
  const [shotsHit, setShotsHit] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [endStats, setEndStats] = useState(null);

  audio.current.setMuted(muted);

  const stateRef = useRef({
    w: 0,
    h: 0,
    dpr: 1,
    worldW: 0,
    projectile: null,
    particles: [],
    targets: [],
    cannonRecoil: 0,
    cannonFlash: 0,
    cameraX: 0,
    shakeMag: 0,
    lastT: 0,
    firing: false,
    wind: 0,
    angle: 55,
    power: 0,
    charging: false,
    mouseX: 0,
    mouseY: 0,
    mouseInside: false,
    keys: { left: false, right: false, space: false },
    ammo: 10,
    score: 0,
    levelIdx: 0,
    shotsFired: 0,
    shotsHit: 0,
    startTime: 0,
  });

  // ---------- Level setup ----------
  const setupLevel = useCallback((idx) => {
    const s = stateRef.current;
    const lvl = LEVELS[idx];
    const worldW = Math.max(s.w * lvl.worldMul, 1400);
    s.worldW = worldW;
    const targets = lvl.targets.map((t) => ({
      name: t.name,
      x: t.xFrac * worldW,
      hp: t.hp,
      maxHp: t.hp,
      w: 90,
      h: 60,
      destroyed: false,
      shake: 0,
    }));
    const windVal =
      lvl.wind[0] === 0 && lvl.wind[1] === 0
        ? 0
        : Math.round((Math.random() * (lvl.wind[1] - lvl.wind[0]) + lvl.wind[0]) * 10) / 10;

    s.targets = targets;
    s.wind = windVal;
    s.ammo = 10;
    s.score = 0;
    s.projectile = null;
    s.particles = [];
    s.firing = false;
    s.charging = false;
    s.power = 0;
    s.shotsFired = 0;
    s.shotsHit = 0;
    s.startTime = performance.now();
    s.cameraX = 0;
    s.levelIdx = idx;

    setWind(windVal);
    setAmmo(10);
    setScore(0);
    setDestroyedCount(0);
    setShotsFired(0);
    setShotsHit(0);
    setPowerHUD(0);
    setCharging(false);
    setTargetsHUD(targets.map((t) => ({ name: t.name, hp: t.hp, maxHp: t.maxHp })));
  }, []);

  // ---------- Resize ----------
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = rect.width;
      const cssH = Math.max(420, Math.min(rect.width * 0.55, 680));
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = cssW + "px";
      canvas.style.height = cssH + "px";
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.w = cssW;
      stateRef.current.h = cssH;
      stateRef.current.dpr = dpr;

      if (stateRef.current.targets.length && screen === "playing") {
        const lvl = LEVELS[stateRef.current.levelIdx];
        const worldW = Math.max(cssW * lvl.worldMul, 1400);
        stateRef.current.worldW = worldW;
        stateRef.current.targets.forEach((t, i) => {
          t.x = lvl.targets[i].xFrac * worldW;
        });
      } else {
        stateRef.current.worldW = Math.max(cssW * 2.2, 1400);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [screen]);

  // ---------- Start game ----------
  const startGame = useCallback(
    (idx) => {
      audio.current.click();
      setLevelIdx(idx);
      setEndStats(null);
      setPaused(false);
      if (!save.current.tutorialSeen) {
        setLevelIdx(idx);
        setScreen("tutorial");
      } else {
        setScreen("playing");
        requestAnimationFrame(() => setupLevel(idx));
      }
    },
    [setupLevel],
  );

  // ---------- Fire ----------
  const fire = useCallback((powerPct) => {
    const s = stateRef.current;
    if (s.firing || s.ammo <= 0) return;
    const cannonPos = { x: CANNON_X, y: groundY(CANNON_X, s.worldW, s.h) - 30 };
    const rad = (s.angle * Math.PI) / 180;
    const speed = 260 + powerPct * 6.2;
    const vx = Math.cos(rad) * speed;
    const vy = -Math.sin(rad) * speed;
    s.projectile = {
      pos: { ...cannonPos },
      vel: { x: vx, y: vy },
      trail: [],
      alive: true,
    };
    s.firing = true;
    s.cannonRecoil = 1;
    s.cannonFlash = 1;
    s.shakeMag = 6;
    s.ammo -= 1;
    s.shotsFired += 1;
    setAmmo(s.ammo);
    setShotsFired(s.shotsFired);
    audio.current.fire();
  }, []);

  const releaseFire = useCallback(() => {
    const s = stateRef.current;
    if (!s.charging) return;
    const p = s.power;
    s.charging = false;
    s.power = 0;
    setCharging(false);
    setPowerHUD(0);
    if (p >= 5) fire(p);
  }, [fire]);

  const beginCharge = useCallback(() => {
    const s = stateRef.current;
    if (s.firing || s.ammo <= 0 || screen !== "playing" || paused) return;
    if (s.charging) return;
    s.charging = true;
    s.power = 0;
    setCharging(true);
    audio.current.charge();
  }, [screen, paused]);

  // ---------- Main loop ----------
  useEffect(() => {
    let raf = 0;
    const loop = (t) => {
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!canvas) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (!s.lastT) s.lastT = t;
      const dt = Math.min(0.033, (t - s.lastT) / 1000);
      s.lastT = t;

      if (screen === "playing" && !paused) {
        update(dt);
        setElapsed((performance.now() - s.startTime) / 1000);
      }
      render(ctx);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, paused]);

  // ---------- Update ----------
  function update(dt) {
    const s = stateRef.current;

    let camDX = 0;
    if (s.keys.left) camDX -= CAMERA_KEY_SPEED * dt;
    if (s.keys.right) camDX += CAMERA_KEY_SPEED * dt;
    if (s.mouseInside && !s.firing) {
      if (s.mouseX < CAMERA_EDGE_MARGIN) {
        camDX -= CAMERA_EDGE_SPEED * dt * (1 - s.mouseX / CAMERA_EDGE_MARGIN);
      } else if (s.mouseX > s.w - CAMERA_EDGE_MARGIN) {
        camDX +=
          CAMERA_EDGE_SPEED * dt * (1 - (s.w - s.mouseX) / CAMERA_EDGE_MARGIN);
      }
    }
    if (camDX !== 0) {
      s.cameraX = clamp(s.cameraX + camDX, 0, Math.max(0, s.worldW - s.w));
    }

    if (s.mouseInside && !s.firing) {
      const cx = CANNON_X - s.cameraX;
      const cy = groundY(CANNON_X, s.worldW, s.h) - 20;
      const dx = s.mouseX - cx;
      const dy = cy - s.mouseY;
      let ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      ang = clamp(ang, 0, 89);
      s.angle = ang;
      setAngleHUD(Math.round(ang));
    }

    if (s.charging) {
      s.power = Math.min(100, s.power + (100 / CHARGE_TIME) * dt);
      setPowerHUD(Math.round(s.power));
      if (s.power >= 100) {
        const p = s.power;
        s.charging = false;
        s.power = 0;
        setCharging(false);
        setPowerHUD(0);
        fire(p);
      }
    }

    s.cannonRecoil = Math.max(0, s.cannonRecoil - dt * 3);
    s.cannonFlash = Math.max(0, s.cannonFlash - dt * 4);
    s.shakeMag *= Math.pow(0.001, dt);
    s.targets.forEach((t) => (t.shake = Math.max(0, t.shake - dt * 4)));

    for (const p of s.particles) {
      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;
      if (p.kind === "debris") p.vel.y += GRAVITY * dt;
      if (p.kind === "smoke") {
        p.vel.y -= 20 * dt;
        p.size += 20 * dt;
      }
      p.life -= dt;
    }
    s.particles = s.particles.filter((p) => p.life > 0);

    if (s.projectile && s.projectile.alive) {
      const p = s.projectile;
      stepProjectile(p, s.wind, dt);
      if (Math.random() < 0.7) {
        s.particles.push({
          pos: { x: p.pos.x, y: p.pos.y },
          vel: { x: -s.wind * 4, y: -20 },
          life: 0.8,
          maxLife: 0.8,
          size: 6,
          color: "rgba(200,200,200,0.55)",
          kind: "smoke",
        });
      }
      const targetCam = clamp(p.pos.x - s.w * 0.5, 0, Math.max(0, s.worldW - s.w));
      s.cameraX += (targetCam - s.cameraX) * Math.min(1, dt * 6);

      const gy = groundY(p.pos.x, s.worldW, s.h);
      let hit = false;
      for (const t of s.targets) {
        if (t.destroyed) continue;
        const tx = t.x;
        const ty = groundY(tx, s.worldW, s.h) - t.h / 2;
        if (
          p.pos.x > tx - t.w / 2 &&
          p.pos.x < tx + t.w / 2 &&
          p.pos.y > ty - t.h / 2 &&
          p.pos.y < ty + t.h / 2
        ) {
          const dmg = 30 + Math.floor(Math.random() * 20);
          t.hp -= dmg;
          t.shake = 1;
          hit = true;
          const isHead = p.pos.y < ty - t.h / 4;
          s.score += isHead ? 60 : 35;
          s.shotsHit += 1;
          spawnExplosion(p.pos.x, p.pos.y);
          audio.current.explode();
          if (t.hp <= 0) {
            t.hp = 0;
            t.destroyed = true;
            s.score += 120;
            spawnDestruction(t.x, groundY(t.x, s.worldW, s.h) - t.h / 2);
          }
          break;
        }
      }
      if (p.pos.y >= gy) {
        spawnExplosion(p.pos.x, gy);
        audio.current.explode();
        if (!hit) s.score = Math.max(0, s.score - 5);
        hit = true;
      }
      if (p.pos.x > s.worldW + 100 || p.pos.x < -100) {
        p.alive = false;
        s.firing = false;
        s.projectile = null;
      }
      if (hit) {
        p.alive = false;
        s.projectile = null;
        s.firing = false;
        s.shakeMag = 10;
        setShotsHit(s.shotsHit);
        setScore(s.score);
        setTargetsHUD(s.targets.map((tt) => ({ name: tt.name, hp: tt.hp, maxHp: tt.maxHp })));
        const destroyed = s.targets.filter((tt) => tt.destroyed).length;
        setDestroyedCount(destroyed);

        if (destroyed === s.targets.length) {
          setTimeout(() => endLevel(true), 900);
        } else if (s.ammo <= 0) {
          setTimeout(() => endLevel(false), 900);
        } else {
          const lvl = LEVELS[s.levelIdx];
          if (lvl.wind[0] !== 0 || lvl.wind[1] !== 0) {
            s.wind = Math.round((Math.random() * (lvl.wind[1] - lvl.wind[0]) + lvl.wind[0]) * 10) / 10;
            setWind(s.wind);
          }
        }
      }
    }
  }

  function spawnExplosion(x, y) {
    const s = stateRef.current;
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 60 + Math.random() * 220;
      s.particles.push({
        pos: { x, y },
        vel: { x: Math.cos(a) * sp, y: Math.sin(a) * sp - 40 },
        life: 0.5 + Math.random() * 0.4,
        maxLife: 0.9,
        size: 3 + Math.random() * 4,
        color: Math.random() < 0.5 ? "#f4a300" : "#d98a00",
        kind: "fire",
      });
    }
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 20 + Math.random() * 80;
      s.particles.push({
        pos: { x, y },
        vel: { x: Math.cos(a) * sp, y: Math.sin(a) * sp - 30 },
        life: 1.2 + Math.random() * 0.8,
        maxLife: 2,
        size: 10 + Math.random() * 10,
        color: "rgba(120,120,120,0.55)",
        kind: "smoke",
      });
    }
    s.particles.push({
      pos: { x, y },
      vel: { x: 0, y: 0 },
      life: 0.3,
      maxLife: 0.3,
      size: 20,
      color: "rgba(244,163,0,0.8)",
      kind: "shock",
    });
  }

  function spawnDestruction(x, y) {
    const s = stateRef.current;
    for (let i = 0; i < 30; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = 80 + Math.random() * 200;
      s.particles.push({
        pos: { x, y },
        vel: { x: Math.cos(a) * sp, y: Math.sin(a) * sp - 100 },
        life: 1.2 + Math.random() * 0.8,
        maxLife: 2,
        size: 3 + Math.random() * 3,
        color: "#5a4634",
        kind: "debris",
      });
    }
  }

  function endLevel(won) {
    const s = stateRef.current;
    const time = (performance.now() - s.startTime) / 1000;
    const accuracy = s.shotsFired ? Math.round((s.shotsHit / s.shotsFired) * 100) : 0;
    let bonus = 0;
    if (won) {
      bonus += s.ammo * 25;
      bonus += Math.max(0, 300 - Math.floor(time) * 2);
      s.score += bonus;
    }
    if (s.score > save.current.bestScore) {
      save.current.bestScore = s.score;
      saveSave(save.current);
    }
    const fact = HISTORY_FACTS[Math.floor(Math.random() * HISTORY_FACTS.length)];
    let hint;
    if (!won) {
      const hints = [];
      if (s.angle < 30) hints.push("Ngắm cao hơn — rê chuột lên trên để tăng góc bắn.");
      else if (s.angle > 75) hints.push("Góc bắn quá cao, hạ chuột xuống thấp hơn.");
      hints.push("Giữ chuột lâu hơn để nạp thêm lực trước khi thả.");
      if (Math.abs(s.wind) > 8)
        hints.push(
          s.wind > 0
            ? "Gió mạnh thổi sang phải, cần ngắm chệch sang trái mục tiêu."
            : "Gió mạnh thổi sang trái, hãy ngắm chệch sang phải một chút.",
        );
      hint = hints[0];
    }
    setEndStats({ score: s.score, accuracy, ammoLeft: s.ammo, time, fact, hint });
    setScore(s.score);
    if (won) audio.current.victory();
    else audio.current.defeat();
    setScreen(won ? "victory" : "defeat");
  }

  // ---------- Render ----------
  function render(ctx) {
    const s = stateRef.current;
    const w = s.w;
    const h = s.h;
    if (!w || !h) return;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.8);
    sky.addColorStop(0, "#e6efe6");
    sky.addColorStop(0.55, "#f4efe3");
    sky.addColorStop(1, "#fbfbf7");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    drawClouds(ctx, w, h, s.cameraX * 0.15);
    drawFarMountains(ctx, w, h, s.cameraX * 0.3);
    drawMidMountains(ctx, w, h, s.cameraX * 0.55);

    const shakeX = (Math.random() - 0.5) * s.shakeMag;
    const shakeY = (Math.random() - 0.5) * s.shakeMag;
    ctx.save();
    ctx.translate(-s.cameraX + shakeX, shakeY);

    drawValley(ctx, s.worldW, h);
    drawTrenches(ctx, s.worldW, h);
    drawTargets(ctx, s.targets, s.worldW, h);
    drawCannon(ctx, s.worldW, h, s.angle, s.cannonRecoil, s.cannonFlash);

    if (!s.firing && s.ammo > 0 && screen === "playing") {
      drawTrajectoryPreview(ctx, s.worldW, h, s.angle, Math.max(s.power, 25), s.wind);
    }

    if (s.projectile) {
      const p = s.projectile;
      ctx.save();
      ctx.strokeStyle = "rgba(27,43,31,0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      p.trail.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.fillStyle = "#1b2b1f";
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    for (const p of s.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      if (p.kind === "shock") {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, (1 - alpha) * 80, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    ctx.restore();

    drawMinimap(ctx, s, w, h);
    drawCharging(ctx, s, w, h);
    drawEdgeHints(ctx, s, w, h);

    ctx.restore();
  }

  function drawClouds(ctx, w, h, off) {
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    const clouds = [
      { x: w * 0.15, y: h * 0.12, r: 22 },
      { x: w * 0.45, y: h * 0.08, r: 28 },
      { x: w * 0.75, y: h * 0.15, r: 20 },
      { x: w * 1.05, y: h * 0.1, r: 26 },
    ];
    for (const c of clouds) {
      const cx = ((c.x - off) % (w * 1.2) + w * 1.2) % (w * 1.2) - w * 0.1;
      ctx.beginPath();
      ctx.arc(cx, c.y, c.r, 0, Math.PI * 2);
      ctx.arc(cx + c.r * 0.8, c.y + 4, c.r * 0.8, 0, Math.PI * 2);
      ctx.arc(cx - c.r * 0.7, c.y + 5, c.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawFarMountains(ctx, w, h, off) {
    ctx.save();
    ctx.fillStyle = "#c9d6c9";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.55);
    for (let x = 0; x <= w; x += 40) {
      const wx = x + off;
      const y = h * 0.55 - Math.sin(wx * 0.008) * 30 - Math.sin(wx * 0.017 + 1) * 12;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawMidMountains(ctx, w, h, off) {
    ctx.save();
    ctx.fillStyle = "#8fb198";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.66);
    for (let x = 0; x <= w; x += 30) {
      const wx = x + off;
      const y = h * 0.66 - Math.sin(wx * 0.012 + 0.6) * 26 - Math.sin(wx * 0.024) * 8;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawValley(ctx, worldW, h) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= worldW; x += 10) {
      ctx.lineTo(x, groundY(x, worldW, h));
    }
    ctx.lineTo(worldW, h);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, h * 0.6, 0, h);
    g.addColorStop(0, "#5b8a6b");
    g.addColorStop(1, "#3a5b46");
    ctx.fillStyle = g;
    ctx.fill();

    ctx.strokeStyle = "#2d6a4f";
    ctx.lineWidth = 1;
    for (let x = 0; x < worldW; x += 22) {
      const y = groundY(x, worldW, h);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 2, y - 4);
      ctx.moveTo(x + 4, y);
      ctx.lineTo(x + 6, y - 5);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawTrenches(ctx, worldW, h) {
    ctx.save();
    ctx.strokeStyle = "rgba(27,43,31,0.35)";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    for (let x = worldW * 0.25; x < worldW; x += 4) {
      const y = groundY(x, worldW, h) + 6;
      if (x === worldW * 0.25) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function drawCannon(ctx, worldW, h, angleDeg, recoil, flash) {
    const bx = CANNON_X;
    const by = groundY(bx, worldW, h);
    ctx.save();
    ctx.translate(bx - recoil * 6, by);

    ctx.fillStyle = "#2d6a4f";
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 10, 4, 8, 3, i * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#1b2b1f";
    ctx.beginPath();
    ctx.arc(0, -6, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#40916c";
    ctx.beginPath();
    ctx.arc(0, -6, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1b4332";
    ctx.fillRect(-20, -22, 40, 14);

    ctx.save();
    ctx.translate(0, -20);
    ctx.rotate((-angleDeg * Math.PI) / 180);
    ctx.fillStyle = "#2d6a4f";
    ctx.fillRect(0, -5, 60, 10);
    ctx.fillStyle = "#40916c";
    ctx.fillRect(55, -6, 6, 12);
    if (flash > 0.1) {
      ctx.fillStyle = `rgba(244,163,0,${flash})`;
      ctx.beginPath();
      ctx.arc(66, 0, 12 + (1 - flash) * 10, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.fillStyle = "#1b4332";
    ctx.fillRect(-34, -30, 8, 20);
    ctx.beginPath();
    ctx.arc(-30, -34, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4a300";
    ctx.beginPath();
    ctx.arc(-30, -36, 5, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#1b2b1f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-55, -8);
    ctx.lineTo(-55, -40);
    ctx.stroke();
    ctx.fillStyle = "#d98a00";
    ctx.beginPath();
    ctx.moveTo(-55, -40);
    ctx.lineTo(-40, -35);
    ctx.lineTo(-55, -30);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawTargets(ctx, targets, worldW, h) {
    for (const t of targets) {
      const gx = t.x;
      const gy = groundY(gx, worldW, h);
      ctx.save();
      ctx.translate(gx + (Math.random() - 0.5) * t.shake * 4, gy);

      if (t.destroyed) {
        ctx.fillStyle = "#5a4634";
        ctx.fillRect(-t.w / 2, -12, t.w, 12);
        ctx.fillStyle = "rgba(120,120,120,0.5)";
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(-30 + i * 15, -20, 10, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        ctx.fillStyle = "#c9a86b";
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.ellipse(-t.w / 2 + 12 + i * 18, -6, 12, 7, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#7a6a4f";
        ctx.fillRect(-t.w / 2 + 4, -t.h, t.w - 8, t.h - 10);
        ctx.fillStyle = "#3d3325";
        ctx.fillRect(-10, -t.h + 10, 20, 10);
        ctx.fillStyle = "#5a4634";
        ctx.beginPath();
        ctx.moveTo(-t.w / 2, -t.h);
        ctx.lineTo(0, -t.h - 12);
        ctx.lineTo(t.w / 2, -t.h);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#1b2b1f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(t.w / 2 - 6, -t.h - 12);
        ctx.lineTo(t.w / 2 - 6, -t.h - 34);
        ctx.stroke();
        ctx.fillStyle = "#1b2b1f";
        ctx.fillRect(t.w / 2 - 6, -t.h - 34, 14, 8);

        const hpFrac = t.hp / t.maxHp;
        ctx.fillStyle = "rgba(0,0,0,0.15)";
        ctx.fillRect(-t.w / 2, -t.h - 44, t.w, 6);
        ctx.fillStyle = hpFrac > 0.5 ? "#40916c" : hpFrac > 0.25 ? "#f4a300" : "#b3261e";
        ctx.fillRect(-t.w / 2, -t.h - 44, t.w * hpFrac, 6);
        ctx.fillStyle = "#1b2b1f";
        ctx.font = "600 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(t.name, 0, -t.h - 50);
      }
      ctx.restore();
    }
  }

  function drawTrajectoryPreview(ctx, worldW, h, angleDeg, powerPct, windVal) {
    const bx = CANNON_X;
    const by = groundY(bx, worldW, h) - 30;
    const rad = (angleDeg * Math.PI) / 180;
    const speed = 260 + powerPct * 6.2;
    let vx = Math.cos(rad) * speed;
    let vy = -Math.sin(rad) * speed;
    let px = bx;
    let py = by;
    ctx.save();
    ctx.strokeStyle = "rgba(45,106,79,0.7)";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([5, 6]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    const AIM_STEPS = 14;
    for (let i = 0; i < AIM_STEPS; i++) {
      const dt = 0.05;
      vx += windVal * WIND_ACCEL * dt;
      vy += GRAVITY * dt;
      px += vx * dt;
      py += vy * dt;
      ctx.lineTo(px, py);
      if (py >= groundY(px, worldW, h)) break;
    }
    ctx.stroke();
    ctx.setLineDash([]);
    const ang = Math.atan2(vy, vx);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px - Math.cos(ang - 0.5) * 9, py - Math.sin(ang - 0.5) * 9);
    ctx.moveTo(px, py);
    ctx.lineTo(px - Math.cos(ang + 0.5) * 9, py - Math.sin(ang + 0.5) * 9);
    ctx.stroke();
    ctx.restore();
  }

  function drawMinimap(ctx, s, w, h) {
    if (!s.worldW) return;
    const mw = Math.min(240, w * 0.35);
    const mh = 22;
    const mx = w - mw - 14;
    const my = 14;
    ctx.save();
    ctx.fillStyle = "rgba(27,43,31,0.55)";
    roundRect(ctx, mx, my, mw, mh, 8);
    ctx.fill();

    const cxRatio = CANNON_X / s.worldW;
    ctx.fillStyle = "#40916c";
    ctx.beginPath();
    ctx.arc(mx + cxRatio * mw, my + mh / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    for (const t of s.targets) {
      const r = t.x / s.worldW;
      ctx.fillStyle = t.destroyed ? "rgba(255,255,255,0.35)" : "#f4a300";
      ctx.beginPath();
      ctx.arc(mx + r * mw, my + mh / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    const camR = s.cameraX / s.worldW;
    const winR = s.w / s.worldW;
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 2;
    ctx.strokeRect(mx + camR * mw, my + 2, winR * mw, mh - 4);
    ctx.restore();
  }

  function drawCharging(ctx, s, w, h) {
    if (!s.charging) return;
    const bw = Math.min(360, w * 0.6);
    const bh = 14;
    const bx = (w - bw) / 2;
    const by = h - 38;
    ctx.save();
    ctx.fillStyle = "rgba(27,43,31,0.55)";
    roundRect(ctx, bx, by, bw, bh, 999);
    ctx.fill();
    const p = s.power / 100;
    const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
    grad.addColorStop(0, "#40916c");
    grad.addColorStop(0.6, "#f4a300");
    grad.addColorStop(1, "#b3261e");
    ctx.fillStyle = grad;
    roundRect(ctx, bx + 2, by + 2, (bw - 4) * p, bh - 4, 999);
    ctx.fill();
    ctx.fillStyle = "#fbfbf7";
    ctx.font = "700 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`LỰC ${Math.round(s.power)}%  ·  thả để bắn`, w / 2, by - 6);
    ctx.restore();
  }

  function drawEdgeHints(ctx, s, w, h) {
    ctx.save();
    ctx.font = "700 14px Inter, sans-serif";
    ctx.fillStyle = "rgba(27,43,31,0.55)";
    if (s.cameraX > 4) {
      ctx.textAlign = "left";
      ctx.fillText("◀ ← / rê chuột trái", 12, h / 2);
    }
    if (s.cameraX < s.worldW - s.w - 4) {
      ctx.textAlign = "right";
      ctx.fillText("→ / rê chuột phải ▶", w - 12, h / 2);
    }
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  // ---------- Input: mouse ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => {
      const { x, y } = getPos(e);
      stateRef.current.mouseX = x;
      stateRef.current.mouseY = y;
      stateRef.current.mouseInside = true;
    };
    const onEnter = () => {
      stateRef.current.mouseInside = true;
    };
    const onLeave = () => {
      stateRef.current.mouseInside = false;
      if (stateRef.current.charging) releaseFire();
    };
    const onDown = (e) => {
      if (e.button !== 0) return;
      if (screen !== "playing" || paused) return;
      canvas.setPointerCapture?.(e.pointerId);
      const { x, y } = getPos(e);
      stateRef.current.mouseX = x;
      stateRef.current.mouseY = y;
      stateRef.current.mouseInside = true;
      beginCharge();
    };
    const onUp = (e) => {
      if (e.button !== undefined && e.button !== 0) return;
      canvas.releasePointerCapture?.(e.pointerId);
      releaseFire();
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [screen, paused, beginCharge, releaseFire]);

  // ---------- Input: keyboard ----------
  useEffect(() => {
    const onDown = (e) => {
      if (screen !== "playing") return;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        stateRef.current.keys.left = true;
        e.preventDefault();
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        stateRef.current.keys.right = true;
        e.preventDefault();
      } else if (e.code === "Space") {
        e.preventDefault();
        if (!stateRef.current.keys.space) {
          stateRef.current.keys.space = true;
          beginCharge();
        }
      }
    };
    const onUp = (e) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") stateRef.current.keys.left = false;
      else if (e.code === "ArrowRight" || e.code === "KeyD") stateRef.current.keys.right = false;
      else if (e.code === "Space") {
        stateRef.current.keys.space = false;
        releaseFire();
      }
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [screen, beginCharge, releaseFire]);

  // ---------- UI helpers ----------
  const acc = shotsFired ? Math.round((shotsHit / shotsFired) * 100) : 0;

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    save.current.muted = m;
    saveSave(save.current);
    audio.current.click();
  };

  const restart = () => {
    audio.current.click();
    setEndStats(null);
    setScreen("playing");
    setPaused(false);
    requestAnimationFrame(() => setupLevel(levelIdx));
  };

  const nextLevel = () => {
    audio.current.click();
    const nxt = Math.min(LEVELS.length - 1, levelIdx + 1);
    setLevelIdx(nxt);
    setScreen("playing");
    setPaused(false);
    setEndStats(null);
    requestAnimationFrame(() => setupLevel(nxt));
  };

  const backToMenu = () => {
    audio.current.click();
    setScreen("menu");
    setEndStats(null);
  };

  const closeTutorial = () => {
    save.current.tutorialSeen = true;
    saveSave(save.current);
    setScreen("playing");
    requestAnimationFrame(() => setupLevel(levelIdx));
  };

  return (
    <div className="dbp-game-shell">
      <header className="dbp-header">
        <div className="dbp-header-inner">
          <div className="dbp-header-left">
            <div className="dbp-logo-icon">
              <CannonIcon />
            </div>
            <div>
              <h1 className="dbp-title">PHÁO BINH ĐIỆN BIÊN</h1>
              <p className="dbp-subtitle">
                Mini-game lịch sử · Chiến dịch Điện Biên Phủ 1954
              </p>
            </div>
          </div>
          <div className="dbp-header-right">
            <span className="dbp-chip"><Dot /> {LEVELS[levelIdx].name}</span>
            {screen === "playing" && (
              <>
                <span className="dbp-chip">🎯 {destroyedCount}/{targetsHUD.length}</span>
                <span className="dbp-chip">💥 {score} đ</span>
                <span className="dbp-chip">🧨 {ammo}/10</span>
                <span className="dbp-chip">📐 {angleHUD}°</span>
                <span
                  className="dbp-chip"
                  style={
                    charging
                      ? {
                          background: "var(--gradient-accent)",
                          borderColor: "transparent",
                          color: "#1b2b1f",
                        }
                      : undefined
                  }
                >
                  ⚡ {powerHUD}%
                </span>
                <WindChip wind={wind} />
              </>
            )}
            <button className="dbp-btn-ghost" onClick={toggleMute} aria-label="Mute">
              {muted ? "🔇" : "🔊"}
            </button>
            {screen === "playing" && (
              <>
                <button className="dbp-btn-ghost" onClick={() => setPaused((p) => !p)}>
                  {paused ? "▶︎" : "⏸"}
                </button>
                <button className="dbp-btn-ghost" onClick={restart}>
                  ↺
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="dbp-main">
        <div
          ref={wrapRef}
          className="dbp-canvas-wrap"
          style={{ cursor: screen === "playing" ? "crosshair" : "default" }}
        >
          <canvas ref={canvasRef} className="dbp-canvas" />

          {screen === "menu" && (
            <div className="dbp-overlay">
              <div className="dbp-modal dbp-anim-pop">
                <div className="dbp-modal-icon">
                  <CannonIcon large />
                </div>
                <h2 className="dbp-modal-title">Chọn cấp độ chiến dịch</h2>
                <p className="dbp-modal-desc">
                  10 viên đạn. Rê chuột để ngắm, giữ chuột để nạp lực, thả để khai hỏa. Cuộn bản đồ
                  bằng phím ←/→ hoặc rê chuột ra mép để tìm mục tiêu.
                </p>
                <div className="dbp-level-grid">
                  {LEVELS.map((l, i) => (
                    <button
                      key={l.id}
                      onClick={() => startGame(i)}
                      className="dbp-level-card"
                    >
                      <span className="dbp-level-name">{l.name}</span>
                      <span className="dbp-level-info">
                        Bản đồ ×{l.worldMul.toFixed(1)} ·{" "}
                        {l.wind[0] === 0 && l.wind[1] === 0
                          ? "không gió"
                          : `gió ±${Math.max(Math.abs(l.wind[0]), Math.abs(l.wind[1]))} m/s`}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="dbp-best-score">
                  Điểm cao nhất: <b>{save.current.bestScore}</b>
                </p>
              </div>
            </div>
          )}

          {screen === "tutorial" && (
            <div className="dbp-overlay dbp-overlay-dark">
              <div className="dbp-modal dbp-modal-sm dbp-anim-pop">
                <h3 className="dbp-tutorial-title">Hướng dẫn nhanh</h3>
                <ul className="dbp-tutorial-list">
                  <li>① <b>Rê chuột</b> để ngắm — nòng pháo bám theo con trỏ.</li>
                  <li>② <b>Giữ chuột trái</b> (hoặc phím <b>Space</b>) để nạp lực.</li>
                  <li>③ <b>Thả ra</b> khi đủ lực để khai hỏa.</li>
                  <li>④ Bản đồ dài hơn màn hình — nhấn <b>←/→</b> hoặc rê chuột ra mép để cuộn.</li>
                  <li>⑤ Tiêu diệt Him Lam, Đồi A1 và Hầm De Castries.</li>
                </ul>
                <button className="dbp-btn-primary dbp-btn-full" onClick={closeTutorial}>
                  Đã hiểu — vào trận
                </button>
              </div>
            </div>
          )}

          {paused && screen === "playing" && (
            <div className="dbp-overlay dbp-overlay-dark">
              <div className="dbp-modal dbp-modal-sm dbp-anim-pop dbp-text-center">
                <p className="dbp-pause-title">Tạm dừng</p>
                <button className="dbp-btn-primary" onClick={() => setPaused(false)}>
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {screen === "victory" && endStats && (
            <EndModal
              title="🎖 Chiến thắng!"
              stats={endStats}
              onPrimary={levelIdx < LEVELS.length - 1 ? nextLevel : restart}
              primaryLabel={levelIdx < LEVELS.length - 1 ? "Màn tiếp theo" : "Chơi lại"}
              onSecondary={restart}
              secondaryLabel="Chơi lại"
              onMenu={backToMenu}
              variant="win"
            />
          )}

          {screen === "defeat" && endStats && (
            <EndModal
              title="Hết đạn!"
              stats={endStats}
              onPrimary={restart}
              primaryLabel="Thử lại"
              onMenu={backToMenu}
              variant="lose"
            />
          )}
        </div>

        {/* Info strip below canvas */}
        <div className="dbp-info-strip">
          <div className="dbp-targets-panel">
            <div className="dbp-panel-header">
              <span className="dbp-panel-label">Mục tiêu chiến dịch</span>
              <span className="dbp-panel-hp-label">HP còn lại</span>
            </div>
            <div className="dbp-targets-grid">
              {targetsHUD.length === 0 && (
                <p className="dbp-hint-text">Chọn cấp độ để bắt đầu.</p>
              )}
              {targetsHUD.map((t) => (
                <div key={t.name} className="dbp-target-card">
                  <div className="dbp-target-header">
                    <span className="dbp-target-name">{t.name}</span>
                    <span className="dbp-target-hp">
                      {t.hp}/{t.maxHp}
                    </span>
                  </div>
                  <div className="dbp-hp-bar-bg">
                    <div
                      className="dbp-hp-bar-fill"
                      style={{
                        width: `${(t.hp / t.maxHp) * 100}%`,
                        background:
                          t.hp / t.maxHp > 0.5
                            ? "var(--color-primary-light)"
                            : t.hp / t.maxHp > 0.25
                              ? "var(--color-accent)"
                              : "var(--color-destructive)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="dbp-controls-hint">
              Điều khiển: <b>Rê chuột</b> ngắm · <b>Giữ chuột / Space</b> nạp lực · <b>Thả</b> để
              bắn · <b>← →</b> hoặc rê chuột ra mép để cuộn bản đồ.
            </p>
          </div>

          <div className="dbp-stats-grid">
            <StatBox label="Độ chính xác" value={`${acc}%`} />
            <StatBox label="Đã bắn" value={`${shotsFired}`} />
            <StatBox
              label="Thời gian"
              value={screen === "playing" ? `${Math.floor(elapsed)}s` : "—"}
            />
            <StatBox label="Kỷ lục" value={`${save.current.bestScore}`} />
          </div>
        </div>
      </main>

      <footer className="dbp-footer">
        Tư liệu giáo dục · Tôn vinh chiến thắng Điện Biên Phủ 7/5/1954 · Bộ đội Pháo binh Việt Nam.
      </footer>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="dbp-stat-box">
      <div className="dbp-stat-label">{label}</div>
      <div className="dbp-stat-value">{value}</div>
    </div>
  );
}

function WindChip({ wind }) {
  const dir = wind === 0 ? "•" : wind > 0 ? "→" : "←";
  const val = Math.abs(wind).toFixed(1);
  return (
    <span
      className="dbp-chip"
      style={{ background: "var(--gradient-accent)", color: "#1b2b1f", borderColor: "transparent" }}
      title="Gió (m/s)"
    >
      🌬 {dir} {val} m/s
    </span>
  );
}

function Dot() {
  return <span className="dbp-dot" />;
}

function CannonIcon({ large = false }) {
  const s = large ? 32 : 22;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="16" r="3" />
      <path d="M9 14L20 6" strokeLinecap="round" />
      <path d="M18 4L22 8" strokeLinecap="round" />
      <path d="M4 20h14" strokeLinecap="round" />
    </svg>
  );
}

function EndModal({
  title,
  stats,
  onPrimary,
  primaryLabel,
  onSecondary,
  secondaryLabel,
  onMenu,
  variant,
}) {
  return (
    <div className="dbp-overlay dbp-overlay-dark">
      <div className="dbp-modal dbp-modal-end dbp-anim-pop">
        <div
          className="dbp-end-header"
          style={{
            background:
              variant === "win" ? "var(--gradient-primary)" : "linear-gradient(135deg,#1b2b1f,#3a4a3d)",
          }}
        >
          <h2 className="dbp-end-title">{title}</h2>
          <p className="dbp-end-subtitle">
            {variant === "win"
              ? "Cứ điểm đã bị san phẳng — vinh quang thuộc về pháo binh Việt Nam."
              : "Chiến trường khó lường. Rút kinh nghiệm và ra trận lần nữa!"}
          </p>
        </div>
        <div className="dbp-end-stats">
          <StatBox label="Điểm" value={`${stats.score}`} />
          <StatBox label="Độ chính xác" value={`${stats.accuracy}%`} />
          <StatBox label="Đạn còn lại" value={`${stats.ammoLeft}`} />
          <StatBox label="Thời gian" value={`${Math.floor(stats.time)}s`} />
        </div>
        {stats.hint && (
          <div className="dbp-end-hint">
            💡 <b>Gợi ý:</b> {stats.hint}
          </div>
        )}
        <div className="dbp-end-fact">
          <div className="dbp-fact-label">Tư liệu lịch sử</div>
          {stats.fact}
        </div>
        <div className="dbp-end-actions">
          <button className="dbp-btn-primary dbp-btn-flex" onClick={onPrimary}>
            {primaryLabel}
          </button>
          {onSecondary && secondaryLabel && (
            <button className="dbp-btn-ghost dbp-btn-flex" onClick={onSecondary}>
              {secondaryLabel}
            </button>
          )}
          <button className="dbp-btn-ghost dbp-btn-flex" onClick={onMenu}>
            Về menu
          </button>
        </div>
      </div>
    </div>
  );
}
