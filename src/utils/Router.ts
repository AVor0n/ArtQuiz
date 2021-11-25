type RouterMode = 'history' | 'hash';
type Route = { path: string; cb: Function };

class Router {
  routes: Array<Route> = [];
  mode: RouterMode = null;
  root = '/';
  current: string;

  constructor(options: { mode: RouterMode; root: string }) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) this.mode = options.mode;
    if (options.root) this.root = options.root;
    this.listen();
  }

  add = (path: string, cb: Function) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: string) => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  static clearSlashes = (path: string) => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = () => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = Router.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return Router.clearSlashes(fragment);
  };

  navigate = (path = '') => {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + Router.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  // listen = () => {
  //   clearInterval(this.interval);
  //   this.interval = setInterval(this.interval, 50);
  // };

  listen = () => {
    setInterval(() => {
      if (this.current === this.getFragment()) return;
      this.current = this.getFragment();

      this.routes.some((route) => {
        const match = this.current.match(route.path);
        if (match) {
          match.shift();
          route.cb.apply({}, match);
          return match;
        }
        return false;
      });
    }, 50);
  };
}

export default Router;
