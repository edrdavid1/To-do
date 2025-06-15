import './style.css';
import { router } from './router';

window.addEventListener('hashchange', () => router());
router();

function logWindowSize() {
  console.log('Window dimensions:', {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio
  });
}

window.addEventListener('resize', logWindowSize);
logWindowSize(); // Log initial size
