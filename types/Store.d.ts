/* eslint no-unused-vars: 0 */
type Store = {
  [category in Category]: Array<{
    name: string;
    id: number;
    author: string;
    year: number;
  }>;
};
