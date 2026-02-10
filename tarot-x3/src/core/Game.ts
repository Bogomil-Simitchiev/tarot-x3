import { Application } from 'pixi.js';
import { GameState } from './GameState';

export class Game {
  private state: GameState = GameState.Idle;

  constructor(private app: Application) {
    this.changeState(GameState.Idle);
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
  }

  private onReveal() {
    // Wait for 3 card reveals
  }

  private onResult() {
    // Show payout
    setTimeout(() => {
      this.changeState(GameState.Idle);
    }, 1500);
  }
}
