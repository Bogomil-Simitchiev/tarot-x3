import * as PIXI from 'pixi.js';
import 'pixi-projection';
import { Game } from './core/Game';

function start() {
  const app = new PIXI.Application({
    width: 1180,
    height: 620,
    backgroundColor: 0x0f172a,
    antialias: true,
  });

  document.body.appendChild(app.view);

  new Game(app);
}

start();
