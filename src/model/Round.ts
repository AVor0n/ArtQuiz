import Task from './Task';

import shuffle from '../utils/shuffle';
import store from '../data/store';
import artists from '../data/artists';
import pictures from '../data/pictures';

class Round {
  #taskGenerator: Generator<Task>;
  #task: Task;
  #countLevels: number;
  #level: number;
  #progress: boolean[];

  constructor(mode: GameMods, category: Category, countLevels?: number) {
    this.#countLevels = countLevels || 10;
    this.#level = 0;
    this.#progress = [];
    this.#taskGenerator = Round.#createTaskGenerator(mode, category);
    this.#task = this.#taskGenerator.next().value;
  }

  get task() {
    return this.#task;
  }

  get level() {
    return this.#level;
  }

  get countLevels() {
    return this.#countLevels;
  }

  get progress() {
    return this.#progress;
  }

  checkAnswer(answer: string) {
    const point = this.task.checkAnswer(answer);
    this.#progress.push(point);
    return point;
  }

  nextTask() {
    this.#level += 1;

    if (this.#level < this.#countLevels) {
      this.#task = this.#taskGenerator.next().value;
      return this.task;
    }

    return null;
  }

  static *#createTaskGenerator(mode: GameMods, category: Category): Generator<Task> {
    for (const picture of store[category]) {
      let task: Task;
      switch (mode) {
        case 'artists':
          task = new Task(
            `./data/img/${picture.id}.jpg`,
            'Кто автор этой картины?',
            picture.author,
            Round.#createRandomArr(picture.author, artists),
          );
          break;

        case 'pictures':
          task = new Task(
            `./data/img/${picture.id}.jpg`,
            'Как называется эта картина?',
            picture.name,
            Round.#createRandomArr(picture.name, pictures),
          );
          break;

        default:
          task = null;
      }

      yield task;
    }
  }

  static #createRandomArr(answer: string, array: string[], length: number = 4) {
    const randArr: string[] = [answer];

    for (let i = 0; i < length; i++) {
      let j;
      do {
        j = Math.floor(Math.random() * array.length + 1);
      } while (randArr.includes(array[j]));

      randArr.push(array[j]);
    }

    shuffle(randArr);
    return randArr;
  }
}

export default Round;
