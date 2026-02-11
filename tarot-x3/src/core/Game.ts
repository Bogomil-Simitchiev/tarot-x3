import { Application } from "pixi.js";
import { CardManager } from "../cards/CardManager";
import { PlayButton } from "../ui/PlayButton";
import { ResultPopup } from "../ui/ResultPopup";
import { GameState } from "./GameState";

export class Game {
  private state: GameState = GameState.Idle;
  private bet = 1;

  private cardManager: CardManager;
  private playButton: PlayButton;
  private resultPopup: ResultPopup;

  constructor(private app: Application) {
    /** ================= CARDS ================= */
    this.cardManager = new CardManager();
    this.cardManager.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    this.app.stage.addChild(this.cardManager);

    /** ================= BUTTON ================= */
    this.playButton = new PlayButton(() => {
      if (this.state === GameState.Idle) {
        this.changeState(GameState.RoundStart);
      }
    });

    this.playButton.position.set(
      this.app.screen.width / 2,
      this.app.screen.height - 80
    );
    this.app.stage.addChild(this.playButton);

    /** ================= RESULT POPUP ================= */
    this.resultPopup = new ResultPopup();
    this.resultPopup.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2
    );
    this.app.stage.addChild(this.resultPopup);

    /** ================= EVENTS ================= */
    this.cardManager.on("allRevealed", (multipliers: number[]) => {
      // safety guard
      if (this.state !== GameState.Reveal) return;
      if (!Array.isArray(multipliers)) return;

      const product = multipliers.reduce((acc, val) => acc * val, 1);
      const payout = product * this.bet;

      this.resultPopup.show({
        multipliers,
        product,
        bet: this.bet,
        payout,
      });

      this.changeState(GameState.Result);
    });

    this.changeState(GameState.Idle);
  }

  /** ================= PUBLIC ================= */

  public setBet(value: number) {
    this.bet = Math.max(1, Number(value) || 1);
  }

  private changeState(newState: GameState) {
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
    this.cardManager.disableInput();
    this.resultPopup.hide();
  }

  private onRoundStart() {
    this.playButton.visible = false;
    this.resultPopup.hide();

    this.cardManager.prepareRound();
    this.cardManager.disableInput();

    this.changeState(GameState.Reveal);
  }

  private onReveal() {
    this.cardManager.enableInput();
  }

  private onResult() {
    this.cardManager.disableInput();

    setTimeout(() => {
      this.changeState(GameState.Idle);
    }, 6000);
  }
}
