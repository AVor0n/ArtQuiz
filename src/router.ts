import Router from './utils/Router';

import homePage from './view/pages/home.html';
import settingsPage from './view/pages/settings.html';
import categoriesPage from './view/pages/categories.html';
import questionPage from './view/pages/question.html';
import errorPage from './view/pages/error.html';

import homeController from './controllers/home';
import settingsController from './controllers/settings';
import categoriesController from './controllers/categories';
import questionController from './controllers/question';

const router = new Router({ mode: 'hash', root: '/' });

router
  .add('home', () => goToPage('Home', homePage, homeController))
  .add('settings', () => goToPage('Settings', settingsPage, settingsController))
  .add('categories', () => goToPage('Categories', categoriesPage, categoriesController))
  .add('question', () => goToPage('Question', questionPage, questionController))
  .add('', () => goToPage('Error', errorPage, homeController));

function goToPage(pageName: string, pageContent: string, pageController?: Function) {
  document.body.innerHTML = pageContent;
  document.title = `ArtQuiz - ${pageName}`;
  if (pageController) pageController();
}
