import { Application, Sprite } from "pixi.js";

export class ResponsiveManager {
  private app: Application;
  private baseWidth: number = 1200;
  private baseHeight: number = 620;
  private currentScale: number = 1;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private betLabel: HTMLDivElement | null = null;
  private betInput: HTMLInputElement | null = null;
  private background: Sprite | null = null;

  constructor(app: Application) {
    this.app = app;
    this.setupResponsive();
    window.addEventListener("resize", () => this.handleResize());
  }

  private setupResponsive(): void {
    this.handleResize();
  }

  private isMobile(): boolean {
    return window.innerWidth < 768;
  }

  private handleResize(): void {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (this.isMobile()) {
      this.baseHeight = 700;
    } else {
      this.baseHeight = 620;
    }

    // Calculate scale to fit
    const scaleX = windowWidth / this.baseWidth;
    const scaleY = windowHeight / this.baseHeight;
    this.currentScale = Math.min(scaleX, scaleY);

    // Calculate scaled dimensions
    const scaledWidth = this.baseWidth * this.currentScale;
    const scaledHeight = this.baseHeight * this.currentScale;

    // Resize renderer to full window
    this.app.renderer.resize(windowWidth, windowHeight);

    // Center the game area
    this.offsetX = (windowWidth - scaledWidth) / 2;
    this.offsetY = (windowHeight - scaledHeight) / 2;

    // Position and scale the stage
    this.app.stage.position.set(this.offsetX, this.offsetY);
    this.app.stage.scale.set(this.currentScale);

    // Update background
    this.updateBackground();

    // Update bet UI
    this.updateBetUIPositions();
  }

  public setBackground(bg: Sprite): void {
    this.background = bg;
    this.updateBackground();
  }

  private updateBackground(): void {
    if (!this.background) return;

    // Fill the entire base dimensions
    this.background.width = this.baseWidth;
    this.background.height = this.baseHeight;
    this.background.position.set(0, 0);
  }

  public setBetUI(label: HTMLDivElement, input: HTMLInputElement): void {
    this.betLabel = label;
    this.betInput = input;
    this.updateBetUIPositions();
  }

  private updateBetUIPositions(): void {
    if (!this.betLabel || !this.betInput) return;

    const labelLeft = this.offsetX + 56 * this.currentScale;
    const labelTop = this.offsetY + 36 * this.currentScale;
    const inputLeft = this.offsetX + 55 * this.currentScale;
    const inputTop = this.offsetY + 76 * this.currentScale;

    this.betLabel.style.left = `${labelLeft}px`;
    this.betLabel.style.top = `${labelTop}px`;
    this.betLabel.style.fontSize = `${28 * this.currentScale}px`;

    this.betInput.style.left = `${inputLeft}px`;
    this.betInput.style.top = `${inputTop}px`;
    this.betInput.style.fontSize = `${20 * this.currentScale}px`;
    this.betInput.style.width = `${100 * this.currentScale}px`;
    this.betInput.style.padding = `${8 * this.currentScale}px ${10 * this.currentScale}px`;
  }

  public getScale(): number {
    return this.currentScale;
  }

  public getBaseWidth(): number {
    return this.baseWidth;
  }

  public getBaseHeight(): number {
    return this.baseHeight;
  }

  public getOffset(): { x: number; y: number } {
    return { x: this.offsetX, y: this.offsetY };
  }
}
