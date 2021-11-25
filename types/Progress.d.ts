/* eslint no-unused-vars: 0 */
type Progress = {
  [mode in GameMods]: Array<{
    attempts: number;
    tasks: Array<{ [id: string]: boolean }>;
  }>;
};
