import { Container, Sprite, Texture } from 'pixi.js';
import { Container3d } from 'pixi-projection';
import gsap from 'gsap';
import { CardType } from './CardTypes';

export class Card extends Container {
  private view3D: Container3d;
  private front: Sprite;
  private back: Sprite;
  private hit: Sprite;

  revealed = false;
  multiplier = 1;
  readonly type: CardType;

  constructor(type: CardType) {
    super();
    this.type = type;

    const backTexture = Texture.from('/assets/card-back.jpg');
    const frontTexture = Texture.from(
      type === CardType.Gold
        ? '/assets/card-front-gold.jpg'
        : '/assets/card-front-blue.jpg'
    );

    // 3D container (NO EVENTS)
    this.view3D = new Container3d();
    this.addChild(this.view3D);

    this.back = new Sprite(backTexture);
    this.front = new Sprite(frontTexture);
    this.front.visible = false;

    this.back.anchor.set(0.5);
    this.front.anchor.set(0.5);

    this.view3D.addChild(this.back);
    this.view3D.addChild(this.front);

    // hit area (ONLY interactive object)
    this.hit = new Sprite(backTexture);
    this.hit.anchor.set(0.5);
    this.hit.alpha = 0;
    this.hit.interactive = true;
    this.hit.buttonMode = true;

    this.addChild(this.hit);
    
    this.scale.set(0.35);

    this.view3D.scale.y = 0.9;
  }

  flip(onComplete?: () => void) {
    if (this.revealed) return;

    gsap.timeline()
      .to(this.view3D.scale, {
        x: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          this.back.visible = false;
          this.front.visible = true;
        },
      })
      .to(this.view3D.scale, {
        x: 1,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          this.revealed = true;
          onComplete?.();
        },
      });
  }

  onClick(cb: () => void) {
    this.hit.on('pointertap', cb);
  }

  setMultiplier(value: number) {
    this.multiplier = value;
  }

  reset() {
    this.revealed = false;
    this.front.visible = false;
    this.back.visible = true;
    this.view3D.scale.set(1, 0.9);
  }
}
