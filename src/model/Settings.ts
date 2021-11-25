class Settings {
  #volume: number;
  #timeForAnswer: number;
  #enableTimer: boolean;

  constructor(volume?: number, timeForAnswer?: number, enableTimer?: boolean) {
    this.#volume = volume || 50;
    this.#timeForAnswer = timeForAnswer * 1000 || 0;
    this.#enableTimer = enableTimer || false;
  }

  get volume() {
    return this.#volume;
  }

  set volume(value: number) {
    if (value >= 0 && value <= 100) this.#volume = value;
  }

  get timeForAnswer() {
    return this.#timeForAnswer;
  }

  set timeForAnswer(value: number) {
    if (value >= 0) this.#timeForAnswer = value;
  }

  get enableTimer() {
    return this.#enableTimer;
  }

  set enableTimer(value: boolean) {
    this.#enableTimer = value;
  }

  static parse(str: string) {
    const settings: Settings = JSON.parse(str) as Settings;
    return settings;
  }

  toString() {
    return JSON.stringify({
      enableTimer: this.enableTimer,
      timeForAnswer: this.timeForAnswer,
      volume: this.volume,
    });
  }
}
export default Settings;
