const formatTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const DateTimePanel = () => {
  const div = document.createElement('div');
  div.className = 'date-time-panel';
  div.style.display = 'flex';
  div.style.flexDirection = 'column';
  div.style.alignItems = 'center';
  div.style.marginBottom = '20px'; // Добавим отступ снизу, чтобы отделить от погоды

  const timeElement = document.createElement('div');
  timeElement.id = 'current-time';
  timeElement.style.fontSize = '4em';
  timeElement.style.fontFamily = "'Share Tech Mono', monospace";
  timeElement.style.color = '#fff';
  timeElement.style.marginBottom = '4px';
  timeElement.textContent = formatTime();

  const dateElement = document.createElement('div');
  dateElement.id = 'current-date';
  dateElement.style.fontSize = '1.2em';
  dateElement.style.fontFamily = "'Share Tech Mono', monospace";
  dateElement.style.color = '#836FFF';
  dateElement.style.textTransform = 'capitalize';
  dateElement.textContent = formatDate(new Date());

  div.appendChild(timeElement);
  div.appendChild(dateElement);

  const updateDateTime = () => {
    const now = new Date();
    timeElement.textContent = formatTime();
    dateElement.textContent = formatDate(now);
  };

  setInterval(updateDateTime, 1000);

  return div;
};

export default DateTimePanel; 