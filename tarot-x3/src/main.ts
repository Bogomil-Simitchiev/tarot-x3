import * as PIXI from "pixi.js";
import "pixi-projection";
import { Game } from "./core/Game";

function start() {
  const app = new PIXI.Application({
    width: 1180,
    height: 620,
    backgroundColor: 0x0f172a,
    antialias: true,
  });

  document.body.appendChild(app.view);

  const betLabel = document.createElement("div");
  betLabel.innerText = "Bet:";
  betLabel.style.position = "absolute";
  betLabel.style.top = "26px";
  betLabel.style.left = "26px";
  betLabel.style.color = "#ffffff";
  betLabel.style.fontSize = "28px";
  betLabel.style.fontWeight = "700";
  betLabel.style.fontFamily = "Arial, sans-serif";

  const betInput = document.createElement("input");
  betInput.type = "number";
  betInput.min = "1";
  betInput.value = "1";

  betInput.style.position = "absolute";
  betInput.style.top = "66px";
  betInput.style.left = "25px";
  betInput.style.fontSize = "20px";
  betInput.style.width = "100px";
  betInput.style.padding = "8px 10px";
  betInput.style.borderRadius = "15px";
  betInput.style.border = "none";
  betInput.style.backgroundColor = "#22c55e";
  betInput.style.color = "#0f172a";
  betInput.style.fontWeight = "600";
  betInput.style.fontFamily = "Arial, sans-serif";

  document.body.appendChild(betLabel);
  document.body.appendChild(betInput);

  PIXI.Loader.shared.add("table", "/assets/table.jpg").load(() => {
    const texture = PIXI.Loader.shared.resources["table"].texture!;
    const bg = new PIXI.Sprite(texture);

    bg.anchor.set(0.5, 0);
    bg.position.set(app.screen.width / 2, 0);

    const scaleX = app.screen.width / texture.width;
    const scaleY = app.screen.height / texture.height;
    bg.scale.set(Math.max(scaleX, scaleY));

    bg.interactive = false;

    app.stage.addChild(bg);

    const game = new Game(app);
    
    betInput.addEventListener("input", () => {
      const value = Number(betInput.value);
      game.setBet(isNaN(value) || value <= 0 ? 1 : value);
    });
  });
}

start();
