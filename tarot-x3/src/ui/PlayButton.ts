import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class PlayButton extends Container {
  constructor(onClick: () => void) {
    super();

    const bg = new Graphics()
      .beginFill(0x22c55e)
      .drawRoundedRect(-80, -30, 160, 60, 16)
      .endFill();

    const label = new Text(
      'PLAY',
      new TextStyle({
        fill: 0x0f172a,
        fontSize: 24,
        fontWeight: 'bold',
      })
    );
    label.anchor.set(0.5);

    this.addChild(bg, label);

    this.interactive = true;
    this.buttonMode = true;

    this.on('pointertap', onClick);
  }
}
