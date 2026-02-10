import { CardManager } from "../cards/CardManager";
import { PlayButton } from "../ui/PlayButton";

import { Application } from "pixi.js";
import { GameState } from "./GameState";

export class Game {
  private state: GameState = GameState.Idle;
  private cardManager!: CardManager;
  private playButton!: PlayButton;

  constructor(private app: Application) {
    this.cardManager = new CardManager();
    this.app.stage.addChild(this.cardManager);

    this.cardManager.on("allRevealed", (multipliers: number[]) => {
      this.changeState(GameState.Result);
    });

    this.cardManager.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );

    this.playButton = new PlayButton(() => {
      this.changeState(GameState.RoundStart);
    });

    this.playButton.position.set(
      this.app.screen.width / 2,
      this.app.screen.height - 80,
    );

    this.app.stage.addChild(this.playButton);
  }

  changeState(newState: GameState) {
    console.log(`STATE: ${this.state} → ${newState}`);
    this.state = newState;

    switch (newState) {
      case GameState.Idle:
        this.onIdle();
        break;
      case GameState.RoundStart:
        this.onRoundStart();
        break;
      case GameState.Reveal:
        this.onReveal();
        break;
      case GameState.Result:
        this.onResult();
        break;
    }
  }

  private onIdle() {
    this.playButton.visible = true;
  }

  private onRoundStart() {
    this.playButton.visible = false;
    this.cardManager.prepareRound();

    this.changeState(GameState.Reveal);
  }

  private onReveal() {
    // Wait for 3 card reveals
  }

  private onResult() {
    // Show payout
    console.log("Result state");

    // тук по-късно ще е UI popup
    setTimeout(() => {
      this.changeState(GameState.Idle);
    }, 2000);
  }
}
