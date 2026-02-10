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

  PIXI.Loader.shared
    .add('table', '/assets/table.jpg')
    .load(() => {
      const texture = PIXI.Loader.shared.resources['table'].texture!;
      const bg = new PIXI.Sprite(texture);

      bg.anchor.set(0.5, 0);
      bg.position.set(app.screen.width / 2, 0);

      const scaleX = app.screen.width / texture.width;
      const scaleY = app.screen.height / texture.height;
      bg.scale.set(Math.max(scaleX, scaleY));

      bg.interactive = false;

      app.stage.addChild(bg);

      new Game(app);
    });
}

start();
