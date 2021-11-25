class Task {
  #image: string;
  #question: string;
  #answer: string;
  #options: string[];

  constructor(image: string, question: string, answer: string, options: string[]) {
    this.#image = image;
    this.#question = question;
    this.#answer = answer;
    this.#options = options;
  }

  get image() {
    return this.#image;
  }

  get question() {
    return this.#question;
  }

  get answer() {
    return this.#answer;
  }

  get options() {
    return this.#options;
  }

  checkAnswer(answer: string) {
    return this.answer === answer;
  }
}

export default Task;
