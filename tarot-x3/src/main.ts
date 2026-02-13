import * as PIXI from "pixi.js";
import "pixi-projection";
import { Game } from "./core/Game";

function start() {
  const app = new PIXI.Application({
    width: 1200,
    height: 620,
    backgroundColor: 0x0f172a,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  document.body.appendChild(app.view);

  const betLabel = document.createElement("div");
  betLabel.innerText = "Bet:";
  betLabel.style.position = "absolute";
  betLabel.style.color = "#ffffff";
  betLabel.style.fontSize = "28px";
  betLabel.style.fontWeight = "700";
  betLabel.style.fontFamily = "Arial, sans-serif";

  const betInput = document.createElement("input");
  betInput.type = "number";
  betInput.min = "1";
  betInput.value = "1";
  betInput.style.position = "absolute";
  betInput.style.fontSize = "20px";
  betInput.style.width = "100px";
  betInput.style.padding = "8px 10px";
  betInput.style.borderRadius = "15px";
  betInput.style.border = "none";
  betInput.style.backgroundColor = "#22c55e";
  betInput.style.color = "#0f172a";
  betInput.style.fontWeight = "600";
  betInput.style.fontFamily = "Arial, sans-serif";
  betInput.style.zIndex = "10";

  document.body.appendChild(betLabel);
  document.body.appendChild(betInput);

  PIXI.Loader.shared.add("table", "/assets/table.jpg").load(() => {
    const texture = PIXI.Loader.shared.resources["table"].texture!;
    const bg = new PIXI.Sprite(texture);

    bg.anchor.set(0, 0);
    bg.position.set(0, 0);
    bg.interactive = false;

    app.stage.addChild(bg);

    const game = new Game(app);

    // Connect background and bet UI to responsive manager
    game.getResponsiveManager().setBackground(bg);
    game.getResponsiveManager().setBetUI(betLabel, betInput);

    betInput.addEventListener("input", () => {
      const value = Number(betInput.value);
      game.setBet(isNaN(value) || value <= 0 ? 1 : value);
    });
  });
}

start();
