import Home from './pages/Home';
import AddToDo from './pages/AddToDo';
import GifSelect from './pages/GifSelect';

const renderComponent = async (component: HTMLElement | Promise<HTMLElement>) => {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';
  app.appendChild(await Promise.resolve(component));
};

export const router = async () => {
  const hash = window.location.hash;
  switch (hash) {
    case '#/add':
      await renderComponent(AddToDo());
      break;
    case '#/gif-select':
      await renderComponent(GifSelect());
      break;
    default:
      await renderComponent(Home());
      break;
  }
};
