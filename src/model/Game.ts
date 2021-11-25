import Round from './Round';
import Settings from './Settings';
import Timer from './Timer';

class Game {
  #timer: Timer;
  #settings: Settings;
  #progress: Progress;
  #currentRound: Round;
  #mode: GameMods;

  constructor(settings?: Settings) {
    this.#timer = settings?.enableTimer ? new Timer(settings.timeForAnswer) : null;
  }

  get timer() {
    return this.#timer;
  }

  get settings() {
    return this.#settings;
  }

  get progress() {
    return this.#progress;
  }

  get currentRound() {
    return this.#currentRound;
  }

  get mode() {
    return this.#mode;
  }

  set mode(value) {
    this.#mode = value;
  }

  newRound(mode: GameMods, category: Category) {
    this.#currentRound = new Round(mode, category);
  }
}

export default Game;
