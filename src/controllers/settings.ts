import Settings from '../model/Settings';

function settingsController() {
  const inputVolume: HTMLInputElement = document.querySelector('.input-volume');
  const inputEnableTimer: HTMLInputElement = document.querySelector('.input-enable-timer');
  const inputTimeForAnswer: HTMLInputElement = document.querySelector('.input-time-for-answer');
  const btnSaveSettings: HTMLButtonElement = document.querySelector('.btn-save-settigs');
  const btnResetSettings: HTMLButtonElement = document.querySelector('.btn-reset-settigs');

  const settings: Settings = Settings.parse(localStorage.getItem('settings'));
  inputVolume.value = `${settings.volume}`;
  inputEnableTimer.checked = settings.enableTimer;
  inputTimeForAnswer.value = `${settings.timeForAnswer}`;

  btnSaveSettings.addEventListener('click', () => {
    const setting: Settings = new Settings(
      +inputVolume.value,
      +inputTimeForAnswer.value,
      inputEnableTimer.checked,
    );
    localStorage.setItem('settings', setting.toString());
  });

  btnResetSettings.addEventListener('click', () => {
    const setting: Settings = new Settings();
    inputVolume.value = `${setting.volume}`;
    inputEnableTimer.checked = setting.enableTimer;
    inputTimeForAnswer.value = `${setting.timeForAnswer}`;
  });
}
export default settingsController;
