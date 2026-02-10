import { Application } from "pixi.js";
import { CardManager } from "../cards/CardManager";
import { PlayButton } from "../ui/PlayButton";
import { ResultPopup } from "../ui/ResultPopup";
import { GameState } from "./GameState";

export class Game {
  private state: GameState = GameState.Idle;

  private cardManager: CardManager;
  private playButton: PlayButton;
  private resultPopup: ResultPopup;

  constructor(private app: Application) {
    /** Cards */
    this.cardManager = new CardManager();
    this.cardManager.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );
    this.app.stage.addChild(this.cardManager);

    /** Button */
    this.playButton = new PlayButton(() => {
      this.changeState(GameState.RoundStart);
    });
    this.playButton.position.set(
      this.app.screen.width / 2,
      this.app.screen.height - 80,
    );
    this.app.stage.addChild(this.playButton);

    /** Result popup */
    this.resultPopup = new ResultPopup();
    this.resultPopup.position.set(
      this.app.screen.width / 2,
      this.app.screen.height / 2,
    );
    this.app.stage.addChild(this.resultPopup);

    /** Events */
    this.cardManager.on("allRevealed", (multipliers: number[]) => {
      this.resultPopup.show(multipliers);
      this.changeState(GameState.Result);
    });

    /** Initial state */
    this.changeState(GameState.Idle);
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
  }

  private onRoundStart() {
    this.playButton.visible = false;
    this.resultPopup.hide();

    this.cardManager.prepareRound();
    this.cardManager.disableInput();

    this.changeState(GameState.Reveal);
  }

  private onReveal() {
    // Cards can now be clicked
    this.cardManager.enableInput();
  }

  private onResult() {
    this.cardManager.disableInput();

    setTimeout(() => {
      this.changeState(GameState.Idle);
    }, 3000);
  }
}
