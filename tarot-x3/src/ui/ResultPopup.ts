import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import gsap from 'gsap';

export class ResultPopup extends Container {
  private text: Text;

  constructor() {
    super();
    this.visible = false;

    const bg = new Graphics()
      .beginFill(0x020617, 0.9)
      .drawRoundedRect(-200, -120, 400, 240, 20)
      .endFill();

    this.text = new Text(
      '',
      new TextStyle({
        fill: 0xffffff,
        fontSize: 20,
        align: 'center',
      })
    );
    this.text.anchor.set(0.5);

    this.addChild(bg, this.text);
  }

  show(multipliers: number[], bet = 1) {
    const product = multipliers.reduce((a, b) => a * b, 1);
    const payout = bet * product;

    this.text.text =
      `Multipliers:\n${multipliers.map(m => `x${m}`).join(' ')}\n\n` +
      `Product: x${product.toFixed(2)}\n` +
      `Payout: ${payout.toFixed(2)}`;

    this.visible = true;
    this.alpha = 0;
    this.scale.set(0.8);

    gsap.to(this, {
      alpha: 1,
      duration: 0.3,
    });

    gsap.to(this.scale, {
      x: 1,
      y: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });
  }

  hide() {
    this.visible = false;
  }
}
