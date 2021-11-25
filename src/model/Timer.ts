import EventEmitter from 'events';

class Timer extends EventEmitter {
  #timerId: NodeJS.Timer;
  #value: number;
  #step: number;
  #from: number;
  #to: number;

  constructor(from: number, to?: number, step?: number) {
    super();
    this.#value = from;
    this.#from = from;
    this.#to = to || 0;
    this.#step = step || 1000;
  }

  get value() {
    return this.#value;
  }

  get stringValue() {
    const s = Math.floor(this.#value / 1000);
    const mm = Math.floor(s / 60);
    const ss = Math.floor(s - 60 * mm);

    const MM = String(mm).padStart(2, '0');
    const SS = String(ss).padStart(2, '0');
    return `${MM}:${SS}`;
  }

  start() {
    this.#timerId = setInterval(() => this.#tick(), this.#step);
  }

  restart() {
    this.#value = this.#from;
    this.start();
  }

  #tick() {
    this.#value -= this.#step;

    if (this.#value <= this.#to) {
      this.stop();
      this.#value = this.#to;

      this.emit('tick');
      this.emit('finish');
    } else {
      this.emit('tick');
    }
  }

  stop() {
    clearInterval(this.#timerId);
  }
}

export default Timer;
