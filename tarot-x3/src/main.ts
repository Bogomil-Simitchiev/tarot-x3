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

  // =========================
  // BET INPUT (HTML)
  // =========================
  const betInput = document.createElement("input");
  betInput.type = "number";
  betInput.min = "1";
  betInput.value = "1";

  betInput.style.position = "absolute";
  betInput.style.top = "20px";
  betInput.style.left = "20px";
  betInput.style.width = "100px";
  betInput.style.padding = "6px";
  betInput.style.fontSize = "16px";

  document.body.appendChild(betInput);

  // =========================
  // LOAD TABLE BACKGROUND
  // =========================
  PIXI.Loader.shared
    .add("table", "/assets/table.jpg")
    .load(() => {
      const texture = PIXI.Loader.shared.resources["table"].texture!;
      const bg = new PIXI.Sprite(texture);

      bg.anchor.set(0.5, 0);
      bg.position.set(app.screen.width / 2, 0);

      const scaleX = app.screen.width / texture.width;
      const scaleY = app.screen.height / texture.height;
      bg.scale.set(Math.max(scaleX, scaleY));

      // background should NEVER receive input
      bg.interactive = false;

      app.stage.addChild(bg);

      // =========================
      // GAME
      // =========================
      const game = new Game(app);

      // pass bet to game
      betInput.addEventListener("input", () => {
        const value = Number(betInput.value);
        game.setBet(isNaN(value) || value <= 0 ? 1 : value);
      });
    });
}

start();
