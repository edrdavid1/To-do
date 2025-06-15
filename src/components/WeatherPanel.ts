const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = import.meta.env.VITE_WEATHER_CITY;
const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=ru`;

const getWeatherIconPath = (iconCode: string) => {
  const basePath = '/weather-icon/';
  switch (iconCode) {
    case '01d': return basePath + 'clear-day.svg';
    case '01n': return basePath + 'clear-night.svg';
    case '02d': return basePath + 'few-clouds-day.svg';
    case '02n': return basePath + 'few-clouds-night.svg';
    case '03d': case '03n': return basePath + 'scattered-clouds.svg';
    case '04d': case '04n': return basePath + 'broken-clouds.svg';
    case '09d': case '09n': return basePath + 'shower-rain.svg';
    case '10d': return basePath + 'rain-day.svg';
    case '10n': return basePath + 'rain-night.svg';
    case '11d': case '11n': return basePath + 'thunderstorm.svg';
    case '13d': case '13n': return basePath + 'snow.svg';
    case '50d': case '50n': return basePath + 'mist.svg';
    default: return basePath + 'unknown.svg'; // Иконка по умолчанию
  }
};

const WeatherPanel = async () => {
  const div = document.createElement('div');
  div.className = 'weather-panel';

  const content = document.createElement('div');
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';

  const renderWeather = (data: any) => {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconPath = getWeatherIconPath(iconCode);
    content.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
          <img src="${iconPath}" alt="weather icon" style="width:64px;height:64px;filter:brightness(0)invert(1);">
        </div>
        <span style="font-size:2em;">${temp}°C</span>
        <span style="font-size:1.2em; margin-top: 8px;">${desc.charAt(0).toUpperCase() + desc.slice(1)}</span>
      </div>
    `;
  };

  const showLoading = () => {
    content.innerHTML = '<span style="font-size:1.1em;">Загрузка погоды...</span>';
  };

  const showError = () => {
    content.innerHTML = '<span style="font-size:1.1em; color: #ff2a6d;">Ошибка загрузки погоды. Проверьте ключ API.</span>';
  };

  const fetchWeather = async () => {
    showLoading();
    try {
      const res = await fetch(URL);
      const data = await res.json();
      if (data.cod !== 200) {
        showError();
        return;
      }
      renderWeather(data);
    } catch {
      showError();
    }
  };

  (window as any).updateWeatherPanel = fetchWeather;

  await fetchWeather();
  div.appendChild(content);
  return div;
};

export default WeatherPanel; 