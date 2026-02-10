import { CardManager } from "../cards/CardManager";
import { Application } from "pixi.js";
import { GameState } from "./GameState";

export class Game {
  private state: GameState = GameState.Idle;
  private cardManager!: CardManager;

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
    // Play button enabled
  }

  private onRoundStart() {
    // Prepare cards
    setTimeout(() => {
      this.changeState(GameState.Reveal);
    }, 500);
    this.cardManager.prepareRound();
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
