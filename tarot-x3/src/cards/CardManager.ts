import { Container } from "pixi.js";
import { Card } from "./Card";
import { CardType } from "./CardTypes";
import paytable from "../data/paytable.json";
import { pickWeighted } from "../utils/rng";

export class CardManager extends Container {
  private cards: Card[] = [];
  private revealedCount = 0;
  private inputEnabled = false;

  constructor() {
    super();

    const types: CardType[] = [CardType.Gold, CardType.Gold, CardType.Blue];

    types.forEach((type, index) => {
      const card = new Card(type);

      // fan layout
      card.x = (index - 1) * 180;
      card.y = 0;
      card.rotation = (index - 1) * 0.15;

      card.onClick(() => this.revealCard(card));

      this.cards.push(card);
      this.addChild(card);
    });
    this.pivot.set(0, 0);
  }

  prepareRound() {
    this.revealedCount = 0;

    this.cards.forEach((card) => {
      const data = pickWeighted(paytable[card.type.toLowerCase()]);

      card.setMultiplier(data.value);
      card.reset();
    });
  }

  enableInput() {
    this.inputEnabled = true;
  }

  disableInput() {
    this.inputEnabled = false;
  }

  private revealCard(card: Card) {
    if (!this.inputEnabled) return;
    if (card.revealed) return;

    card.flip(() => {
      this.revealedCount++;

      if (this.revealedCount === this.cards.length) {
        this.emit(
          "allRevealed",
          this.cards.map((c) => c.multiplier),
        );
      }
    });
  }
}
