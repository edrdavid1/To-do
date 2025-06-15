import TodoList from '../components/TodoList';
import WeatherPanel from '../components/WeatherPanel';
import GifPanel from '../components/GifPanel';
import DateTimePanel from '../components/DateTimePanel';

const Home = async () => {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'home-page';

  const createMainLayout = async () => {
    const mainLayout = document.createElement('div');
    mainLayout.className = 'main-layout';

    const leftPanel = document.createElement('div');
    leftPanel.className = 'left-panel';
    leftPanel.appendChild(await TodoList());

    const rightPanel = document.createElement('div');
    rightPanel.className = 'right-panel';

    const weatherPanel = await WeatherPanel();
    rightPanel.appendChild(weatherPanel);

    const gifPanel = GifPanel();
    rightPanel.appendChild(gifPanel);

    const dateTimePanel = DateTimePanel();
    rightPanel.appendChild(dateTimePanel);

    mainLayout.appendChild(leftPanel);
    mainLayout.appendChild(rightPanel);

    return mainLayout;
  };

  const mainLayout = await createMainLayout();
  mainDiv.appendChild(mainLayout);

  return mainDiv;
};

export default Home;
