/* eslint-disable no-param-reassign */
import Game from '../model/Game';
import Settings from '../model/Settings';
import Task from '../model/Task';

function questionController() {
  const settings: Settings = Settings.parse(localStorage.getItem('settings'));
  const gamemode: GameMods = localStorage.getItem('gamemode') as GameMods;
  const category: Category = localStorage.getItem('category') as Category;
  const game: Game = new Game(settings);
  const btnGotoHome: HTMLButtonElement = document.querySelector('.btn-goto-home');
  const questionEl: HTMLElement = document.querySelector('.task-question');
  const imageEl: HTMLImageElement = document.querySelector('.task-image');
  const answersEl: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.task-answer');
  const timerValue: HTMLElement = document.querySelector('.timer-value');
  const resultMessage: HTMLSpanElement = document.querySelector('.result-message');
  const modal: HTMLDivElement = document.querySelector('.modal');

  game.newRound(gamemode, category);

  game.timer.on('tick', () => {
    timerValue.textContent = game.timer.stringValue;
  });
  game.timer.on('finish', () => {
    alert('Время вышло');
  });

  renderTask(game.currentRound.task, questionEl, imageEl, answersEl);
  game.timer.start();

  for (const answerEl of answersEl) {
    answerEl.addEventListener('click', async (e: Event) => {
      const target: HTMLButtonElement = e.target as HTMLButtonElement;
      game.timer.stop();
      const point = game.currentRound.checkAnswer(answerEl.textContent);

      if (point) target.classList.add('correct');
      else target.classList.add('uncorrect');

      const promise: Promise<Task> = new Promise((resolve) => {
        setTimeout(() => {
          target.classList.remove('correct');
          target.classList.remove('uncorrect');
          const task = game.currentRound.nextTask();
          resolve(task);
        }, 1000);
      });

      promise.then((task: Task) => {
        if (task) {
          renderTask(task, questionEl, imageEl, answersEl);
          game.timer.restart();
        } else {
          const progressArr: boolean[] = game.currentRound.progress;
          const correctAnswers: number = progressArr.reduce((acc, x) => {
            return acc + Number(x);
          }, 0);
          resultMessage.textContent = `Правильных ответов ${correctAnswers} из ${game.currentRound.countLevels}`;
          modal.classList.toggle('hide');
        }
      });
    });
  }
  btnGotoHome.addEventListener('click', () => {
    game.timer.stop();
  });
}

function renderTask(
  task: Task,
  questionField: HTMLElement,
  image: HTMLImageElement,
  optionButtons: NodeListOf<HTMLButtonElement>,
) {
  questionField.textContent = task.question;
  image.src = task.image;
  for (let i = 0; i < task.options.length; i++) {
    if (optionButtons[i]) {
      optionButtons[i].textContent = task.options[i];
    }
  }
}

export default questionController;
