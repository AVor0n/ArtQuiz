import './view/styles/index.css';
import Settings from './model/Settings';

const settings: Settings = new Settings(50, 20, true);
localStorage.setItem('settings', settings.toString());
// eslint-disable-next-line import/first
import './router';
