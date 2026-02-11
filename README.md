# Tarot x3🎴 — Pixi + pixi-projection Challenge

A small **3-card reveal game** built with **PixiJS**, **pixi-projection**, **GSAP**, and **TypeScript**.
Each card hides a multiplier; after revealing all three, the final payout is:

payout = bet × (m1 × m2 × m3)

The focus is on smooth **3D-ish card flips** and satisfying animations✨

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [State Flow](#state-flow)
- [How to Run](#how-to-run)
- [Game Features](#game-features)
- [AI Log](#ai-log)
- [Next Steps](#next-steps)
- [File Structure](#file-structure)

---

## Tech Stack🛠️
- **PixiJS** 6.5.9
- **pixi-projection** 1.0.0
- **GSAP** (3.13.0) for animations
- **TypeScript** (`strict: true`)
- **Node.js** + your favorite package manager (npm/yarn/pnpm/bun)

---

## State Flow🔄

**States:**
1. **Idle** — Play button enabled, ready for a new round🟢
2. **RoundStart** — Shuffle/prep hidden multipliers🎲
3. **Reveal** — Flip animations per card🔄
4. **Result** — Show multipliers, product, payout💰, then return to Idle

---

## How to Run🚀

1. Clone the repo:

```bash
git clone https://github.com/Bogomil-Simitchiev/tarot-x3
cd tarot-x3
```

2. Install dependencies (choose one):

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser at http://localhost:5173 (or the port shown in terminal)

5. Build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Game Features🎮

### Table & 3D Cards🃏
- Table background and 3 cards in a slight fan
- Cards rotated with pixi-projection for perspective

### Game Flow & UI🎛️
- Play button enabled in Idle
- Flip animation front↔back using GSAP timeline
- Show multipliers and payout after all reveals

### Multipliers🔢
- Defined in a JSON table with weights
- RNG via Math.random()

### Animations & Juice✨
- GSAP timelines:
- Flip card animation
- Result pop (scale + glow)

---

## AI Log🤖
- **Asset Creation:** Generated card front/back designs and table textures using AI (Grok)
- **Code Assistance:** Used ChatGPT for TypeScript scaffolding, state machine examples, some better logics and GSAP flip sequences
- **Reasoning:** AI helped prototype visual effects faster while keeping code clean

---

## Next Steps⏩
If I had more time:
- Add sound effects for card flips and payouts🔊
- Implement auto-play or speed modes⚡
- Add animations for losing/winning streaks
- Improve responsive layout for mobile devices📱
 
---

### File Structure📁
- /src       → TypeScript source code
- /public/images    → favicon
- /public/assets    → Card images (back, gold and blue), table texture
- /dist      → Production build
- tsconfig.json → strict TS config

---

## 👨‍💻Author

**Bogomil Simitchiev -**
Front-end Developer passionate about clean UI and performant web apps.

[simitchiev365@gmail.com]

---

## 📜License

This project is licensed under the **MIT License** — feel free to use and modify it.
