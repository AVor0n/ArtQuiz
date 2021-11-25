function homeController() {
  const btnsSetGameMode: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll('.btn-set-game-mode');

  for (const btn of btnsSetGameMode) {
    btn.addEventListener('click', () => {
      const gamemode = btn.dataset.gamemode as GameMods;
      localStorage.setItem('gamemode', gamemode);
    });
  }
}

export default homeController;
